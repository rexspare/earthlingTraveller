import React, { Component } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity, ScrollView, RefreshControl } from 'react-native';

import Styles from '../../../assets/Styles';
import { Image, Divider } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import { Actions } from 'react-native-router-flux';
import Helpers from '../../../Helpers';
import { showMessage } from "react-native-flash-message";
import { connect } from 'react-redux';
import axios from 'axios';
import qs from 'qs';
import NetInfo from "@react-native-community/netinfo";

class Properties extends React.Component {
	_isMounted = false;

	constructor(props) {
		super(props);
	}

	state = {
		search: '',
		refreshing: false,
		selectedProperty: null,
		searchQuery: '',
		properties: [
			// { id: 1, title: 'My Property', price: '$200.00', status: 1 },
			// { id: 2, title: 'New Luxury Home', price: '$200.00', status: 2 },
			// { id: 3, title: 'Very Nice Home', price: '$200.00', status: 2 },
			// { id: 4, title: 'New Home', price: '$200.00', status: 1 },
			// { id: 5, title: 'House Test', price: '$200.00', status: 0 },
			// { id: 6, title: 'New Test', price: '$200.00', status: 0 },
			// { id: 7, title: 'TESTEST Test', price: '$200.00', status: 1 },
		]
	};

	componentDidMount() {
		this._isMounted = true;

		this.getData();
	}

	getData = async () => {
		const isConnected = this.checkConnection();

		if (isConnected) {
			this.getProperties();
		} else {
			this.setState({ refreshing: false })
			showMessage({
				message: "Network Error",
				description: "Please check your connection",
				type: "default",
				backgroundColor: "#FFF",
				color: "#000",
			});
		}
	}

	checkConnection = () => {
		return NetInfo.fetch().then(state => {				
			return state.isConnected;
		});
	}

	getProperties = () => {
		const self = this;
		
		axios.get(
			Helpers.api_url + 'getProperties/' + this.props.userID
		).then(response => {			
			if (this._isMounted) {
				self.setState({ properties: response.data, refreshing: false });
			}
		}).catch(error => {
			self.setState({ refreshing: false });
			showMessage({
				message: "Network Error",
				description: "Please check your connection",
				type: "default",
				backgroundColor: "#FFF",
				color: "#000",
			});
		});

	}

	componentWillUnmount() {
		this._isMounted = false;
	}

	updateSearch = search => {
		this.setState({ search });
	}

	showActions = (propertyId) => {
		if (this.state.selectedProperty == propertyId) {
			this.setState({ selectedProperty: null })
		} else {
			this.setState({ selectedProperty: propertyId })
		}
	}

	changeStatus = (status, propertyID) => {
		const data = {
			status: status == 1 ? 0 : 1,
			propertyID
		}

		axios.post(
			Helpers.api_url + 'changePropertyStatus',
			qs.stringify(data),
		).then(response => {
			const { type } = response.data;

			showMessage({
				message: type.charAt(0).toUpperCase() + type.slice(1),
				description: response.data.msg,
				type: "default",
				backgroundColor: "#459E94",
				color: "#FFF",
			});

			this.setState({
				selectedProperty: null
			})

			this.getProperties();
		});
	}

	_renderStatus = (status) => {
		let textColor = '#777',
			display = 'IN PROGRESS';

		switch (status) {
			case 1: // For Approval
				textColor = '#888';
				display = 'FOR APPROVAL';
				break;

			case 2: // Active
				textColor = 'green';
				display = 'ACTIVE';
				break;

			case 3: // Deactivated
				textColor = 'indianred';
				display = 'DEACTIVATED';
				break;
		}

		return (

			<Text style={[Styles.fontGilroyBold, styles.itemStatus, { color: textColor }]}>{display}</Text>
		)
	}

	_onRefresh = () => {
		this.setState({ refreshing: true });

		this.getData();
	}

