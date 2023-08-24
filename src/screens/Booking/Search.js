import React, { Component } from 'react';
import { View, StyleSheet, ImageBackground, ScrollView, SafeAreaView, Dimensions, Modal, Image, TouchableOpacity, Alert, RefreshControl } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Input, Text, ListItem, Divider } from 'react-native-elements';
import { connect } from 'react-redux'
import { LinearButton, LinearButtons, TransparentHeaderLogo, FullScreenLoader } from '../../components/Common';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Styles from '../../assets/Styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import { CalendarList, Calendar } from 'react-native-calendars';
import Counter from "react-native-counters";
import Axios from 'axios';
import Helpers from '../../Helpers';
import Geolocation from '@react-native-community/geolocation';
import qs from 'qs';
import * as Animatable from 'react-native-animatable';


const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;
import moment from 'moment'
import Navigator from '../../components/Navigator';
import { YellowBox } from 'react-native';

YellowBox.ignoreWarnings([
    'VirtualizedLists should never be nested', // TODO: Remove when fixed
])

class Search extends Component {
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
            coordinates: {},
            properties: [],
            profileImage: '',
            prop_last: [],
            my_location: {},
            loading: true
        };
    }

    resetFields = () => {
        this.setState({
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
            properties: [],
            profileImage: '',
            prop_last: [],
        })
    }

    componentDidMount = () => {
        this.getTopDestination();
        this.getUserProfile();
        this.getLastSearch();
        this.getCurrentLocation();
    }

    getCurrentLocation = () => {
        Geolocation.getCurrentPosition(({ coords }) => {
            this.setState({
                my_location: {
                    latitude: coords.latitude,
                    longitude: coords.longitude,
                }
            })
        }, (err) => {
            console.log('error', err);
        })
    }

    getUserProfile = () => {
        Axios.get(Helpers.traveller_api + 'get_user_info/' + this.props.userID + '/avatar').then(response => {
            this.setState({
                profileImage: response.data.avatar
            })
        });
    }

    getTopDestination = () => {
        Axios.post(Helpers.traveller_api + 'getTopDestination/')
            .then(response => {
                this.setState({ properties: response.data });

            })
    }
    getLastSearch = () => {
        const user_id = this.props.userID;

        Axios.post(Helpers.traveller_api + 'getSearchHistory/' + user_id)
            .then(response => {
                this.setState({ prop_last: response.data, loading: false });

            })
    }
    _renderHistory = () => {
        const history = this.state.prop_last;

        if (Array.isArray(history)) {
            return history.map((val, index) => {
                return (
                    <TouchableOpacity
                        onPress={() => this._propertySelected(val.property_id)}
                        key={index}
                        style={styles.cardContainer}
                    >
                        <Image
                            key={val[index]}
                            style={styles.cardImage}
                            source={{ uri: Helpers.image_url + val.filename }}
                        />
                        <Text numberOfLines={1} style={[Styles.fontGilroyLight, styles.cardText]}>{val.property_title}</Text>
                    </TouchableOpacity>
                )
            })
        } else {
            return (
                <>
                    <Text style={Styles.fontGilroyLight}>No Record Found</Text>
                </>
            )
        }
    }

    _propertySelected = (property_id) => {
        Actions.preview(
            { property_id: property_id }
        );
    }

    propertyPreview = (data) => {
        const curr = data.property_id;

        Actions.preview({
            ...curr
        });
    }

    _renderTopDestination = () => {
        const datas = this.state.properties;

        if (Array.isArray(datas)) {
            return datas.map((val, index) => {
                return (
                    <TouchableOpacity
                        onPress={() => this._propertySelected(val.property_id)}
                        key={index}
                        style={styles.cardContainer}>
                        <Image
                            key={val[index]}
                            style={styles.cardImage}
                            source={{ uri: Helpers.image_url + val.filename }}
                        />
                        <Text numberOfLines={1} style={[Styles.fontGilroyLight, styles.cardText]}>{val.property_title}</Text>
                    </TouchableOpacity>
                )
            })
        } else {
            return <Text style={Styles.fontGilroyLight}>No Record Found</Text>
        }
    }

    updateSearch = search => {
        this.setState({ search });
    };

    onDayPress = (day) => {
        if (this.state.isStartDatePicked == false) {
            let markedDates = {}

            markedDates[day.dateString] = { startingDay: true, color: '#57b5aa', textColor: 'white' };
            this.setState({
                markedDates: markedDates,
                isStartDatePicked: true,
                isEndDatePicked: false,
                startDate: day.dateString,
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
                        markedDates[tempDate] = { color: '#57b5aa', textColor: 'white' };
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
    }

    closeModals = () => {
        this.setState({ modalVisibles: false, modalVisibless: false, });
    }

    SearchNow = () => {
        const startDate = this.state.startDate;
        const endDate = this.state.endDate;
        const room = this.state.room;
        const children = this.state.children;
        const adult = this.state.adult;
        const address = this.state.address;
        const coordinates = this.state.coordinates;
        const my_location = this.state.my_location;
        const markedDates = this.state.markedDates;
        const data = { startDate, endDate, room, children, adult, address, coordinates, my_location, markedDates };

        Axios.post(
            Helpers.api_url + 'getPropertyAvailability/',
            qs.stringify(data)
        ).then(response => {
            if (response.data.length) {
                Actions.filterbysearch({ properties: response.data });
            } else {
                alert("No available property on that location and dates!");
            }
        });

    }

    _renderRoom = () => {
        const room = this.state.room;
        const children = this.state.children;
        const adult = this.state.adult;
        if (room == 0 && adult == 0 & children == 0) {
            return (
                <Text style={[Styles.fontGilroyBold, { color: '#333' }]}>-</Text>
            )
        } else if (room != 0 && adult != 0 && children == 0) {
            return (
                <Text style={[Styles.fontGilroyBold, { color: '#333' }]}>{room} room - {adult} adult </Text>
            )
        } else {
            return (
                <Text style={[Styles.fontGilroyBold, { color: '#333' }]}>{room} room - {adult} adult and {children} children </Text>
            )
        }


    }
    onNextScreen = () => {
        Actions.geolocation;
    }

    updateAddress = (newAddress, newCoordinates) => {
        this.setState({
            address: newAddress,
            coordinates: newCoordinates
        })
    }

    _renderAddress = () => {
        return (
            <View>
                <Text style={Styles.fontGilroyLight}>{this.state.address}</Text>
            </View>
        )
    }

    _onRefresh = () => {
        this.resetFields();
        this.componentDidMount();
    }

    render() {
        const { markedDates, endDate, startDate } = this.state;

        return this.state.loading ? <FullScreenLoader /> : (
            <SafeAreaView style={{ flex: 1 }}>
                <KeyboardAwareScrollView
                    style={{ flex: 0, backgroundColor: '#EDF7FC' }}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.loading}
                            onRefresh={this._onRefresh}
                            colors={['orange', '#57b5aa']}
                        />
                    }
                >
                    <ImageBackground style={{ flex: 1 }} imageStyle={{ height: deviceHeight }} source={require('../../assets/images/BG_traveller.png')}>
                        <TransparentHeaderLogo loading={this.state.loading} profileImage={this.state.profileImage} />
                        <Animatable.View animation="fadeInUp" style={{ flex: 1, flexDirection: 'column', padding: 10, marginTop: '50%' }}>
                            <ImageBackground style={{ width: '100%', flex: 1 }} imageStyle={{ borderRadius: 25, }} source={require('../../assets/images/overlay.png')} >
                                <View style={[Styles.fontGilroyLight, Styles.mediumTexts, { paddingLeft: 20, paddingTop: 20 }]}><Text style={[Styles.fontGilroyLight, Styles.mediumTexts]}>WHERE TO GO</Text></View>
                                <View style={{ flex: 0, paddingHorizontal: 15, marginBottom: 10 }}>
                                    <ListItem
                                        containerStyle={{ borderRadius: 10, height: 40, padding: 15 }}
                                        style={{ borderRadius: 10 }}
                                        title='Where to go'
                                        title={this._renderAddress()}
                                        leftIcon={
                                            <Icon name="search" size={20} color="#bbb" style={{ paddingVertical: 5 }} />
                                        }
                                        onPress={() => Actions.geolocation({ updateAddress: this.updateAddress })} />
                                </View>
                                <View style={[styles.container, { marginHorizontal: 10 }]}>
                                    <View style={[styles.item]}>
                                        <TouchableOpacity onPress={() => this.openModal()} >
                                            <Text style={[Styles.fontGilroyLight]}>CHOOSE DATE</Text>
                                            <Text style={[Styles.smallText, Styles.fontGilroyBold]}>{startDate}-{endDate}</Text>
                                        </TouchableOpacity>
                                        <Modal
                                            visible={this.state.modalVisible}
                                            animationType={'slide'}
                                            onRequestClose={() => this.closeModal(markedDates)}>
                                            <View style={styles.modalContainer}>
                                                <View style={styles.innerContainer}>
                                                    <View style={styles.header}>
                                                        <Text style={[Styles.fontGilroyBold, { fontSize: 20, alignSelf: 'center' },]}>Select Dates</Text>
                                                        <Text style={[Styles.fontGilroyLight, { fontSize: 13, color: '#555', alignSelf: 'center' }]}>Choose dates you wish to book</Text>
                                                    </View>
                                                    <CalendarList
                                                        onDayPress={this.onDayPress}
                                                        minDate={Date()}
                                                        monthFormat={"MMMM yyyy"}
                                                        markedDates={this.state.markedDates}
                                                        markingType="period"
                                                        hideExtraDays={true}
                                                        hideDayNames={true}
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


                                                    <View style={{ padding: 10 }}>
                                                        <LinearButton
                                                            title="Submit"
                                                            onPress={() => this.closeModal()}
                                                            style={[Styles.buttonText, Styles.fontGilroyBold]}
                                                        />
                                                    </View>
                                                </View>
                                            </View>
                                        </Modal>
                                    </View>
                                    <View style={{ borderRightWidth: 1, borderColor: '#d1dadb', height: '60%', alignSelf: 'center' }}></View>
                                    <View style={styles.item}>
                                        <TouchableOpacity onPress={() => this.openModals()}>
                                            <Text style={[Styles.fontGilroyLight]}>NUMBER OF ROOMS</Text>
                                            {this._renderRoom()}
                                        </TouchableOpacity>
                                        <Modal
                                            visible={this.state.modalVisibles}
                                            transparent={true}
                                            animationType={'slide'}
                                            onRequestClose={() => this.closeModals()}>
                                            <View style={styles.modalContainers}>
                                                <View style={styles.innerContainers}>
                                                    <ListItem
                                                        title="ROOMS"
                                                        containerStyle={{ backgroundColor: '#E6EAEB', marginBottom: 10, borderRadius: 10 }}
                                                        titleStyle={[{ color: '#444' }, Styles.fontGilroyBold]}
                                                        rightIcon={
                                                            <Counter
                                                                start={0}
                                                                onChange={(room) => this.setState({ room: room })}
                                                                max={5}
                                                                touchableColor={'#53B6AB'}
                                                                touchableDisabledColor={'#aaa'}
                                                            />
                                                        }
                                                    />
                                                    <ListItem
                                                        title="ADULT"
                                                        containerStyle={{ backgroundColor: '#E6EAEB', borderTopLeftRadius: 10, borderTopRightRadius: 10 }}
                                                        titleStyle={[{ color: '#444' }, Styles.fontGilroyBold]}
                                                        rightIcon={
                                                            <Counter
                                                                start={0}
                                                                onChange={(adult) => this.setState({ adult: adult })}
                                                                max={5}
                                                                touchableColor={'#53B6AB'}
                                                                touchableDisabledColor={'#aaa'}
                                                            />
                                                        }
                                                    />
                                                    <ListItem
                                                        title="CHILDREN"
                                                        containerStyle={{ backgroundColor: '#E6EAEB', borderBottomLeftRadius: 10, borderBottomEndRadius: 10 }}
                                                        titleStyle={[{ color: '#444' }, Styles.fontGilroyBold]}
                                                        rightIcon={
                                                            <Counter
                                                                start={0}
                                                                onChange={(children) => this.setState({ children: children })}
                                                                max={5}
                                                                touchableColor={'#53B6AB'}
                                                                touchableDisabledColor={'#aaa'}
                                                            />
                                                        }
                                                    />
                                                    <View style={{
                                                        justifyContent: 'flex-end',
                                                    }}>
                                                        <LinearButton
                                                            title="Apply"
                                                            onPress={() => this.closeModals()}
                                                            style={[Styles.buttonText, Styles.fontGilroyBold]}
                                                        />
                                                    </View>

                                                </View>
                                            </View>
                                        </Modal>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', paddingHorizontal: 15 }}>
                                    <View style={{ flex: 1 }}>
                                        <LinearButton
                                            title="Search Now"
                                            style={[Styles.buttonText, Styles.fontGilroyBold]}
                                            onPress={() => this.SearchNow()}
                                        />
                                    </View>
                                </View>
                                <Text style={[{ flex: 1, alignSelf: 'center' }, Styles.fontGilroyLight]}>OR</Text>
                                <View style={{ paddingHorizontal: 15 }}>
                                    <LinearButton
                                        title="Filter Search"
                                        style={[Styles.buttonText, Styles.fontGilroyBold, { alignContent: 'center' }]}
                                        onPress={() => Actions.filters({ my_location: this.state.my_location })}
                                    />
                                </View>
                            </ImageBackground>
                        </Animatable.View>
                        <Animatable.View animation="slideInRight" style={{ padding: 10, flex: 1, }}>
                            <Text style={[Styles.fontGilroyBold, Styles.mediumTexts, { paddingTop: 20 }]}>LAST SEARCHES</Text>
                            <View style={{ flex: 2, padding: 5, flexDirection: 'row' }}>
                                <ScrollView snapToInterval={140} horizontal={true} contentContainerStyle={{ paddingVertical: 10, paddingHorizontal: 5 }} showsHorizontalScrollIndicator={false}>
                                    {this._renderHistory()}
                                </ScrollView>
                            </View>
                        </Animatable.View>
                        <Animatable.View animation="slideInRight" style={{ padding: 10, flex: 1, }}>
                            <Text style={[Styles.fontGilroyBold, Styles.mediumTexts, { paddingTop: 20 }]}>TOP DESTINATIONS</Text>
                            <View style={{ flex: 2, padding: 5, flexDirection: 'row' }}>
                                <ScrollView snapToInterval={140} horizontal={true} contentContainerStyle={{ paddingVertical: 10, paddingHorizontal: 5 }} showsHorizontalScrollIndicator={false}  >
                                    {this._renderTopDestination()}
                                </ScrollView>
                            </View>
                            {/* <Topdestination /> */}

                        </Animatable.View>
                    </ImageBackground>
                </KeyboardAwareScrollView>
                <Navigator />
            </SafeAreaView>
        );
    }
}

const mapStateToProps = state => {
    return {
        userID: state.userID,
        starRating: state.starRating,
        accommodationtype: state.accommodationtype,
        rate: state.rate,
        rating: state.rating,
        location: state.location,
        amenities: state.amenities
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
)(Search);

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
        height: '50%',
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
        borderBottomWidth: .3,
        paddingBottom: 25,
    },
    cardContainer: {
        backgroundColor: '#fff',
        borderRadius: 10,
        flex: 1,
        maxWidth: 140,
        marginRight: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,
        elevation: 4,
        overflow: 'hidden'
    },
    cardImage: {
        width: 140,
        height: 80,
    },
    cardText: {
        padding: 10,
        backgroundColor: '#fff'
    }
});
