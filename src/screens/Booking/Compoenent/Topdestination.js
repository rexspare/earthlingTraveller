import React, { Component } from 'react';
import { View, ScrollView,  Image } from 'react-native';

import { connect } from 'react-redux';
class Topdestination extends Component{
   
    render(){
        
        return(
            <>
               <View style={{ flex: 2, padding: 5, flexDirection: 'row' }}>
                                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                                   
                                    <Image
                                    style={{ width: 90, height: 90, margin: 10, borderRadius: 10 }}
                                    source={require('../../../assets/images/sample_properties/property_2.jpg')}
                                    />

                                    <Image
                                        style={{ width: 90, height: 90, margin: 10, borderRadius: 10 }}
                                        source={require('../../../assets/images/sample_properties/property_3.jpg')}

                                    />
                                    <Image
                                        style={{ width: 90, height: 90, margin: 10, borderRadius: 10 }}
                                        source={require('../../../assets/images/sample_properties/property_3.jpg')}

                                    />
                                    <Image
                                        style={{ width: 90, height: 90, margin: 10, borderRadius: 10 }}
                                        source={require('../../../assets/images/sample_properties/property_3.jpg')}

                                    />
                                    <Image
                                        style={{ width: 90, height: 90, margin: 10, borderRadius: 10 }}
                                        source={require('../../../assets/images/sample_properties/property_3.jpg')}

                                    />
                                    <Image
                                        style={{ width: 90, height: 90, margin: 10, borderRadius: 10 }}
                                        source={require('../../../assets/images/sample_properties/property_3.jpg')}

                                    />
                                    <Image
                                        style={{ width: 90, height: 90, margin: 10, borderRadius: 10 }}
                                        source={require('../../../assets/images/sample_properties/property_3.jpg')}

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
)(Topdestination);