import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, RefreshControl } from 'react-native';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import { Actions } from 'react-native-router-flux';
import { ListItem, Avatar, List } from 'react-native-elements';
import axios from 'axios';
import qs from 'qs';
import Icon from 'react-native-vector-icons/Octicons';
import Icons from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';

import Styles from '../../assets/Styles';
import { defaultColors, FullScreenLoader } from '../../components/Common';
import Helpers from '../../Helpers';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image_uri: null,
            name: "asd",
            subtitle: 'sub',
            imageSource: '',
            data: null,
            fname: '',
            lname: '',
            respon: '',
            refreshing: true,
        };
    }

    componentDidMount = () => {
        this._getData();
    }

    _getData = async () => {
        const self = this;
        const userID = this.props.userID

        axios({
            method: 'post',
            url: Helpers.traveller_api + '/get_user_info/' + userID
        }).then(response => {
            self.setState({ refreshing: false });
            self.setInitialStates(response.data);
        });
    }

    setInitialStates = (data) => {
        const avatar = data.avatar;
        this.setState({
            imageSource: avatar,
            fname: data.firstname,
            lname: data.lastname
        })
    }

    logout = () => {
        AsyncStorage.clear();
        this.props.updateState({ target: 'userID', value: null })
        this.props.updateState({ target: 'isLoggedIn', value: null })

        const theData = {
            userid: this.props.userID,
            fcm: ''
        };

        axios.post(
            Helpers.api_url + 'updateUserFcm',
            qs.stringify(theData)
        ).then(response => {
            console.log('Success', response.data);
        });
    }


    terms = () => {
        Actions.termsofservice()
    }

    _onRefresh = () => {
        this._getData();
    }

    render() {
        const { imageSource, refreshing } = this.state;

        if (refreshing) {
            return <FullScreenLoader theme="light" />
        } else {
            return (
                <View>
                    <ScrollView
                        contentContainerStyle={{ paddingHorizontal: 25 }}
                        refreshControl={
                            <RefreshControl
                                refreshing={this.state.refreshing}
                                onRefresh={this._onRefresh}
                                colors={defaultColors(2)}
                            />
                        }
                    >
                        <View style={[styles.container, { backgroundColor: '#FFFFFF', flexDirection: 'row' }]}>
                            <Avatar
                                rounded
                                size="large"
                                source={{ uri: Helpers.avatars_url + (imageSource != '' ? imageSource : 'no-avatar.png') }}
                            />
                            <View style={{ flex: 0, flexDirection: 'column', flexWrap: 'wrap' }}>
                                <Text style={[Styles.fontGilroyBold, Styles.mediumText, { paddingHorizontal: 20, textTransform: 'uppercase' }]} >
                                    {this.state.lname}, {this.state.fname}</Text>
                                <View style={{ paddingHorizontal: 15, }}>
                                    <TouchableOpacity style={[styles.button]} onPress={Actions.editprofile}>
                                        <Text style={[styles.text, Styles.fontGilroyLight]}> <Icons name="edit" />   Edit Profile</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        <View style={{ paddingVertical: 25 }}>
                            <Text style={[Styles.smallText, Styles.fontGilroyLight]}>ACCOUNT SETTING</Text>
                            <TouchableOpacity onPress={() => Actions.viewprofile({ profileID: this.props.userID })} >
                                <View style={{ paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#F2F2F2', paddingBottom: 20 }}>
                                    <Text style={[Styles.smallText, Styles.fontGilroyLight]}><Icons name="user" color={defaultColors(1)} size={18} />     Personal Information </Text>
                                </View>
                            </TouchableOpacity>
                            {/* <View style={{ paddingVertical: 10 }}>
                                <Text style={[Styles.smallText, Styles.fontGilroyLight]}><Icon name="bell" color={defaultColors(1)} size={18} />    Setup Notifications</Text>
                            </View> */}
                        </View>

                        <View style={{ paddingVertical: 25 }}>
                            <Text style={[Styles.smallText, Styles.fontGilroyLight]}>LEGAL</Text>

                            <View style={{ paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#F2F2F2', paddingBottom: 20 }}>
                                <TouchableOpacity onPress={this.terms} >
                                    <Text style={[Styles.smallText, Styles.fontGilroyLight]}> <Icon name="file" color={defaultColors(1)} size={18} />    Terms of Service</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ paddingVertical: 10 }}>
                                <TouchableOpacity onPress={this.logout}>
                                    <Text style={[Styles.smallText, Styles.fontGilroyLight]}><Feather name="corner-up-right" color={defaultColors(1)} size={18} />    Logout</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ScrollView>
                </View >
            );
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
)(Profile);

const styles = StyleSheet.create({
    button: {
        width: '100%',
        backgroundColor: '#009C93',
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 5
    },
    text: {
        fontSize: 12,
        color: 'white',

    },
    container: {
        paddingHorizontal: 20,
        paddingVertical: 20
    }
})
