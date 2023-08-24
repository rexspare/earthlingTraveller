import React, { Component } from 'react';
import { View, StyleSheet, SafeAreaView, Dimensions } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Text } from 'react-native-elements';
import { connect } from 'react-redux'
import { LinearButton } from '../../components/Common';
import Styles from '../../assets/Styles';
import { CalendarList, Calendar } from 'react-native-calendars';

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;
import moment from 'moment'
import Navigator from '../../components/Navigator';
import { YellowBox } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';


var { GooglePlacesAutocomplete } = require('react-native-google-places-autocomplete');
YellowBox.ignoreWarnings([
    'VirtualizedLists should never be nested', // TODO: Remove when fixed
])

class CalendarL extends Component {

    constructor(props) {
        super(props);
        this.state = {
            search: '',
            selectedIndex: 0,
            markedDates: {},
            endDate: '',
            isStartDatePicked: false,
            isEndDatePicked: false,
            startDate: '',
            saving: false,
            modalVisible: false,
            modalVisibles: false,
            modalVisibless: false,
            room: 0,
            adult: 0,
            children: 0,
            modalSort: false,
            address: '',


        };
    }
    updateSearch = search => {
        this.setState({ search });
    };
    onDayPress = (day) => {
        console.log('heheh');

        if (this.state.isStartDatePicked == false) {
            let markedDates = {}

            markedDates[day.dateString] = { startingDay: true, color: '#57b5aa', textColor: 'white' };
            this.setState({
                markedDates: markedDates,
                isStartDatePicked: true,
                isEndDatePicked: false,
                startDate: day.dateString,
            });
            //this.setState({startDate:day.dateString});


        } else {
            console.log('else');

            let markedDates = this.state.markedDates;
            let startDate = moment(this.state.startDate);
            let endDate = moment(day.dateString);
            let range = endDate.diff(startDate, 'days');


            if (range > 0) {
                for (let i = 1; i <= range; i++) {
                    let tempDate = startDate.add(1, 'day');
                    console.log('tempdate', tempDate);

                    tempDate = moment(tempDate).format('YYYY-MM-DD')

                    if (i < range) {
                        markedDates[tempDate] = { color: '#00ddc3', textColor: 'white' };
                    } else {
                        markedDates[tempDate] = { endingDay: true, color: '#57b5aa', textColor: 'white' };
                    }
                    this.setState({ endDate: tempDate });

                }
                this.setState({
                    markedDates: markedDates,
                    isStartDatePicked: false,
                    isEndDatePicked: true,
                    tartDate: startDate
                });
            } else {
                alert('Select an upcomming date!');
            }
        }
    }
    // _changeText = (search) => {
    //     this.setState({search});
    //     console.log(search);

    // }
    openModal = () => {
        this.setState({ modalVisible: true });
    }
    openModalSort = () => {
        this.setState({ modalSort: true });
    }
    openModals = () => {
        this.setState({ modalVisibles: true });
    }
    openModalss = () => {
        this.setState({ modalVisibless: true });
    }
    closeModal = (dates) => {
        const markedDates = this.state.markedDates;
        this.setState({ modalVisible: false, modalVisibles: false, modalSort: false });
        console.log(markedDates);

    }
    closeModals = () => {


        this.setState({ modalVisibles: false, modalVisibless: false, });

    }
    setSelectedIndex = event => {
        // const viewSize = event.nativeEvent.layoutMeasurement.width;
        // const contentOffset = event.nativeEvent.contentOffset.x;
        // const selectedIndex = Math.floor(contentOffset / viewSize);

        // this.setState({ selectedIndex })
    }

    // onChange = (room) => {

    //     console.log("room", this.state)


    //     return (
    //         <Text style={[Styles.fontGilroyBold, Styles.smallText]}></Text>
    //     )

    // }

    setInitialStates = (data) => {
        console.log(data);

    }
    _renderRoom = () => {
        const room = this.state.room;
        const children = this.state.children;
        const adult = this.state.adult;
        if (room == 0 && adult == 0 & children == 0) {
            return (
                <Text>no room selected!</Text>
            )
        } else if (room != 0 && adult != 0 && children == 0) {
            return (
                <Text>{room} room - {adult} adult </Text>
            )
        } else {
            return (
                <Text>{room} room - {adult} adult and {children} children </Text>
            )
        }


    }
    onNextScreen = () => {
        Actions.geolocation;
    }
    _renderAddress = () => {

        return (
            <View>
                <Text>{this.props.address}</Text>

            </View>
        )
    }
    render() {
        const { markedDates, list, datez, endDate, startDate, search } = this.state;
        console.log(markedDates);
        console.log(endDate);
        console.log(startDate);
        const { selectedIndex } = this.state;
        console.log(this.state);



        return (
            <SafeAreaView style={{ flex: 1 }}>

                <CalendarList
                    pastScrollRange={6}
                    futureScrollRange={2}
                    showScrollIndicator
                    minDate={Date()}
                    monthFormat={"MMMM yyyy"}
                    markedDates={this.state.markedDates}
                    markingType="period"
                    hideExtraDays={true}
                    hideDayNames={true}
                    onDayPress={this.onDayPress}
                />


                <View style={{ padding: 10 }}>
                    <LinearButton
                        title="Submit"
                        onPress={() => this.closeModal()}
                        style={[Styles.buttonText, Styles.fontGilroyBold]}
                    />
                </View>



            </SafeAreaView>
        );
    }
}

const mapStateToProps = state => {
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
)(CalendarL);

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderBottomColor: '#d1dadb',
        borderBottomWidth: 1,
        flex: 1,

    },
    item: {
        flex: 1,
        padding: 10,
    },
    textInputContainer: {
        backgroundColor: 'white',
        borderRadius: 13,
        marginVertical: 5,
        borderWidth: 1,
        borderColor: '#ebebeb',
        height: 45
    },
    textInput: {
        paddingHorizontal: 5,
        fontSize: 12
    },
    fontGilroy: {
        fontFamily: "Gilroy-Light",
    },
    modalContainer: {
        justifyContent: 'center',
        paddingBottom: 40,

    },
    modalContainers: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',

    },
    innerContainer: {
        alignContent: 'center',
        height: '90%'
    },
    innerContainers: {
        padding: '10%',
        height: '90%',



    },
    modalContainerSort: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
    },
    innerContainersort: {
        borderRadius: 25, flex: 0,
        backgroundColor: 'white', margin: '5%',
        padding: 10

    },
    header: {
        borderBottomColor: '#ccc',

    },
});
