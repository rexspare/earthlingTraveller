import React, { Component } from 'react';
import { View, Text, ScrollView, RefreshControl, StyleSheet, TouchableOpacity } from 'react-native';
import Styles from '../../../assets/Styles';
import { Image } from 'react-native-elements';
import { connect } from 'react-redux';
import * as Animatable from 'react-native-animatable';
import axios from "axios";
import Helpers from '../../../Helpers';
import { Actions } from 'react-native-router-flux';
import Navigator from '../../../components/Navigator';

class Searches extends Component {
    state = {
        properties: [],
        loading: true
    }

    _onRefresh = () => {
        this.setState({
            loading: true
        })

        this.searchHistory();
    }

    componentDidMount = () => {
        this._onRefresh();
    }

    searchHistory = () => {
        const user_id = this.props.userID;
        console.log(user_id);

        axios.post(Helpers.traveller_api + 'historylogs/' + user_id)
            .then(response => {
                this.setState({ properties: response.data, loading: false });
            })
    }

    _renderSearches = () => {
        const { properties } = this.state;

        return properties ? properties.map((property, i) => {
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
                                    borderTopLeftRadius: 5,
                                    borderTopRightRadius: 5
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
                                <Text style={[Styles.fontGilroyLight, { marginBottom: 3, fontSize: 12, textAlign: 'right' }]}>{property.property_category}</Text>
                            </View>
                        </View>
                    </Animatable.View>
                </TouchableOpacity>
            )
        }) : <Text style={[Styles.fontGilroyLight, { fontSize: 20, color: '#555' }]}>No data found</Text>
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
                    {this._renderSearches()}
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
        paddingTop: 15,
        paddingHorizontal: 10,
        borderWidth: .5,
        borderTopWidth: 0,
        borderColor: '#eee',
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5
    },
    details: {

    }
})


const mapStateToProps = state => {
    return {
        userID: state.userID,

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
)(Searches);