	_renderProperties = (searchQuery) => {
		const { properties, selectedProperty } = this.state;

		console.log(properties);
		
		
		let displayProperties = [];

		properties.map((val) => {
			if (val.title !== null) {
				if (val.title.toLowerCase().includes(searchQuery.toLowerCase()) === true) {
					displayProperties.push(val);
				}
			} else {
				val['title'] = 'No Title';
				displayProperties.push(val);
			}
		})

		if (displayProperties.length > 0) {
			return displayProperties.map((property, index) => {				
				return (
					<View key={property.id} >
						<TouchableOpacity onPress={() => this.showActions(property.id)} style={[styles.item, (index + 1) < displayProperties.length ? styles.itemDivider : null]}>
							<View style={{ width: '42%' }}>
								<Image
									source={{ uri: property.image != null ? Helpers.image_url + property.image :'http://192.168.1.20/earthling/assets/app/no-image.png' }}
									style={{ width: '100%', height: 80, borderRadius: 10 }}
									PlaceholderContent={<ActivityIndicator />}
								/>
							</View>
							<View style={[styles.itemContents, { width: '53%', zIndex: 0 }]}>
								<Text style={[styles.itemHeader, Styles.fontGilroyBold]}>{property.title}</Text>
								{
									property.price ? (
										<Text style={[Styles.fontGilroyBold, styles.itemPrice]}>${property.price}</Text>
									) : null
								}
								{this._renderStatus(property.final_status)}
							</View>
							<View style={{ width: '5%', alignItems: 'center', paddingTop: 5 }}>
								<View style={[styles.dot, { backgroundColor: selectedProperty == property.id ? 'orange' : '#555' }]}></View>
								<View style={[styles.dot, { backgroundColor: selectedProperty == property.id ? 'orange' : '#555' }]}></View>
								<View style={[styles.dot, { backgroundColor: selectedProperty == property.id ? 'orange' : '#555' }]}></View>
							</View>
						</TouchableOpacity>
						{
							selectedProperty == property.id ? (
								<Animatable.View style={styles.actions}>
									<TouchableOpacity onPress={() => this.setState({ selectedProperty: null })} style={styles.closeBtn}>
										<Text style={[Styles.fontGilroyBold, { color: 'white' }]}>x</Text>
									</TouchableOpacity>
									<TouchableOpacity onPress={() => { Actions.preview({ propertyID: property.id }) }}>
										<Text style={[styles.actionText, Styles.fontGilroyLight]}>Preview</Text>
									</TouchableOpacity>
									<Divider style={{ marginVertical: 6 }} />
									<TouchableOpacity onPress={() => {
										this.props.updateState({ target: 'propertyID', value: property.id });
										Actions.propertySetup();
									}}>
										<Text style={[styles.actionText, Styles.fontGilroyLight]}>Update</Text>
									</TouchableOpacity>
									{
										// 2 = active / approved
										property.approved_status == 2 ? (
											<View>
												<Divider style={{ marginVertical: 6 }} />
												<TouchableOpacity onPress={() => {
													this.changeStatus(property.status, property.id);
												}}>
													<Text style={[styles.actionText, Styles.fontGilroyLight]}>{property.status == 0 ? 'Activate' : 'Deactivate'}</Text>
												</TouchableOpacity>
											</View>
										) : null
									}
								</Animatable.View>
							) : null
						}
					</View>
				)
			})
		} else {
			return <Text style={[Styles.fontGilroyBold, { fontSize: 20, color: '#555' }]}>No Properties found</Text>
		}
	}

	render() {
		const { searchQuery } = this.state;

		return (
			<View style={{ flex: 1, backgroundColor: '#F5FEFF' }}>
				<SearchBar onChangeText={(value) => this.setState({ searchQuery: value })} addButtonAction={() => {
					this.props.updateState({ target: 'propertyID', value: null });
					Actions.propertySetup();
				}} />
				<ScrollView
					contentContainerStyle={{ paddingTop: 10, paddingBottom: 30 }}
					refreshControl={
						<RefreshControl
							refreshing={this.state.refreshing}
							onRefresh={this._onRefresh}
							colors={['orange', '#57b5aa']}
						/>
					}
				>
					<Animatable.View animation="fadeInUp" style={styles.properties}>
						{this._renderProperties(searchQuery)}
					</Animatable.View>
				</ScrollView>
			</View>
		);
	}
}

const mapStateToProps = state => {
	console.log('redux storage', state);
	
	return {
		userID: state.userID
	}
}

function mapDispatchToProps(dispatch) {
	return {
		updateState: (payload) => dispatch({
			type: 'UPDATE_STATE',
			payload: payload
		})
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Properties);

const styles = StyleSheet.create({
	properties: {
		backgroundColor: '#fff',
		margin: 15,
		padding: 15,
		borderRadius: 10,
		shadowColor: '#bbb',
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.3,
		shadowRadius: 5,
		elevation: 5,
	},
	item: {
		flexDirection: 'row',
	},
	itemDivider: {
		marginBottom: 15,
		paddingBottom: 15,
		borderBottomWidth: 1,
		borderBottomColor: '#eee'
	},
	itemContents: {
		paddingLeft: 15,
		paddingRight: 5,
	},
	itemHeader: {
		fontSize: 17,
		color: '#000'
	},
	itemPrice: {
		color: 'orange',
		fontSize: 10,
		marginTop: 5
	},
	itemStatus: {
		color: '#555',
		fontSize: 17,
	},
	dot: {
		borderRadius: 100,
		width: 3,
		height: 3,
		marginBottom: 1.7,
	},
	actions: {
		zIndex: 9999,
		backgroundColor: 'white',
		position: 'absolute',
		right: 25,
		top: 5,
		width: 150,
		paddingHorizontal: 20,
		paddingVertical: 15,
		borderRadius: 10, shadowColor: '#bbb',
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.3,
		shadowRadius: 5,
		elevation: 5,
	},
	actionText: {
		fontSize: 12
	},
	closeBtn: {
		backgroundColor: 'indianred',
		position: 'absolute',
		right: -5,
		top: -6,
		paddingHorizontal: 10,
		paddingVertical: 5,
		borderRadius: 50,
		opacity: .8
	}
});
