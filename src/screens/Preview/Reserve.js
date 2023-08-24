import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Styles from '../../assets/Styles';
import { defaultColors, ThemeButton, FullScreenLoader } from '../../components/Common';
import Helpers, { numberWithCommas, getDateDifference, parseSmallDate } from '../../Helpers';
import { Divider, Input } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import Axios from 'axios';
import qs from 'qs';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { connect } from 'react-redux';
import MyCounter from '../../components/MyCounter';
import { showMessage } from 'react-native-flash-message';
import Notifications from '../../Notifications';

class Reserve extends Component {
    constructor(props) {
        super(props);
        this.state = {
            additional_info: '',
            total: 0,
            guest: 1,
            subTotal: 0,
            total: 0,
            otherFees: [],
            dateDiff: 0,
            loading: true,
            loadingSubmit: true
        }
    }

    componentDidMount = () => {
        this.getData();
    }

    getData = () => {
        const { property_id } = this.props;
        Axios.get(
            Helpers.traveller_api + 'getReservationInfo/' + property_id
        ).then(response => {
            this.setState({
                pricing: response.data.pricing,
                availability: response.data.availability,
                property_info: response.data.property_info,
                owner_fcm: response.data.owner_fcm,
                loading: false,
                loadingSubmit: false,
            });
            this.getTotals(response.data);
        })
    }

    onSubmit = () => {
        this.setState({ loadingSubmit: true });
        const { property_id, userID, startDate, endDate } = this.props;
        const { additional_info, property_info, guest, total, owner_fcm } = this.state;

        const bookingData = {
            property_id,
            owner_id: property_info.owner_id,
            user_id: userID,
            start_date: startDate,
            due_date: endDate,
            no_guests: guest,
            total: total,
            description: additional_info
        };

        Axios.post(
            Helpers.traveller_api + 'submitbooking',
            qs.stringify(bookingData)
        ).then(response => {
            const { type } = response.data;

            this.setState({ loadingSubmit: false });

            if (type) {
                showMessage({
                    message: "Booked Successfully",
                    description: "Hander will be the one to approve your booking",
                    type: "success",
                    backgroundColor: "#459E94",
                    color: "#FFF",
                    duration: 2000,
                });

                const notificationParams = {
                    notifyFcm: owner_fcm,
                    content: 'You have a new Booking!',
                    link: 'bookings'
                };
                Notifications.sendNotification(notificationParams);

                Actions.bookings({ type: 'replace', params: 'yes' });
            } else {
                showMessage({
                    message: "Error",
                    description: "Something went wrong, please try again later",
                    type: "success",
                    backgroundColor: "#459E94",
                    color: "#FFF",
                    duration: 2000,
                });
            }
        })
    }

    getTotals = (data) => {
        const { pricing } = data;
        const { startDate, endDate } = this.props;

        const dateDiff = getDateDifference(startDate, endDate);

        let subTotal = 0, total = 0, otherFees = [];

        subTotal = pricing.base_price * dateDiff;
        total = total + parseFloat(subTotal);


        if (pricing.service_fee != null) {
            otherFees.push({ title: 'Service Fee', total: pricing.service_fee })
            total = total + parseFloat(pricing.service_fee);
        }

        if (pricing.cleaning_fee != null) {
            otherFees.push({ title: 'Cleaning Fee', total: pricing.cleaning_fee })
            total = total + parseFloat(pricing.cleaning_fee);
        }

        this.setState({
            subTotal,
            total,
            otherFees,
            dateDiff
        })
    }

