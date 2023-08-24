import React, { Component } from 'react';
import { Image } from 'react-native-elements';
import Styles from '../../../assets/Styles';
import { View, Text, ScrollView, RefreshControl, StyleSheet, TouchableOpacity } from 'react-native';
import Helpers from '../../../Helpers';
import * as Animatable from 'react-native-animatable';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

class Filterbyseacrch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            property_id: null
        };
    }

    _renderList = () => {
        const properties = this.props.properties;
        if (properties.length) {
            return properties.map((property, i) => {
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
                            </View>
                            <View style={styles.container}>
                                <View style={{ flex: 1.5 }}>
                                    <Text style={[Styles.fontGilroyBold, { marginBottom: 3, fontSize: 16, textAlign: 'left' }]}>{property.property_title}</Text>
                                    <Text style={[Styles.fontGilroyLight, { marginBottom: 3, fontSize: 12, textAlign: 'left' }]}>{property.address}</Text>
                                </View>
                                <View style={{ flex: 1 }}>
                                    <Text style={[Styles.fontGilroyBold, { marginBottom: 3, color: '#57b5aa', fontSize: 16, textAlign: 'right' }]}>$ {property.base_price}</Text>
                                    <Text style={[Styles.fontGilroyLight, { marginBottom: 3, fontSize: 12, textAlign: 'right' }]}>
                                        {
                                            property.my_distance ? parseFloat(property.my_distance).toFixed(2) + 'km away' : property.property_category
                                        }
                                    </Text>
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
                >
                    {this._renderList()}
                </ScrollView >
            </View>
        )
    }
}
const mapStateToProps = state => {
    return {
        userID: state.userID,
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
)(Filterbyseacrch);

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
    },
    details: {

    }
})
