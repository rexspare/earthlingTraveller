import React, { Component } from 'react';
import { View, Text, ScrollView, RefreshControl, StyleSheet, TouchableOpacity } from 'react-native';
import Styles from '../../../assets/Styles';
import { Image } from 'react-native-elements';
import Icons from 'react-native-vector-icons/Feather';
import Navigator from '../../../components/Navigator';
import { connect } from 'react-redux';
import axios from "axios";
import Helpers from '../../../Helpers';
import { Actions } from 'react-native-router-flux';
import { showMessage } from 'react-native-flash-message';
import * as Animatable from 'react-native-animatable';

class Wishlist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            wishlist: [],
            loading: true
        }
    }

    _onRefresh = () => {
        this.setState({
            loading: true
        })

        this.fetchAllwishlisted();
    }

    componentDidMount = () => {
        this._onRefresh();
        console.log(this.props);

    }

    fetchAllwishlisted = () => {
        const user_id = this.props.userID;
        axios.post(Helpers.traveller_api + 'getAllWishlisted/' + user_id).then(response => {
            this.setState({ wishlist: response.data, loading: false });
        })
    }

    unwishlist = (property_ids) => {
        const property_id = property_ids;
        const user_id = this.props.userID;

        axios.post(Helpers.traveller_api + 'unWishlist/' + user_id + '/' + property_id).then(response => {
            if (response.data.type == "success") {
                showMessage({
                    message: "Success!",
                    description: response.data.msg,
                    type: "default",
                    backgroundColor: "#fff",
                    color: "#555555",
                });
                this._onRefresh();
            }
        })
    }

    _renderList = () => {
        const wishlist = this.state.wishlist;

        if (wishlist.length) {
            return wishlist.map((property, i) => {
                return (
                    <TouchableOpacity key={i} onPress={() => Actions.preview({ property_id: property.property_id })}>
                        <Animatable.View animation="fadeInUp" delay={i * 500} style={{ flex: 1, marginBottom: 20 }}  >
                            <View style={{
                                borderTopLeftRadius: 5,
                                borderTopRightRadius: 5,
                                overflow: 'hidden',
                            }} >
                                <Image
                                    source={{
                                        uri: Helpers.image_url + property.filename
                                    }}
                                    style={{
                                        width: '100%',
                                        height: 150,
                                    }}
                                />
                                <Icons name='heart' onPress={() => this.unwishlist(property.property_id)} size={20} style={[Styles.close, { backgroundColor: '#57b5aa', borderRadius: 50, padding: 10 }]} />
                            </View>
                            <View style={styles.container}>
                                <View style={{ flex: 1.5 }}>
                                    <Text style={[Styles.fontGilroyBold, { marginBottom: 3, fontSize: 16, textAlign: 'left' }]}>{property.property_title}</Text>
                                    <Text style={[Styles.fontGilroyLight, { marginBottom: 3, fontSize: 12, textAlign: 'left' }]}>{property.address}</Text>
                                </View>
                                <View style={{ flex: 1 }}>
                                    <Text style={[Styles.fontGilroyBold, { marginBottom: 3, color: '#57b5aa', fontSize: 16, textAlign: 'right' }]}>$ {property.base_price}</Text>
                                    <Text style={[Styles.fontGilroyLight, { marginBottom: 3, fontSize: 12, textAlign: 'right' }]}>{property.property_category}</Text>
                                </View>
                            </View>
                        </Animatable.View>
                    </TouchableOpacity>
                )
            })
        } else {
            return <Text style={[Styles.fontGilroyLight, { fontSize: 20, color: '#555' }]}>No data found</Text>
        }
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
                    {this._renderList()}
                </ScrollView >
                <Navigator />
            </View>
        );
    }
}


const mapStateToProps = state => {
    return {
        userID: state.userID,
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
)(Wishlist);

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: Platform.OS == 'ios' ? 25 : 15,
        paddingTop: 15,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderTopWidth: 0,
        borderColor: '#eee',
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
    }
})
