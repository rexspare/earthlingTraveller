import React, { Component } from 'react';
import { View, StyleSheet, ImageBackground, ScrollView, SafeAreaView, Dimensions, Modal, Image, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Input, Text, ListItem } from 'react-native-elements';
import Style   from '../../../assets/Styles';
import { CustomNav1 } from '../../../components/CustomNav1';
import Slider  from 'react-native-simple-slider';
import { Rating, AirbnbRating } from 'react-native-ratings';
import Icon from 'react-native-vector-icons/FontAwesome';
import Navigator from '../../../components/Navigator';
import Axios from 'axios';
import Helpers from '../../../Helpers';
import qs from 'qs';
import { connect } from 'react-redux';
class Lastsearch extends Component{
   
    render(){
        return(
            <>
               <View style={{ flex: 2, padding: 5, flexDirection: 'row' }}>
                                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                                    <TouchableOpacity onPress={() => Actions.preview()}>
                                        <Image
                                            style={{ width: 90, height: 90, margin: 10, borderRadius: 10 }}
                                            source={require('../../../assets/images/sample_properties/property_1.jpg')}
                                        /></TouchableOpacity>
                                    <Image
                                        style={{ width: 90, height: 90, margin: 10, borderRadius: 10 }}
                                        source={require('../../../assets/images/sample_properties/property_4.jpg')}
                                    />
                                    <Image
                                        style={{ width: 90, height: 90, margin: 10, borderRadius: 10 }}
                                        source={require('../../../assets/images/sample_properties/property_4.jpg')}
                                    />
                                    <Image
                                        style={{ width: 90, height: 90, margin: 10, borderRadius: 10 }}
                                        source={require('../../../assets/images/sample_properties/property_4.jpg')}
                                    />
                                    <Image
                                        style={{ width: 90, height: 90, margin: 10, borderRadius: 10 }}
                                        source={require('../../../assets/images/sample_properties/property_4.jpg')}
                                    />
                                    <Image
                                        style={{ width: 90, height: 90, margin: 10, borderRadius: 10 }}
                                        source={require('../../../assets/images/sample_properties/property_4.jpg')}
                                    />
                                </ScrollView>
                            </View>
            </>
        )
    }
}
const mapStateToProps = state => {
    return {
        userID: state.userID,
        starRating: state.starRating,
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
)(Lastsearch);