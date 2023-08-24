import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, } from 'react-native';
import { Image, Divider } from 'react-native-elements';
import Helpers, { defaultColors, numberWithCommas, getDateDifference } from '../../../Helpers';
import Styles from '../../../assets/Styles';
import { RatingStars, Dot, FullScreenLoader } from '../../../components/Common';
import Axios from 'axios';
import qs from 'qs';
import { showMessage } from 'react-native-flash-message';
import { Actions } from 'react-native-router-flux';

class ViewPricing extends Component {
	constructor(props) {
		super(props);
		this.state = {
			bookingInfo: {},
			loading: true
		};
	}

	componentDidMount = () => {
		Axios.get(
			Helpers.api_url + 'get_pricing_info/' + this.props.booking_id
		).then(response => {
			this.setState({
				bookingInfo: response.data,
				loading: false
			})
		})
	}

	render() {
		let total = 0;

		const { bookingInfo } = this.state;

		const dateDiff = getDateDifference(bookingInfo.start_date, bookingInfo.due_date);
		
		const subTotal = bookingInfo.base_price * dateDiff;
		total = total + parseFloat(subTotal);
		
		let otherFees = [];
		
		if (bookingInfo.service_fee != null) {
			otherFees.push({ title: 'Service Fee', total: bookingInfo.service_fee })
			total = total + parseFloat(bookingInfo.service_fee);
		}
		
		if (bookingInfo.cleaning_fee != null) {
			otherFees.push({ title: 'Cleaning Fee', total: bookingInfo.cleaning_fee })
			total = total + parseFloat(bookingInfo.cleaning_fee);
		}
		
		return this.state.loading ?
			(
				<FullScreenLoader theme="light" />
			) :
			(
				<View style={{ flex: 1 }}>
					<View style={Styles.container}>
						<Text style={[Styles.fontGilroyBold, { fontSize: 25, marginBottom: 15 }]}>FEES AND DETAILS </Text>

						<View style={[Styles.formGroup, { justifyContent: 'space-between', marginVertical: 10 }]}>
							<Text style={[Styles.fontGilroyLight, { fontSize: 23 }]}>${numberWithCommas(bookingInfo.base_price)} x {dateDiff} nights</Text>
							<Text style={[Styles.fontGilroyLight, { fontSize: 23 }]}>${numberWithCommas(subTotal)}</Text>
						</View>
						{
							otherFees.map((feeInformation, i) => {
								return (
									<View key={i} style={[Styles.formGroup, { justifyContent: 'space-between', marginVertical: 10 }]}>
										<Text style={[Styles.fontGilroyLight, { fontSize: 23 }]}>{feeInformation.title}</Text>
										<Text style={[Styles.fontGilroyLight, { fontSize: 23 }]}>${numberWithCommas(feeInformation.total)}</Text>
									</View>
								)
							})
						}
						<Divider style={{ marginVertical: 25 }} />

						<View style={[Styles.formGroup, { justifyContent: 'space-between', marginVertical: 10 }]}>
							<Text style={[Styles.fontGilroyBold, { fontSize: 23 }]}>Total ($)</Text>
							<Text style={[Styles.fontGilroyBold, { fontSize: 23 }]}>${numberWithCommas(total)}</Text>
						</View>
					</View>
				</View >
			)
	}
}

export default ViewPricing;

const styles = StyleSheet.create({
	propertyImage: {
		width: 150,
		height: 80,
	}
});