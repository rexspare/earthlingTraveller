import * as React from 'react';
import { StyleSheet, View, Modal, ScrollView, RefreshControl, Dimensions, TouchableOpacity, ActivityIndicator, Platform } from 'react-native';
import { Text, Avatar, Divider, Input, ListItem } from 'react-native-elements';
import Styles from '../../assets/Styles';
import Spinner from 'react-native-spinkit';
import LinearGradient from 'react-native-linear-gradient'
import * as Animatable from 'react-native-animatable';
import GalleryTraveller from './components/GalleryTraveller';
import { TransparentHeader, FullScreenLoader, LinearButton } from '../../components/Common';
import { Actions } from 'react-native-router-flux';
import Navigator from '../../components/Navigator';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Rating, AirbnbRating } from 'react-native-ratings';
import { connect } from 'react-redux';
import Feedback from './components/Feedback';
import axios from "axios";
import qs from 'qs';
import Helpers from '../../Helpers';
const deviceHeight = Dimensions.get("window").height;
import moment from 'moment'
import { CalendarList, Calendar } from 'react-native-calendars';
const FeatureSection = (props) => {
    return (
        <View style={{ marginTop: 20, marginBottom: 5 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Icon color="orange" name={props.icon} style={[styles.featureIcon, { fontSize: 23 }]} />
                <Text style={[styles.featureHeader, Styles.fontGilroyLight]}>{props.title}</Text>
            </View>
            <View style={{ marginTop: 10 }}>
                {props.content}
            </View>
        </View>
    )
}

const amenityColor = {
    common_spaces: '#F89D52',
    safety_privacy: '#F68121',
    other: '#F4730A',
}

class Preview extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

            markedDates: {},
            endDate: '',
            isStartDatePicked: false,
            isEndDatePicked: false,
            startDate: '',
            saving: false,
            modalVisible: false, loading: false,
            refreshing: false,
            showAmenities: false,
            additional_prices: {},
            coordinates: null,
            headerColor: 'transparent',
            headerTitle: '',
            title: '',
            handler: '',
            category: '',
            type_of_place: '',
            description: '',
            min_stay: '',
            base_price: '',
            check_in_time: '',
            check_out_time: '',
            location: null,
            ratings: 0,
            review: null,
            count_reviews: 0,
            ave_stars: 0,
            property_settings: null,
            guests_info: [],
            amenities: [],
            images: [],
            rates: 0,
            properties: [],
            over_all_rating: 0,
            all_reviews: [], loading: true,
            property_ids: []
        }

    }
    ratingCompleted = (rating) => {


        this.props.updateState({ target: 'starRating', value: rating });

    }
    componentDidMount = () => {
        this.props.updateState({ target: 'property_ids', value: this.state.property_ids });

        this.getProperties();
        this._renderStars();
        this._renderFeebacks();
        this.pushHistory();

    }
    pushHistory = () => {
        const property_id = this.props.property_id;
        const user_id = this.props.userID;
        axios.post(Helpers.traveller_api + 'pushhistory/' + property_id + '/' + user_id).then(response => {
            console.log(response);

        });

    }
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
            //this.setState({startDate:day.dateString});


        } else {


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

    openModal = () => {
        this.setState({ modalVisible: true });
    }
    closeModal = (dates) => {
        const markedDates = this.state.markedDates;
        this.setState({ modalVisible: false, modalVisibles: false, modalSort: false });

    }
    getData = async () => {

    }
    getProperties = () => {

        const property_id = this.props.property_id;

        axios.post(Helpers.traveller_api + 'SelectFeedbackbyId/' + property_id)
            .then(response => {
                this.setState({ properties: response.data });
            })

    }

    _renderStars = () => {
        const property_id = this.props.property_id;
        axios.post(Helpers.api_url + 'totalStars/' + property_id)
            .then(response => {
                this.setState({ over_all_rating: response.data });
            })
    }

    _allFeedbacks = () => {
        const datas = Object.entries(this.state.all_reviews);

        return datas.map((val, index) => {
            return (<View style={{ flexDirection: 'row', paddingVertical: 10 }} key={val} >

                <View style={{ flexDirection: 'column', paddingHorizontal: 14 }}>
                    <Avatar rounded
                        source={{ uri: Helpers.avatars_url + val[1].avatar }}
                        size='medium' titleStyle={{ color: 'black' }} />
                </View>
                <View style={{ flexDirection: 'column', flex: 1, borderColor: '#F5F5F5', backgroundColor: '#FFFFFF', borderWidth: 1, borderRadius: 10, height: 200 }} key={val[index]}>
                    <Text style={[Styles.fontGilroyBold, Styles.mediumText, { paddingVertical: 5, paddingHorizontal: 10 }]}>
                        {val[1].firstname} {val[1].lastname}
                    </Text>
                    <Text style={[Styles.fontGilroyLight, Styles.smallText, { paddingHorizontal: 10 }]}>
                        <Icon name="table" color="orange" style={{ paddingVertical: 5 }} /> {val[1].date_added}
                    </Text>
                    <Text style={[Styles.fontGilroyLight, Styles.smallText, { paddingVertical: 15, paddingHorizontal: 10 }]}>
                        {val[1].review}
                    </Text>


                </View>

            </View>
            )
        })
    }
    _renderFeebacks = () => {

        const property_id = this.props.property_id;
        axios.post(Helpers.traveller_api + 'allReviews/' + property_id)
            .then(response => {
                this.setState({ all_reviews: response.data });

            })

    }
    _renderAllFeed = () => {

    }
    setInitialStates = (data) => {
        this.setState({
            images: data.images,
            title: data.title,
            handler: data.handler,
            location: data.location,
            coordinates: JSON.parse(data.coordinates),
            category: data.category,
            type_of_place: data.type_of_place,
            description: data.description,
            min_stay: data.min_stay,
            guests_info: data.guests_info,
            property_settings: data.property_settings,
            amenities: data.amenities,
            additional_prices: data.additional_prices,
            base_price: data.base_price,
            check_in_time: data.check_in_time,
            check_out_time: data.check_out_time,
            review: data.review,
            count_reviews: data.count_reviews,
            rating: data.rating,
            ratings: data.ratings,
            avatar: data.avatar,
            refreshing: false
        })
    }

    onRefresh = () => {
        this.getData();
    }

    onScroll = (scrollInfo) => {
        const { contentOffset } = scrollInfo.nativeEvent;

        const showHeaderOn = (deviceHeight / 1.8) - 60;
        const showFooterOn = (deviceHeight / 1.8) + 280;

        if (contentOffset.y > showHeaderOn) {
            this.setState({
                headerColor: 'rgba(52, 52, 52, 0.3)',
                headerTitle: 'DETAILS'
            })
        } else {
            this.setState({
                headerColor: 'transparent',
                headerTitle: ''
            })
        }

        if (contentOffset.y > showFooterOn) {
            this.setState({
                FooterTextColor: '#fff',
                FooterTitle: 'Check Availability',
                FooterContainer: { justifyContent: 'flex-end', borderTopWidth: .5, borderColor: '#EBEBEB', paddingHorizontal: 20, padding: 25, paddingBottom: Platform.OS === 'ios' ? 40 : 20, justifyContent: 'center', flexDirection: 'row', backgroundColor: '#1bcbbb', color: '#fff' }
            })
        } else {
            this.setState({
                FooterTextColor: 'transparent',
                FooterTitle: '',
                FooterContainer: ''
            })
        }
    }

    goToStep = (step) => {
        this.props.updateState({ target: 'propertyID', value: this.props.propertyID })

        if (this.props.fromSetup) {
            Actions.reset('propertySetup', { redirectTo: step });
        } else {
            Actions.propertySetup({ redirectTo: step, fromPreview: true });
        }
    }

    _renderAmenities = () => {
        const { amenities } = this.state;

        if (amenities == null) {
            return <View></View>
        }

        let renderAmenities = [];

        for (let [key, values] of Object.entries(amenities)) {
            values.map(amenityInfo => {
                renderAmenities.push({ color: amenityColor[key], title: amenityInfo })
            })
        }

        renderAmenities.length = 3;

        return renderAmenities.map(amenity => (
            <Text key={amenity.title} style={[{ borderColor: amenity.color, color: amenity.color }, styles.amenity]}>{amenity.title}</Text>
        ))
    }

    _renderGuestsInfo = () => {
        const { guests_info } = this.state;

        if (guests_info != null) {
            return guests_info.map((info, i) => (
                <View key={i} style={{ flexDirection: 'row', marginRight: 15 }}>
                    <Text style={[Styles.fontGilroyBold, { marginRight: 5, fontSize: 12 }]}>{info.value}</Text>
                    <Text style={[Styles.fontGilroyLight, { fontSize: 12 }]}>{info.info_name}</Text>
                </View>
            ));
        } else {
            return <View />
        }
    }
    _renderTopDestinationProp = () => {
        const data = this.props.property;
        // console.log(data);

    }
    _renderTotalRating = () => {
        const rating = this.props.property.stars;

    }
    render() {
        const { loading, amenities } = this.state;
        console.log('prev', this.props);

        if (loading) {
            return (
                <View style={{ flex: 1, backgroundColor: '#FDFDFD' }}>
                    <TransparentHeader
                        contentColor="white"
                        style={{ backgroundColor: this.state.headerColor, paddingBottom: 20, position: 'absolute', borderBottomWidth: 0, top: 0, zIndex: 999 }}
                        title={this.state.headerTitle}
                    />
                    <ScrollView
                        vertical
                        onScroll={(scroll) => this.onScroll(scroll)}
                        refreshControl={
                            <RefreshControl
                                refreshing={this.state.refreshing}
                                onRefresh={() => this.onRefresh()}
                                colors={['orange', '#57b5aa']}
                            />
                        }
                        scrollEventThrottle={50000}
                    >
                        <GalleryTraveller property_id={this.props.property_id} images={this.state.images} onUploadButtonPress={() => this.goToStep('photos')} />

                        <Animatable.View style={[Styles.container, { padding: 25 }]} >
                            <View>
                                <View style={{ flexDirection: 'row', paddingVertical: 10 }}>
                                    <View style={{ flexDirection: 'column', flex: 1 }}>
                                        <Text style={[Styles.fontGilroyBold, { fontSize: 40 }]}>{this.state.properties.property_title}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'column', flex: 1, alignItems: 'center' }}>
                                        <Text style={[Styles.fontGilroyBold, { color: '#57b5aa', fontSize: 20 }]}>$ {this.state.properties.base_price}</Text>
                                        <Text style={[Styles.fontGilroyLight, { marginLeft: 6, marginTop: 2, color: '#888' }]}> per night</Text>
                                    </View>

                                </View>

                                <View >

                                    <ListItem
                                        title={this.state.over_all_rating + " Rating"}
                                        titleStyle={[Styles.fontGilroyLight, Styles.smallText, { paddingVertical: 15 }]}
                                        rightIcon={
                                            <Rating
                                                onFinishRating={this.state.over_all_rating}
                                                style={{ paddingVertical: 10 }}
                                                readonly
                                                imageSize={15}

                                            />
                                        }
                                    />


                                </View>


                                <LinearButton
                                    title="Check Availability"
                                    onPress={() => this.openModal()}
                                    style={[Styles.buttonText, Styles.fontGilroyBold]}
                                />
                                <Modal
                                    visible={this.state.modalVisible}
                                    animationType={'slide'}
                                    onRequestClose={() => this.closeModal(markedDates)}>
                                    <View style={styles.modalContainer}>
                                        <View style={styles.innerContainer}>
                                            <View style={styles.header}>
                                                <Text style={[Styles.fontGilroyBold, { fontSize: 20, alignSelf: 'center' },]}>Select Dates</Text>
                                                <Text style={[Styles.fontGilroyLight, { fontSize: 13, color: '#555', alignSelf: 'center' }]}>Click a date to book</Text>
                                            </View>
                                            <CalendarList

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
                                        </View>
                                    </View>
                                </Modal>

                            </View>

                            <Divider style={{ backgroundColor: '#EBEBEB', marginVertical: 40 }} />
                            {/* DESCRIPTION SECTION */}
                            <Text style={[styles.sectionHeader, Styles.fontGilroyBold]}>Description</Text>

                            <Text style={Styles.fontGilroyLight}>
                                {this.state.properties.property_description}
                            </Text>
                            <Divider style={{ backgroundColor: '#EBEBEB', marginVertical: 20 }} />

                            {/* Rating SECTION */}
                            <Text style={[styles.sectionHeader, Styles.fontGilroyBold]}>Rating</Text>
                            <Rating
                                startingValue={0}
                                onFinishRating={this.ratingCompleted}
                                style={{ paddingVertical: 10 }}
                                showRating={false}
                            />


                            <Divider style={{ backgroundColor: '#EBEBEB', marginVertical: 40 }} />


                            {this._allFeedbacks()}
                            <Feedback />

                        </Animatable.View>
                    </ScrollView>
                    <Navigator />
                    {/* BOTTOM SECTION */}

                    <View style={this.state.FooterContainer}>
                        <TouchableOpacity
                            disabled
                            onPress={() => this.onSubmit()}
                        >
                            <Text style={[Styles.fontGilroyBold, { color: this.state.FooterTextColor }]}>{this.state.FooterTitle}</Text>
                        </TouchableOpacity>
                    </View>

                </View >
            )
        }
    }
}

