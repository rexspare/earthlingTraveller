import * as React from 'react';
import { StyleSheet, View, ScrollView, RefreshControl, Dimensions, TouchableOpacity, ActivityIndicator, Platform } from 'react-native';
import { Text, Avatar, Divider } from 'react-native-elements';
import Spinner from 'react-native-spinkit';
import LinearGradient from 'react-native-linear-gradient'
import * as Animatable from 'react-native-animatable';
import Gallery from './components/Gallery';
import { Actions } from 'react-native-router-flux';
import Axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';
import FeatherIcons from 'react-native-vector-icons/Feather';
import qs from 'qs';
import { connect } from 'react-redux';
import MapView, { Marker } from 'react-native-maps';


import { TransparentHeader, RowInfo, ReviewItem, RatingStars, defaultColors } from '../../components/Common';
import Helpers from '../../Helpers';
import Styles from '../../assets/Styles';
import { showMessage } from 'react-native-flash-message';

const deviceHeight = Dimensions.get("window").height;

const FeatureSection = (props) => {
    return (
        <View style={{ marginTop: 20, marginBottom: 5 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Icon color={defaultColors(1)} name={props.icon} style={[styles.featureIcon, { fontSize: 23 }]} />
                <Text style={[styles.featureHeader, Styles.fontGilroyLight]}>{props.title}</Text>
            </View>
            <View style={{ marginTop: 10 }}>
                {props.content}
            </View>
        </View>
    )
}

const amenityColor = {
    common_spaces: '#008080',
    safety_privacy: '#09968E',
    other: '#0BBCB2',
}

class Preview extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            refreshing: true,
            showAmenities: false,
            additional_prices: {},
            coordinates: null,
            headerColor: 'transparent',
            headerTitle: '',
            title: '',
            handler: '',
            handler_id: '',
            category: '',
            type_of_place: '',
            description: '',
            min_stay: '',
            base_price: '',
            check_in_time: '',
            check_out_time: '',
            location: null,
            ratings: null,
            review: null,
            count_reviews: 0,
            ave_stars: 0,
            on_wishlist: 0,
            property_settings: null,
            guests_info: [],
            amenities: [],
            images: [],
        }
    }

    componentDidMount = () => {

        this.getData();
        this.pushHistory();
    }

    pushHistory = () => {
        const property_id = this.props.property_id;
        const user_id = this.props.userID;

        Axios.post(Helpers.traveller_api + 'pushhistory/' + property_id + '/' + user_id).then(response => {
            console.log('response', response.data);
        });
    }

    getData = async () => {
        const self = this;

        const params = {
            propertyID: this.props.property_id,
            user_id: this.props.userID
        }

        await Axios.post(
            Helpers.traveller_api + 'preview',
            qs.stringify(params)
        ).then(function (response) {
            self.setInitialStates(response.data);
        }).catch(({ error }) => {
            if (error.code != 1005) {
                console.log(error);
            }
        });
    }

    setInitialStates = (data) => {
        this.setState({
            on_wishlist: data.on_wishlist,
            images: data.images,
            title: data.title,
            handler_id: data.handler_id,
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
            loading: false,
            refreshing: false,
        })
    }

    wishlist = () => {
        // console.log('ibutang diri imong code dae sa mo wishlist og unwishlist');
        // return false;
        const property_id = this.props.property_id;
        const user_id = this.props.userID;
        Axios.post(Helpers.traveller_api + 'wishlisted/' + property_id + '/' + user_id)
            .then(response => {
                if (response.data.type == 'success') {
                    showMessage({
                        message: "Success!",
                        description: response.data.msg,
                        type: "default",
                        backgroundColor: "#57b5aa",
                        color: "#fff",
                    });

                    this.getData();
                } else {
                    this.unwishlist(property_id)
                }
            })
    }

    unwishlist = (property_id) => {
        const user_id = this.props.userID;

        Axios.post(Helpers.traveller_api + 'unWishlist/' + user_id + '/' + property_id).then(response => {
            if (response.data.type == "success") {
                this.getData();
            }
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
            <Text key={amenity.title} style={[{ borderColor: amenity.color, color: amenity.color }, styles.amenity, Styles.fontGilroyLight]}>{amenity.title}</Text>
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

    render() {
        const { loading, amenities, on_wishlist } = this.state;

        if (loading) {
            return (
                <Animatable.View ref={(ref) => this.loader = ref} style={{ flex: 1 }}>
                    <LinearGradient colors={['#0BBCB2', '#09968E', '#008080']} style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Spinner isVisible={true} size={60} type="ThreeBounce" color="white" />
                    </LinearGradient>
                </Animatable.View>
            )
        } else {
            return (
                <View style={{ flex: 1 }}>
                    <TransparentHeader
                        contentColor="white"
                        style={{ backgroundColor: this.state.headerColor, paddingBottom: 20, position: 'absolute', borderBottomWidth: 0, top: 0, zIndex: 999 }}
                        title={this.state.headerTitle}
                        right={(
                            <TouchableOpacity onPress={() => this.wishlist()}>
                                {
                                    on_wishlist ? (
                                        <Icon name='heart' size={30} style={{
                                            color: '#1bcbbb'
                                        }} />
                                    ) : (
                                            <FeatherIcons name='heart' size={30} style={{
                                                color: '#1bcbbb'
                                            }} />
                                        )
                                }
                            </TouchableOpacity>
                        )}
                    />
                    <ScrollView
                        vertical
                        onScroll={(scroll) => this.onScroll(scroll)}
                        refreshControl={
                            <RefreshControl
                                refreshing={this.state.refreshing}
                                onRefresh={() => this.onRefresh()}
                                colors={[defaultColors(1), '#57b5aa']}
                            />
                        }
                        scrollEventThrottle={50000}
                    >

                        <Gallery images={this.state.images} onUploadButtonPress={() => this.goToStep('photos')} />

                        <Animatable.View
                            animation="fadeInUp"
                            style={[Styles.container, { padding: 25 }]}
                        >

                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ width: '50%' }}>
                                    {
                                        this.state.category != ''
                                            ? <Text style={[Styles.fontGilroyBold, { color: '#888' }]}>{this.state.category}</Text>
                                            : <Text style={[Styles.fontGilroyBold, { color: '#00ddc5' }]} onPress={() => this.goToStep('propertyGuest')}>EDIT CATEGORY</Text>
                                    }
                                </View>
                            </View>


                            <Text style={[Styles.fontGilroyBold, { paddingVertical: 5, fontSize: 40, lineHeight: 40, marginTop: 5 }]}>{this.state.title}</Text>

                            <View style={{ flexDirection: 'row', paddingVertical: 10 }}>
                                <Avatar
                                    rounded
                                    size={'large'}
                                    source={{
                                        uri: Helpers.avatars_url + this.state.avatar,
                                    }}
                                    PlaceholderContent={<ActivityIndicator />}
                                />
                                <View style={{ paddingHorizontal: 10, paddingVertical: 10, flex: 1 }}>
                                    <Text style={[Styles.fontGilroyLight, Styles.formGroup, { marginBottom: 5 }]}>
                                        Address:
                                    </Text>
                                    <View style={{ marginBottom: 5 }}>
                                        {
                                            this.state.location != null ? (
                                                <Text style={[Styles.fontGilroyLight, { color: '#555' }]}>{this.state.location}</Text>
                                            ) : <Text style={[Styles.fontGilroyLight, { color: '#F4730A', textDecorationLine: 'underline' }]} onPress={() => this.goToStep('location')}>Setup Location</Text>
                                        }
                                    </View>
                                    <Text style={[Styles.fontGilroyLight, Styles.formGroup, { marginBottom: 5 }]}>
                                        Hosted by:
                                        <Text
                                            onPress={() => Actions.viewprofile({ profileID: this.state.handler_id })}
                                            style={[Styles.fontGilroyBold, { color: defaultColors(1), marginLeft: 10 }]}
                                        >
                                            {' ' + this.state.handler}
                                        </Text>
                                    </Text>
                                </View>
                            </View>

                            {
                                this.state.base_price && this.state.review ? (
                                    <View style={{ paddingVertical: 25, justifyContent: 'space-between', flexDirection: 'row' }}>
                                        <View>
                                            <View style={[Styles.formGroup, { justifyContent: 'center' }]}>
                                                <Text style={[Styles.fontGilroyBold, { color: defaultColors(1), fontSize: 20 }]}>$ {this.state.base_price}</Text>
                                                <Text style={[Styles.fontGilroyLight, { marginLeft: 6, marginTop: 2, color: '#888' }]}> per night</Text>
                                            </View>
                                            <View style={[Styles.formGroup]}>
                                                <RatingStars stars={this.state.review.stars} />
                                                <Text style={[Styles.fontGilroyLight, { fontSize: 10, alignSelf: 'flex-end', color: '#444' }]}> ({this.state.count_reviews ? this.state.count_reviews : '123'})</Text>
                                            </View>
                                        </View>
                                        <View>
                                            <TouchableOpacity
                                                onPress={() => Actions.checkavailability({ property_id: this.props.property_id })}
                                            >
                                                <LinearGradient
                                                    style={styles.rightButton}
                                                    start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                                                    colors={['#00B0AD', '#0CBDB3', '#1BCCBC']}
                                                // colors={['gainsboro', 'gainsboro', 'gainsboro']}
                                                >
                                                    <Text style={[Styles.fontGilroyBold, { color: 'white' }]}>Check Availability</Text>
                                                </LinearGradient>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                ) : null
                            }

                            <Divider style={{ backgroundColor: '#EBEBEB' }} />

                            {
                                this.state.guests_info != null ? (
                                    <View>
                                        <FeatureSection
                                            icon="home"
                                            title={this.state.type_of_place}
                                            content={(
                                                <View style={{ flexDirection: 'row' }}>
                                                    {this._renderGuestsInfo()}
                                                </View>
                                            )}
                                        />
                                        <FeatureSection
                                            icon="bath"
                                            title="Bathroom"
                                            content={(
                                                <View style={{ flexDirection: 'row' }}>
                                                    <Text style={Styles.fontGilroyBold}>4</Text>
                                                    <Text style={Styles.fontGilroyLight}> Private bathroom(s) for guests</Text>
                                                </View>
                                            )}
                                        />
                                        <Divider style={{ backgroundColor: '#EBEBEB', marginVertical: 20 }} />
                                    </View>
                                ) : null
                            }

                            {/* DESCRIPTION SECTION */}
                            <Text style={[styles.sectionHeader, Styles.fontGilroyBold]}>Description</Text>

                            <Text style={Styles.fontGilroyLight}>
                                {this.state.description}
                            </Text>

                            <Divider style={{ backgroundColor: '#EBEBEB', marginVertical: 20 }} />

                            {
                                this.state.min_stay ? (
                                    <View>
                                        <Text style={[Styles.fontGilroyBold, { marginVertical: 15, color: '#666' }]}>{this.state.min_stay} min stay</Text>
                                        <Divider style={{ backgroundColor: '#EBEBEB', marginVertical: 20 }} />
                                    </View>
                                ) : null
                            }


                            {/* AMENITIES SECTION */}
                            <Text style={[styles.sectionHeader, Styles.fontGilroyBold]}>Amenities</Text>

                            <View style={styles.amenities}>
                                {this._renderAmenities()}
                            </View>

                            <TouchableOpacity onPress={() => {
                                if (amenities.common_spaces || amenities.other || amenities.safety_privacy) {
                                    Actions.showAmenities({ allAmenities: amenities });
                                } else {
                                    this.goToStep('amenities');
                                }
                            }}>
                                <Text style={[Styles.fontGilroyLight, { color: defaultColors(1), marginTop: 10 }]}>{amenities.common_spaces || amenities.other || amenities.safety_privacy ? 'Show all amenities' : 'Setup Amenities'}</Text>
                            </TouchableOpacity>

                            <Divider style={{ backgroundColor: '#EBEBEB', marginVertical: 20 }} />

                            {/* LOCATION SECTION */}
                            <Text style={[styles.sectionHeader, Styles.fontGilroyBold]}>Location</Text>
                            {
                                this.state.coordinates != null ? (
                                    <View>
                                        <Text style={[Styles.fontGilroyLight, { marginBottom: 25 }]}>{this.state.location}</Text>
                                        <TouchableOpacity
                                            style={{
                                                position: 'relative',
                                                height: 300,
                                                marginVertical: 15
                                            }}
                                            onPress={() => Actions.showLocation({ coordinates: this.state.coordinates, location: this.state.location })}
                                        >
                                            <MapView
                                                style={{
                                                    position: 'absolute',
                                                    top: 0,
                                                    left: 0,
                                                    right: 0,
                                                    bottom: 0,
                                                }}
                                                region={this.state.coordinates}
                                                liteMode={true}
                                                loadingEnabled={true}
                                                loadingIndicatorColor={defaultColors(1)}
                                            >
                                                <Marker coordinate={this.state.coordinates} />
                                            </MapView>
                                        </TouchableOpacity>
                                    </View>
                                ) : <Text style={[Styles.fontGilroyLight, { color: '#F4730A', marginTop: 10 }]} onPress={() => this.goToStep('location')}>Setup Location</Text>
                            }

                            {
                                this.state.check_out_time != null ? (
                                    <View>
                                        <RowInfo leftContent="Check-in time" rightContent={this.state.check_in_time} />
                                        <RowInfo leftContent="Checkout time" rightContent={this.state.check_out_time} noBorderBottom={true} />
                                    </View>
                                ) : null
                            }
                            <Divider style={{ backgroundColor: '#EBEBEB', marginVertical: 40 }} />


                            {/* REVIEWS SECTION */}

                            {
                                this.state.review != null ? (
                                    <View>
                                        <Text style={[styles.sectionHeader, Styles.fontGilroyBold]}>Reviews </Text>

                                        <ReviewItem
                                            image={Helpers.avatars_url + this.state.review.avatar}
                                            name={this.state.review.firstname}
                                            review={this.state.review.review}
                                            renderStars={<RatingStars stars={this.state.review.stars} />}
                                            enableReadMore={true}
                                        />

                                        <TouchableOpacity
                                            style={{ marginTop: 25 }}
                                            onPress={() => Actions.showReviews({ rating: this.state.rating, property_id: this.props.property_id })}
                                        >
                                            <Text style={[Styles.fontGilroyBold, { color: defaultColors(1), marginTop: 15, fontSize: 15 }]}>Read all {this.state.count_reviews} reviews <Icon name="angle-down" /></Text>
                                        </TouchableOpacity>

                                        <Divider style={{ backgroundColor: '#EBEBEB', marginVertical: 30 }} />
                                    </View>
                                ) : null
                            }

                            {/* RULES SECTION */}
                            <RowInfo
                                leftContent="Contact Host"
                                rightStyle={{ color: defaultColors(1), fontFamily: 'Gilroy-ExtraBold' }}
                                rightContent="Message"
                                onPress={() => {
                                    Actions.viewprofile({ profileID: this.state.handler_id })
                                }}
                            />
                            <RowInfo
                                leftContent="Host Rules"
                                rightStyle={{ color: defaultColors(1), fontFamily: 'Gilroy-ExtraBold', }}
                                rightContent={this.state.property_settings ? "Read" : "Setup"}
                                onPress={() => {
                                    if (this.state.property_settings) {
                                        Actions.showRules({ rules: this.state.property_settings })
                                    } else {
                                        this.goToStep('propertySetting');
                                    }
                                }}
                            />

                            <RowInfo
                                leftContent="Additional Prices"
                                rightStyle={{ color: defaultColors(1), fontFamily: 'Gilroy-ExtraBold', }}
                                rightContent={this.state.additional_prices.cleaning_fee ? "Show" : "Setup"}
                                onPress={() => {
                                    if (this.state.additional_prices.cleaning_fee) {
                                        Actions.showPrices({ prices: this.state.additional_prices })
                                    } else {
                                        this.goToStep('pricings');
                                    }
                                }}
                            />
                            {/* <RowInfo
                                leftContent="Report this Listing"
                            /> */}
                        </Animatable.View>
                    </ScrollView>

                    {/* BOTTOM SECTION */}
                    {
                        this.state.base_price && this.state.review ? (
                            <TouchableOpacity
                                onPress={() => Actions.checkavailability({ property_id: this.props.property_id })}
                            >
                                <View style={this.state.FooterContainer}>
                                    <Text style={[Styles.fontGilroyBold, { color: this.state.FooterTextColor }]}>{this.state.FooterTitle}</Text>
                                </View>
                            </TouchableOpacity>
                        ) : null
                    }
                </View >
            )
        }
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
    }
});
