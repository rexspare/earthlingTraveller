import React, { Component } from 'react';
import { View, StyleSheet, ImageBackground, ScrollView, Button, Modal, Image, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Input, Text, ListItem } from 'react-native-elements';
import Style from '../../assets/Styles';
import { CustomNav1 } from '../../components/CustomNav1';
import Slider from 'react-native-simple-slider';
import { Rating, AirbnbRating } from 'react-native-ratings';
import Icon from 'react-native-vector-icons/Octicons';
import Icons from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import Zocial from 'react-native-vector-icons/Zocial';
import Navigator from '../../components/Navigator';
import Axios from 'axios';
import Helpers from '../../Helpers';
import qs from 'qs';

import { LinearButton, LinearButtons, TransparentHeaderLogo, defaultColors } from '../../components/Common';
import { connect } from 'react-redux';
import Login from '../Landing/modal/Login';
import Styles from '../../assets/Styles';
class Filters extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // rate: 150,
            loc: 150,
            location: 10,
            ratings: 0,
            clicked: 0,
            valueAmenities: '',
            chosenAmenities: [],
            selecteAmenity: [],
            selectedAmenities: [],
            amenity: '',
            amenities: [
                { id: 1, title: 'Essentials' },
                { id: 2, title: 'Wi-Fi' },
                { id: 3, title: 'Kitchen' },
                { id: 4, title: 'Free parking on premises' },
                { id: 5, title: 'TV' },
                { id: 6, title: 'Hot Water' },
                { id: 7, title: 'Heating' },
                { id: 8, title: 'Air conditioning' },
                { id: 9, title: 'Washer' },
                { id: 10, title: 'Dryer' },
                { id: 11, title: 'Iron' },
                { id: 12, title: 'Shampoo' },
                { id: 13, title: 'Hair Dryer' },
                { id: 14, title: 'Hot tub' },
                { id: 15, title: 'Pool' },
                { id: 16, title: 'Breakfast' },
                { id: 17, title: 'Gym' },
                { id: 18, title: 'Laptop Friendly Workspace' },
                { id: 19, title: 'Elevator' },
                { id: 20, title: 'Indoor Fireplace' },
                { id: 21, title: 'Hangers' },
            ],
        }
    }


    _submitAmenities = (value) => {
        let curr_amenities = this.state.chosenAmenities;
        console.log(curr_amenities);

        if (curr_amenities.length) {


            const keyExist = curr_amenities.find(amenity => amenity.id == value.id);
            console.log('keey', curr_amenities);

            if (!keyExist) {
                curr_amenities.push(value);
            }
        } else {
            curr_amenities.push(value);
        }

        this.setState({
            chosenAmenities: curr_amenities
        })



    }

    _renderChosenAmenities = () => {
        const amenities = this.state.chosenAmenities;

        return amenities.map((val, index) => {
            if ((amenities.length % 2) === 0) {
                return (
                    <View style={{ flexDirection: 'row', flex: 1 }} key={index}>
                        <Text key={index} style={[Style.smallText, Style.fontGilroyBold]}>
                            {val.title}
                        </Text>
                    </View>
                )
            } else {
                return (
                    <View style={{ flexDirection: 'row', flex: 1 }} key={index}>
                        <Text key={index} style={[Style.smallText, Style.fontGilroyBold]}>
                            {val.title}
                        </Text>
                    </View>
                )
            }
        })

    }
    _renderAmenities = () => {
        const amenities = this.state.amenities;
        const checked = this.state.pressedAmeniries;
        console.log(amenities.length % 2);

        return amenities.map((val, index) => {
            return (
                <TouchableOpacity
                    key={index}
                    style={this.state.clicked ? Style.pressedAmenities : Style.unpressedAmenities}
                    onPress={() => this._submitAmenities(val)}
                >
                    <Text style={[Style.smallText, Style.fontGilroyLight]}>{val.title}</Text>
                </TouchableOpacity>
            )
        })
    }

    submittedFilters = () => {
        // const location = this.state.loc;
        // const rate = this.state.rate;
        const rating = this.state.rating;
        const amenities = this.state.chosenAmenities;
        const accommodationtype = this.props.accommodationtype;
        const chosen_data = { rating, amenities, accommodationtype, my_location: this.props.my_location }

        Axios.post(Helpers.api_url + 'searchByfilter/', qs.stringify(chosen_data))
            .then(response => {
                if (response.data.length) {
                    Actions.filterbysearch({ properties: response.data });
                } else {
                    alert("No available property !");
                }
            })
    }

    _renderFilterProp = () => {

        const amenities = this.props.amenities;
        const accommodationtype = this.props.accommodationtype;
        const price = this.props.rate;
        const location = this.props.location;
        const rating = this.props.rating;
        const data = { amenities, accommodationtype, price, location, rating }

        Axios.post(Helpers.traveller_api + 'searchByfilter/', qs.stringify(data))
            .then(response => {
                // this._renderFilterProp(response.data);
                Actions.filterbysearch(response.data);
            })
    }

    accommodations = () => {
        const acc_data = this.state;
        const acc = { acc_data };
        Actions.accommodations({
            ...acc
        });
    }

    render() {
        return (
            <>
                <ScrollView>
                    <View style={[Style.container]}>
                        {/* <View style={{ borderBottomWidth: 1, borderBottomColor: '#d1dadb', paddingVertical: 30, }}>
                            <Text style={[Style.fontGilroyLight, Style.smallText, { paddingVertical: 10 }]}>PRICE PER NIGHT</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                                <Slider
                                    minimumValue={150}
                                    maximumValue={1000}
                                    step={100}
                                    minimumTrackTintColor={'#ffa500'}
                                    thumbTintColor={'gray'}
                                    value={this.state.rate}
                                    onValueChange={rate => this.setState({ rate })}
                                    disabledHoverEffect={false}
                                    onSlidingComplete={this._renderPrice()}
                                />
                                <Text style={[Styles.fontGilroyBold, { marginLeft: 35, fontSize: 25, color: defaultColors(1) }]}>${this.state.rate}</Text>
                            </View>
                        </View> */}
                        <View style={{ borderBottomWidth: 1, borderBottomColor: '#d1dadb', paddingVertical: 30 }}><Text style={[Style.fontGilroyLight, Style.smallText, { paddingVertical: 10 }]}>NUMBER OF STARS</Text>
                            <Rating
                                showRating
                                onFinishRating={(rating) => this.setState({ rating: rating })}
                                style={{ paddingVertical: 10 }}
                                showRating={false}
                            />
                        </View>
                        {/* <View style={{ borderBottomWidth: 1, borderBottomColor: '#d1dadb', paddingVertical: 30 }}><Text style={[Style.fontGilroyLight, Style.smallText, { paddingVertical: 10 }]}>DISTANCE TO YOUR LOCATION</Text>
                            <Slider
                                minimumValue={50}
                                maximumValue={1000}
                                step={50}
                                minimumTrackTintColor={'#ffa500'}
                                thumbTintColor={'gray'}
                                value={this.state.loc}
                                onValueChange={loc => this.setState({ loc })}
                                disabledHoverEffect={false}
                                onSlidingComplete={this._renderLocation()}
                            />
                        </View> */}
                        <View style={{ borderBottomWidth: 1, borderBottomColor: '#d1dadb', paddingVertical: 30, }}><Text style={[Style.fontGilroyLight, Style.smallText, { paddingVertical: 10 }]}>FEATURES/AMENITIES</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 5 }}>
                                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}  >
                                    {this._renderAmenities()}
                                </ScrollView>

                            </View>

                            {
                                this.state.selectedAmenities === '' ? '' : this._renderChosenAmenities()
                            }
                        </View>
                        <View style={{ paddingVertical: 30 }}>
                            <ListItem titleStyle={[Style.fontGilroyLight, Style.smallText, { paddingVertical: 10 }]}
                                title="TYPE OF ACCOMODATION"
                                rightIcon={<Icon name="chevron-right" />}
                                onPress={Actions.accommodations}
                            />
                        </View>

                    </View>

                </ScrollView>
                <View style={{ padding: 10 }}>
                    <LinearButton
                        title="Submit"
                        onPress={() => this.submittedFilters()}
                        style={[Style.buttonText, Style.fontGilroyBold]}
                    />
                </View>
            </>
        )
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
        amenities: state.amenities,
        propertyID: state.propertyID,

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
)(Filters);