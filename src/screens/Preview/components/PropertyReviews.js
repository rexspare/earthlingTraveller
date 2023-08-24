import React, { Component } from 'react';
import { View, StyleSheet, ActivityIndicator, Platform } from 'react-native';
import { RatingStars } from '../../../components/Common';
import Styles from '../../../assets/Styles';
import { Text, Avatar, Header } from 'react-native-elements';
import { CollapsibleHeaderFlatList } from 'react-native-collapsible-header-views';
import Axios from 'axios';
import CustomNav1 from '../../../components/CustomNav1';
import Helpers, { parseDate } from '../../../Helpers';


const ListItemComponent = ({ item }) => {
	return (
		<View key={item.id} style={{ flex: 1, marginBottom: 40 }}>
			<View style={{ flexDirection: 'row', alignItems: 'center' }}>
				<Avatar
					rounded
					size={'medium'}
					source={{
						uri: Helpers.avatars_url + (item.avatar != '' ? item.avatar : 'no-avatar.png'),
					}}
				/>
				<View style={{ flexDirection: 'column' }}>
					<Text style={[Styles.fontGilroyBold, { textTransform: 'capitalize', marginHorizontal: 10 }]}>{item.firstname + ' ' + item.lastname}</Text>
					<Text style={[Styles.fontGilroyLight, { textTransform: 'capitalize', marginHorizontal: 10 }]}>{parseDate(item.date)}</Text>
				</View>
				<View style={{ flexDirection: 'row', alignSelf: 'flex-start', flex: 1, justifyContent: 'flex-end' }}>
					<RatingStars stars={item.stars} />
				</View>
			</View>
			<View style={{ marginTop: 15 }}>
				<Text style={Styles.fontGilroyLight}>{item.review}</Text>
			</View>
		</View>
	)
}


class PropertyReviews extends Component {
	state = {
		reviews: [],
		currentPage: 0,
		loading: false
	}

	constructor(props) {
		super(props);
	}

	componentDidMount = () => {
		this.getData();
	}

	getData = async () => {
		this.setState({ loading: true });
		const maxDisplay = 10, newPage = this.state.currentPage + 1;

		const
			url = Helpers.api_url + 'getreviews?property=' + this.props.property_id + '&_limit=' + maxDisplay + '&_page=' + newPage,
			self = this;

		await Axios.get(
			url,
		).then(function (response) {
			let newData = [];

			response.data.reviews.map(data => {
				newData.push(data);
			})

			self.state.reviews.map(data => {
				newData.push(data);
			})

			if (response.data.reviews) {
				self.setState({ reviews: newData, currentPage: newPage, loading: false })
			}
		}).catch(({ error }) => {
			console.log(error);
		});
	}


	_renderRatings = (data) => {
		const displayRatings = [
			{ id: 5, name: '5 Star', percentage: '0%' },
			{ id: 4, name: '4 Star', percentage: '0%' },
			{ id: 3, name: '3 Star', percentage: '0%' },
			{ id: 2, name: '2 Star', percentage: '0%' },
			{ id: 1, name: '1 Star', percentage: '0%' },
		]

		const ratings = data.stars_percentage;

		if (ratings != null) {
			return displayRatings.map((rating) => {
				const percentage = (ratings[rating.id] ? ratings[rating.id] : 0).toFixed(0) + '%';
				return (
					<View key={rating.id} style={{ flexDirection: 'row', paddingVertical: 6, alignContent: 'center', alignItems: 'center' }}>
						<View style={{ width: '15%' }}>
							<Text style={Styles.fontGilroyLight}>{rating.name}</Text>
						</View>
						<View style={{ width: '75%', height: 13, }}>
							<View style={styles.barBackground}>
								<View style={[styles.bar, { width: percentage }]}></View>
							</View>
						</View>
						<View style={{ width: '10%', alignItems: 'flex-end' }}>
							<Text style={[Styles.fontGilroyLight, { fontSize: 10 }]}>{percentage}</Text>
						</View>
					</View>
				)
			});
		} else {
			return <View />
		}
	}


	_renderHeader = () => {
		return (
			<View style={{ flex: 1 }}>
				<CustomNav1 lightTheme={true} />
				<View style={{ paddingHorizontal: 25, marginTop: 10 }}>
					<Text style={[styles.sectionHeader, Styles.fontGilroyBold]}>Rating</Text>
					{this._renderRatings(this.props.rating)}
				</View>
			</View>
		)
	}

	// _renderFooter = () => {
	// 	if (this.state.loading) {
	// 		return (
	// 			<View style={{ flex: 1, paddingVertical: 15 }}>
	// 				<ActivityIndicator size="large" color="orange" />
	// 			</View>
	// 		)
	// 	} else {
	// 		return null
	// 	}
	// }

	render() {
		return (
			<CollapsibleHeaderFlatList
				CollapsibleHeaderComponent={this._renderHeader()}
				headerHeight={Platform.OS === 'ios' ? 280 : 260}
				headerContainerBackgroundColor={'#fff'}
				data={this.state.reviews}
				renderItem={ListItemComponent}
				onEndReached={() => this.getData()}
				onEndReachedThreshold={0}
				style={{ paddingHorizontal: 25 }}
			/>

		);
	}
}

export default PropertyReviews;


const styles = StyleSheet.create({
	barBackground: {
		backgroundColor: 'gainsboro',
		width: '100%',
		borderRadius: 100,
		height: 10,
		flex: 1
	},
	bar: {
		backgroundColor: 'orange',
		flex: 1,
		borderRadius: 100,
	},
	overAllRating: {
		backgroundColor: 'orange',
		paddingHorizontal: 10,
		paddingVertical: 2,
		borderRadius: 100,
		marginLeft: 10,
		color: '#fff',
	},
	sectionHeader: {
		paddingVertical: 5,
		color: '#555',
		fontSize: 18
	},
});