    render() {
        const { pricing, availability, loading, loadingSubmit, subTotal, total, otherFees, dateDiff } = this.state;

        return (
            <View style={{ flex: 1 }}>
                <KeyboardAwareScrollView>
                    <View style={[Styles.container, { paddingVertical: 20 }]}>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={styles.headerSection}>
                                <TouchableOpacity onPress={Actions.pop}>
                                    <Text style={styles.sectionTitle}>Check In</Text>
                                    <Text style={styles.sectionData}>{parseSmallDate(this.props.startDate)}</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={[styles.headerSection, { alignItems: 'flex-end' }]}>
                                <TouchableOpacity onPress={Actions.pop}>
                                    <Text style={styles.sectionTitle}>Check Out</Text>
                                    <Text style={styles.sectionData}>{parseSmallDate(this.props.endDate)}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={[styles.dataContainer, { marginTop: 35 }]}>
                            <Text style={styles.data}>Guests</Text>
                            <MyCounter
                                start={1}
                                onChange={(guest) => this.setState({ guest: guest })}
                                touchableColor={'#53B6AB'}
                                touchableDisabledColor={'#aaa'}
                                textStyle={[Styles.fontGilroyBold, { fontSize: 20, color: defaultColors(1) }]}
                                buttonStyle={{ width: 25, height: 25 }}
                            />
                        </View>
                        <Divider style={{ marginVertical: 15 }} />
                        {
                            !loading ? (
                                <View style={{ flex: 1 }}>
                                    <Text style={[styles.sectionTitle, { marginBottom: 15 }]}>THINGS TO KNOW</Text>
                                    <View style={styles.dataContainer}>
                                        <Text style={styles.data}>Arrive After</Text>
                                        <Text style={styles.data}>{availability.arrive_after}</Text>
                                    </View>
                                    <View style={styles.dataContainer}>
                                        <Text style={styles.data}>Arrive Before</Text>
                                        <Text style={styles.data}>{availability.arrive_before}</Text>
                                    </View>
                                    <View style={styles.dataContainer}>
                                        <Text style={styles.data}>Leave Before</Text>
                                        <Text style={styles.data}>{availability.leave_before}</Text>
                                    </View>

                                    <Text style={[styles.sectionTitle, { marginBottom: 15, marginTop: 30 }]}>FEES & DETAILS</Text>
                                    <View style={[Styles.formGroup, { justifyContent: 'space-between', marginVertical: 10 }]}>
                                        <Text style={[Styles.fontGilroyLight, { fontSize: 23 }]}>${numberWithCommas(pricing.base_price)} x {dateDiff} nights</Text>
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
                                        <Text style={[Styles.fontGilroyBold, { fontSize: 23, color: '#555' }]}>Total ($)</Text>
                                        <Text style={[Styles.fontGilroyBold, { fontSize: 23, color: '#555' }]}>${numberWithCommas(total)}</Text>
                                    </View>

                                    <Divider style={{ marginVertical: 25 }} />

                                    <Text style={[Styles.fontGilroyBold, { fontSize: 18, color: '#888' }]}>Additional Information</Text>
                                    <Input
                                        multiline={true}
                                        inputContainerStyle={[Styles.inputContainerStyle, { minHeight: 100, marginBottom: 100 }]}
                                        placeholder='Write additional notes here'
                                        inputStyle={[Styles.inputStyle, Styles.fontGilroyLight, { flex: 1, alignSelf: 'flex-start' }]}
                                        onChangeText={(additional_info) => this.setState({ additional_info })}
                                        value={this.state.additional_info}
                                    />
                                </View>
                            ) : (
                                    <View style={{ marginTop: 40 }}>
                                        <FullScreenLoader theme="light" />
                                    </View>
                                )
                        }
                    </View>
                </KeyboardAwareScrollView>
                <View style={{ borderTopWidth: .5, borderColor: 'gainsboro', padding: 20, paddingTop: 13 }}>
                    <Text style={[Styles.fontGilroyLight, { color: '#888', fontSize: 13, marginBottom: 10 }]}>Submissions will be approved by property handler.</Text>
                    <ThemeButton title="Reserve Now" onPress={this.onSubmit} buttonStyle={{ paddingHorizontal: 25, height: 50 }} loading={loadingSubmit} />
                </View>
            </View >
        );
    }
}

const mapStateToProps = state => {
    return {
        userID: state.userID
    }
}

export default connect(
    mapStateToProps
)(Reserve);


const styles = StyleSheet.create({
    headerText: {
        textTransform: 'capitalize',
        fontFamily: "Gilroy-ExtraBold",
        fontSize: 25,
        marginBottom: 20,
        color: '#555'
    },
    headerSection: {
        flex: 1,
    },
    sectionTitle: {
        fontSize: 12,
        marginBottom: -3,
        color: '#555',
        textTransform: 'uppercase',
        ...Styles.fontGilroyLight
    },
    sectionData: {
        fontSize: 25,
        color: defaultColors(1),
        ...Styles.fontGilroyBold
    },
    dataContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 5
    },
    data: {
        fontSize: 25,
        color: '#555',
        ...Styles.fontGilroyLight
    }
});