const mapStateToProps = state => {
    return {
        userID: state.userID,
        propertyID: state.propertyID,
        starRating: state.starRating,
        property_ids: state.property_ids

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
)(Preview);

const styles = StyleSheet.create({
    featureIcon: {
        fontSize: 18,
    },
    featureHeader: {
        fontSize: 20,
        marginLeft: 10
    },
    sectionHeader: {
        marginTop: 10,
        paddingVertical: 5,
        color: '#555',
        fontSize: 18
    },
    amenities: {
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        flexDirection: 'row',
    },
    amenity: {
        borderWidth: 1,
        paddingHorizontal: 15,
        paddingVertical: 6,
        borderRadius: 12,
        fontSize: 10,
        marginVertical: 3,
        marginRight: 5,
    },
    overAllRating: {
        backgroundColor: 'gainsboro',
        paddingHorizontal: 10,
        paddingVertical: 2,
        borderRadius: 100,
        marginLeft: 10,
        color: '#fff',
    },
    rightButton: {
        backgroundColor: 'transparent',
        justifyContent: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 4,
        backgroundColor: '#0e9989',
        width: 180,
        alignItems: 'center'
    }, modalContainer: {
        justifyContent: 'center',
        paddingBottom: 20,

    },
    innerContainer: {
        alignContent: 'center',
        height: '90%'
    },
});
