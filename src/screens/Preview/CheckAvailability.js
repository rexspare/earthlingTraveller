import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Styles from '../../assets/Styles';
import Icon from 'react-native-vector-icons/Ionicons';
import { CalendarList } from 'react-native-calendars';
import CustomNav1 from '../../components/CustomNav1';
import moment from 'moment'
import { ThemeButton, FullScreenLoader } from '../../components/Common';
import Axios from 'axios';
import Helpers, { parseSmallDate } from '../../Helpers';
import { Actions } from 'react-native-router-flux';

class CheckAvailabilty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            disabledDates: {
            },
            markedDates: '',
            isStartDatePicked: false,
            isEndDatePicked: false,
            endDate: '',
            startDate: '',
            loading: true,
        }
    }

    componentDidMount = () => {
        this.getDisabledDates();
    }

    getDisabledDates = () => {
        const { property_id } = this.props;

        Axios.get(
            Helpers.traveller_api + 'getDisabledDates/' + property_id
        ).then(response => {
            this.disableDates(response.data);
        })
    }

    disableDates = (dates) => {
        const parseDates = JSON.parse(dates);

        let disable = {};

        parseDates.map(date => {
            disable[date] = { disabled: true, disableTouchEvent: true };
        });

        this.setState({ disabledDates: disable, loading: false })
    }

    reset = () => {
        this.setState({
            markedDates: '',
            isStartDatePicked: false,
            isEndDatePicked: false,
            startDate: '',
        });
    }

    onDayPress = (day) => {
        if (this.state.isStartDatePicked == false) {
            let markedDates = {}

            markedDates[day.dateString] = { startingDay: true, color: '#00ddc3', textColor: 'white' };
            this.setState({
                markedDates: markedDates,
                isStartDatePicked: true,
                isEndDatePicked: false,
                startDate: day.dateString
            });
        } else {
            let markedDates = this.state.markedDates;
            let startDate = moment(this.state.startDate);
            let endDate = moment(day.dateString);
            let range = endDate.diff(startDate, 'days');


            if (range > 0) {
                for (let i = 1; i <= range; i++) {
                    let tempDate = startDate.add(1, 'day');

                    tempDate = moment(tempDate).format('YYYY-MM-DD')

                    if (i < range) {
                        markedDates[tempDate] = { color: '#00ddc3', textColor: 'white' };
                    } else {
                        markedDates[tempDate] = { endingDay: true, color: '#00ddc3', textColor: 'white' };
                    }
                    this.setState({ endDate: tempDate });

                }

                this.setState({
                    markedDates: markedDates,
                    isStartDatePicked: false,
                    isEndDatePicked: true
                });
            } else {
                alert('Select an upcomming date!');
            }
        }
    }

    goToReservation = () => {
        const { property_id } = this.props;
        const { startDate, endDate } = this.state;

        const passData = {
            property_id: property_id,
            startDate: startDate,
            endDate: endDate,
        };

        Actions.reserve(passData)
    }

    render() {
        const { isStartDatePicked, markedDates, disabledDates, isEndDatePicked, startDate, endDate, loading } = this.state;
        const newDate = new Date();

        return !loading ? (
            <View style={{ flex: 1 }}>
                <CustomNav1 rightIcon="undo" rightIconAction={this.reset} />
                <View style={{ padding: 25, borderBottomWidth: .5, borderColor: 'gainsboro' }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={[Styles.fontGilroyLight, { fontSize: 28, flex: 1, textAlign: 'center' }]}>
                            {
                                isStartDatePicked || isEndDatePicked ? parseSmallDate(startDate) : 'Check In '
                            }
                        </Text>
                        <Icon name="ios-arrow-round-forward" size={28} color="gainsboro" />
                        <Text style={[Styles.fontGilroyLight, { fontSize: 28, flex: 1, textAlign: 'center' }]}>
                            {
                                isEndDatePicked ? parseSmallDate(endDate) : 'Check Out'
                            }
                        </Text>
                    </View>
                </View>
                <View style={{ flex: 1 }}>
                    <CalendarList
                        pastScrollRange={0}
                        futureScrollRange={10}
                        scrollEnabled={true}
                        showScrollIndicator={true}
                        minDate={newDate}
                        onDayPress={this.onDayPress}
                        markingType={'period'}
                        markedDates={{ ...markedDates, ...disabledDates }}
                        theme={{
                            'stylesheet.day.period': {
                                base: {
                                    overflow: 'hidden',
                                    height: 34,
                                    alignItems: 'center',
                                    width: 38,
                                }
                            },
                            backgroundColor: '#ffffff',
                            calendarBackground: '#ffffff',
                            textSectionTitleColor: '#b6c1cd',
                            selectedDayBackgroundColor: '#00adf5',
                            selectedDayTextColor: '#ffffff',
                            todayTextColor: '#00adf5',
                            dayTextColor: '#2d4150',
                            textDisabledColor: '#d9e1e8',
                            dotColor: '#00adf5',
                            selectedDotColor: '#ffffff',
                            arrowColor: 'orange',
                            disabledArrowColor: '#d9e1e8',
                            monthTextColor: '#555',
                            indicatorColor: 'blue',
                            textDayFontFamily: 'Gilroy-Light',
                            textMonthFontFamily: 'Gilroy-ExtraBold',
                            textDayHeaderFontFamily: 'Gilroy-Light',
                            textDayFontWeight: '300',
                            textDayHeaderFontWeight: '300',
                            textDayFontSize: 16,
                            textMonthFontSize: 25,
                            textDayHeaderFontSize: 16
                        }}
                    />
                </View>
                {
                    isEndDatePicked ? (
                        <View style={{ borderTopWidth: .5, borderColor: 'gainsboro', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20 }}>
                            <Text style={[Styles.fontGilroyBold, { fontSize: 15 }]}>{Object.keys(markedDates).length - 1} night(s) selected.</Text>
                            <ThemeButton title="Reserve" onPress={this.goToReservation} buttonStyle={{ paddingHorizontal: 25 }} />
                        </View>
                    ) : null
                }
            </View >
        ) : <FullScreenLoader theme="light" />
    }
}

export default CheckAvailabilty;

const styles = StyleSheet.create({
    headerText: {
        textTransform: 'capitalize',
        fontFamily: "Gilroy-ExtraBold",
        fontSize: 25,
        marginTop: 30
    },
    amenity: {
        fontSize: 20,
        marginVertical: 20,
        paddingBottom: 20,
        borderBottomWidth: 1,
        borderColor: '#ebebeb'
    }
});
