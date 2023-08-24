import React, { Component } from 'react';
import { View, Text, ScrollView, RefreshControl, StyleSheet, TouchableOpacity, BackHandler } from 'react-native';
import { Image } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import Axios from 'axios';
import { connect } from 'react-redux';
import { showMessage } from 'react-native-flash-message';
import * as Animatable from 'react-native-animatable';
import Styles from '../../../assets/Styles';
import Navigator from '../../../components/Navigator';
import Helpers, { parseDate, numberWithCommas, getDateDifference } from '../../../Helpers';
import { defaultColors } from '../../../components/Common';
import { Actions } from 'react-native-router-flux';

const StatusBadge = (props) => {
    let status = {
        name: '',
        color: '',
        bgColor: '',
    }

    switch (parseInt(props.status)) {
        case 0:
            status.name = 'Pending';
            status.color = '#FFF';
            status.bgColor = '#555';
            break;
        case 1:
            status.name = 'For Payment';
            status.color = '#FFF';
            status.bgColor = 'orange';
            break;
        case 2:
            status.name = 'In Progress';
            status.color = '#FFF';
            status.bgColor = '#55B6AB';
            break;
        case 3:
            status.name = 'Completed';
            status.color = '#FFF';
            status.bgColor = '#285b55';
            break;
        case 4:
            status.name = 'Declined';
            status.color = '#FFF';
            status.bgColor = 'indianred';
            break;
    }

    return (
        <View style={{ position: 'absolute', right: 15, top: 10, backgroundColor: status.bgColor, paddingVertical: 5, paddingHorizontal: 10, borderRadius: 5 }}>
            <Text style={[{ color: status.color }, Styles.fontGilroyLight]}>{status.name}</Text>
        </View>
    )
}

class Bookings extends Component {
    state = {
        bookings: [],
        loading: true
    }

    componentDidMount = () => {
        this.getData();

        this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    }

    handleBackPress = () => {
        Actions.search({ type: 'replace' })
    }

    componentWillUnmount() {
        this.backHandler.remove()
    }


    getData = () => {
        const self = this;

        Axios.get(Helpers.api_url + 'get_bookings/' + this.props.userID + '/1').then(response => {
            self.setState({
                bookings: response.data,
                loading: false,
            })
        }).catch(error => {
            showMessage({
                message: "Server Error",
                description: "Something Went Wrong!",
                type: "default",
                backgroundColor: "white",
                color: "#555555",
            });
            self.setState({
                loading: false
            })
        });

    }

    _onRefresh = () => {
        this.setState({
            loading: true
        })

        this.getData();
    }

    _renderBookings = () => {
        const { bookings } = this.state;

        return bookings.length ? (
            bookings.map((booking, i) => {
                let imageUrl = Helpers.assets_url + '/app/no-image.png';

                if (booking.property_img) {
                    imageUrl = Helpers.image_url + booking.property_img;
                }

                return (
                    <TouchableOpacity
                        onPress={() => Actions.bookinfo({ booking_id: booking.id, refreshBookings: this.getData })}
                        key={i}
                    >
                        <Animatable.View animation="fadeInUp" delay={i * 500} style={{ flex: 3, marginBottom: 10, borderWidth: 1, borderRadius: 10, borderColor: '#eee', marginBottom: 25 }}>
                            <View style={{
                                borderTopLeftRadius: 5,
                                borderTopRightRadius: 5,
                                overflow: 'hidden',
                            }}>
                                <Image
                                    source={{ uri: imageUrl }}
                                    style={{
                                        width: '100%',
                                        height: 150,
                                    }}
                                    resizeMode="cover"
                                />
                                <StatusBadge status={booking.status} />
                            </View>
                            <View style={[styles.container, { paddingLeft: 20, paddingRight: 20 }]}>
                                <View style={{ flex: 1.5 }}>
                                    <Text style={[Styles.fontGilroyBold, { marginBottom: 3, fontSize: 16, textAlign: 'left' }]}>{booking.property}</Text>
                                    <Text style={[Styles.fontGilroyLight, { marginBottom: 3, fontSize: 12, textAlign: 'left' }]}>{parseDate(booking.start_date)} - {parseDate(booking.due_date)}</Text>
                                </View>

                                <View style={{ flex: 1 }}>
                                    <Text style={[Styles.fontGilroyLight, { marginBottom: 3, color: defaultColors(1), fontSize: 16, textAlign: 'right' }]}>${numberWithCommas(booking.total)}</Text>
                                    <Text style={[Styles.fontGilroyLight, { marginBottom: 3, fontSize: 12, textAlign: 'right' }]}>{getDateDifference(booking.start_date, booking.due_date)} Night(s)</Text>
                                </View>
                            </View>

                            <View style={[styles.container, { paddingTop: 0, paddingLeft: 20, paddingRight: 20, justifyContent: 'space-between', flexDirection: 'row', backgroundColor: 'transparent', }]}>
                                <Text style={[{ marginBottom: 10, color: '#444', fontSize: 10 }, Styles.fontGilroyLight]}><Icon name="md-person" color={defaultColors(1)} size={10} /> {booking.pax} pax</Text>
                                <Text style={[{ marginBottom: 10, color: '#444', fontSize: 10, textTransform: 'uppercase' }, Styles.fontGilroyLight]}><Icon name="ios-person" color={defaultColors(1)} size={10} /> {booking.handler_name}</Text>
                            </View>
                        </Animatable.View>
                    </TouchableOpacity >
                )
            })
        ) : <Text style={[Styles.fontGilroyLight, { fontSize: 20, color: '#555' }]}>No data found</Text>
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <ScrollView
                    contentContainerStyle={{ padding: 25 }}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.loading}
                            onRefresh={this._onRefresh}
                            colors={['orange', '#57b5aa']}
                        />
                    }
                >
                    {this._renderBookings()}
                </ScrollView >
                <Navigator />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: Platform.OS == 'ios' ? 25 : 15,
        paddingTop: 15
    },
    details: {

    }
})


const mapStateToProps = state => {
    return {
        userID: state.userID,
    }
}

export default connect(
    mapStateToProps
)(Bookings);
