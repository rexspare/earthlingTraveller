import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Image, Divider, Button, Badge } from 'react-native-elements';
import Helpers, { numberWithCommas, getDateDifference, parseSmallDate, AppConfig } from '../../Helpers';
import { Actions } from 'react-native-router-flux';
import { RatingStars, Dot, FullScreenLoader, ThemeButton, defaultColors } from '../../components/Common';
import Styles from '../../assets/Styles';
import Axios from 'axios';
import qs from 'qs';
import { showMessage } from 'react-native-flash-message';
// import PayPal from 'react-native-paypal-wrapper';
import prompt from 'react-native-prompt-android';
import EvilIcons from 'react-native-vector-icons/EvilIcons';


class BookInfo extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loadingSubmit: false,
			loading: true,
			cancelLoading: false
		};
	}

	componentDidMount = () => {
		this.getBookingInformation();
	}

	getBookingInformation = () => {
		this.setState({ loading: true });
		const booking_id = this.props.booking_id;

		Axios.get(
			Helpers.api_url + 'get_booking_info/' + booking_id
		).then((response) => {
			this.setState({
				bookingInfo: response.data,
				loading: false,
				cancelLoading: false
			})
		})
	}

	cancelBookingModal = () => {
		prompt(
			'Are you sure?',
			'Enter "YES" to cancel this booking',
			[
				{ text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
				{ text: 'OK', onPress: value => this.cancelBooking(value) },
			],
			{
				type: 'secure-text',
				cancelable: false,
				placeholder: ''
			}
		);
	}

	cancelBooking = (confirm) => {
		if (confirm.toLowerCase() != 'yes') {
			showMessage({
				message: 'Oops!',
				description: 'Confirmation Incorrect',
				type: 'error',
				backgroundColor: "#fff",
				color: "#555",
			});
			return false;
		}
		this.setState({ cancelLoading: true });
		const { booking_id } = this.props;

		Axios.post(
			Helpers.traveller_api + 'changeBookingStatus',
			qs.stringify({
				to_status: 4,
				booking_id: booking_id
			})
		).then(response => {
			showMessage({
				message: 'Success!',
				description: 'Booking Cancelled',
				type: 'error',
				backgroundColor: "#459E94",
				color: "#FFF",
			});

			this.getBookingInformation();
		})
	}

	changeStatus = () => {
		this.setState({ loading: true });

		Axios.post(
			Helpers.traveller_api + 'changeBookingStatus',
			qs.stringify({
				to_status: 2,
				booking_id: this.state.bookingInfo.booking_id
			})
		).then(response => {
			showMessage({
				message: 'Success',
				description: 'Payment Successful',
				type: 'error',
				backgroundColor: "#459E94",
				color: "#FFF",
			});
			this.props.refreshBookings();
			this.getBookingInformation();
		})
	}

	onSuccess = () => {
		this.changeStatus();
	}

	onError = () => {
		showMessage({
			message: 'Something went wrong!',
			description: 'Payment has been cancelled.',
			type: 'error',
			backgroundColor: "#FFF",
			color: "#555",
			duration: 1000,
		});
	}

	initPaypal = () => {
		const { bookingInfo } = this.state;
		
		Actions.paypalview({ amount: this.state.bookingInfo.total, description: bookingInfo.name + ' - Booking Payment', onSuccess: this.onSuccess });
		return false;

		if (AppConfig.CLIENTID != "") {
			//SANDBOX, PRODUCTION
			PayPal.initialize(PayPal.SANDBOX, AppConfig.CLIENTID);
			// price: '1',
			PayPal.pay({
				price: this.state.bookingInfo.total,
				currency: 'USD',
				description: bookingInfo.name + ' - Booking Payment',
			}).then(confirm => {
				if (confirm.response_type == 'payment' && confirm.response.state == 'approved') {
					this.changeStatus();
				} else {
					showMessage({
						message: 'Something went wrong!',
						description: 'Payment has been cancelled.',
						type: 'error',
						backgroundColor: "#FFF",
						color: "#555",
						duration: 1000,
					});
				}
			}).catch(error => {
				showMessage({
					message: 'Cancelled!',
					description: 'Payment has been cancelled.',
					type: 'error',
					backgroundColor: "#FFF",
					color: "#555",
					duration: 1000,
				});
			});
		} else {
			showMessage({
				message: 'Oops!',
				description: 'Something went wrong.',
				type: 'error',
				backgroundColor: "#FFF",
				color: "#555",
				duration: 1000,
			});
		}

	}

	parseDateRange = (start_date, due_date) => {
		const newStartDate = parseSmallDate(start_date);
		const newEndDate = parseSmallDate(due_date);
		return newStartDate + ' - ' + newEndDate
	}

	contactProfile = () => {
		const { owner_id } = this.state.bookingInfo

		Actions.viewprofile({ profileID: owner_id })
	}

	render() {
		const { bookingInfo } = this.state;

		return this.state.loading ? (
			<FullScreenLoader theme="light" />
		) : (
				<View style={{ flex: 1 }}>
					<ScrollView style={{ padding: 25 }}>
						<TouchableOpacity onPress={() => Actions.preview({ property_id: bookingInfo.property_id })}>
							<View style={styles.headerContainer}>
								<Image style={styles.headerImage} source={{ uri: Helpers.image_url + (bookingInfo.image != '' && bookingInfo.image != null ? bookingInfo.image : 'no-image.jpg') }} />
								<View style={{ marginTop: -4, flex: 1 }}>
									<Text style={[Styles.fontGilroyBold, { fontSize: 20 }]}>{bookingInfo.property_title}</Text>
									<Text style={[Styles.fontGilroyLight, { marginTop: 3 }]}>Date: {this.parseDateRange(bookingInfo.start_date, bookingInfo.due_date)}</Text>
									<View style={{ flex: 1, alignItems: 'flex-start', marginVertical: 13 }}>
										<Badge value={<Text style={[Styles.fontGilroyBold, { color: bookingInfo.status.color }]}>{bookingInfo.status.text}</Text>} badgeStyle={{ backgroundColor: bookingInfo.status.backgroundColor, paddingVertical: 13, paddingHorizontal: 20 }} />
									</View>
								</View>
							</View>
						</TouchableOpacity>
						<View style={styles.bookingInformation}>
							<Text style={[Styles.fontGilroyBold, { fontSize: 18, color: defaultColors(1), marginBottom: 8 }]}>RESERVATION INFO</Text>
							<Text style={[Styles.fontGilroyLight, { fontSize: 25, textTransform: 'uppercase' }]}>{bookingInfo.name}</Text>
							<TouchableOpacity onPress={() => Actions.viewpricing({ booking_id: this.props.booking_id })}>
								<View style={[Styles.formGroup, { marginTop: 15, alignItems: 'center' }]}>
									<Text style={Styles.fontGilroyLight}>{bookingInfo.no_guests} Guest(s)</Text>
									<Dot />
									<Text style={[Styles.fontGilroyLight]}>{getDateDifference(bookingInfo.start_date, bookingInfo.due_date)} Nights</Text>
									<Dot />
									<Text style={Styles.fontGilroyLight}>$ {numberWithCommas(bookingInfo.total)}</Text>
									<EvilIcons size={22} style={{ marginLeft: 5 }} name="question" />
								</View>
							</TouchableOpacity>
							<Text style={[Styles.fontGilroyLight, { fontSize: 27, marginTop: 20 }]}>{bookingInfo.description}</Text>
						</View>
						<Divider style={{ marginVertical: 20, width: '95%', alignSelf: 'center' }} />
						{
							bookingInfo.reason ? (
								<View>
									<Text style={[Styles.fontGilroyBold, { marginBottom: 10, fontSize: 20 }]}>Reason: </Text>
									<Text style={Styles.fontGilroyLight}>{bookingInfo.reason}</Text>
								</View>
							) : null
						}
					</ScrollView>
					<View style={[Styles.bottomAction, { borderTopWidth: 1, padding: 15 }]}>
						{
							bookingInfo.status.text == 'Pending' ? (
								<View>
									<Text style={[Styles.fontGilroyLight, { textAlign: 'justify', marginBottom: 10 }]}>Handler is still reviewing your submission</Text>
									<ThemeButton title="Cancel Booking" onPress={this.cancelBookingModal} loading={this.state.cancelLoading} />
								</View>
							) : bookingInfo.status.text == 'For Payment' ? (
								<View>
									<Text style={[Styles.fontGilroyLight, { textAlign: 'justify', marginBottom: 10 }]}>Pay via PayPal to proceed on booking.</Text>
									<View style={styles.buttons}>
										<ThemeButton title="Pay by PayPal" onPress={this.initPaypal} containerStyle={{ width: '49%' }} loading={this.state.loadingSubmit} />
										<ThemeButton title="Cancel Booking" outline={true} containerStyle={{ width: '49%' }} onPress={this.cancelBookingModal} loading={this.state.cancelLoading} />
									</View>
								</View>
							) : bookingInfo.status.text == 'Cancelled' ? (
								<TouchableOpacity onPress={this.contactProfile}>
									<View style={[Styles.actionButtons, { backgroundColor: defaultColors(1) }]}>
										<Text style={[Styles.fontGilroyBold, { color: 'white', fontSize: 16 }]}>Contact Host</Text>
									</View>
								</TouchableOpacity>
							) : bookingInfo.status.text == 'In Progress' ? (
								<Text style={[Styles.fontGilroyLight, { textAlign: 'justify', marginBottom: 20 }]}>This booking is still in progress. The handler will be the one to complete this booking.</Text>
							) : bookingInfo.status.text == 'Completed' ? (
								<View>
									<Text style={[Styles.fontGilroyLight, { textAlign: 'justify', marginBottom: 20 }]}>Booking completed, we hope you enjoyed your stay.</Text>
									{
										bookingInfo.rating_id == '0' ? (
											<ThemeButton title="Submit a Review" onPress={() => Actions.submitreview({ propertyID: bookingInfo.property_id, booking_id: this.props.booking_id, refreshBookInfo: this.getBookingInformation })} loading={this.state.loadingSubmit} />
										) : null
									}
								</View>
							) : <View></View>
						}
					</View>
				</View>
			)
	}
}

export default BookInfo;

const styles = StyleSheet.create({
	headerContainer: {
		flexDirection: 'row',
	},
	statusBadge: {
		width: 'auto',
		backgroundColor: 'green',
	},
	headerImage: {
		width: 150,
		height: 100,
		borderRadius: 5,
		marginRight: 15,
	},
	bookingInformation: {
		marginTop: 25
	},
	buttons: {
		justifyContent: 'space-between',
		flexDirection: 'row',
	}
});
