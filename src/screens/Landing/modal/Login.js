import React, { Component } from 'react';
import { View, StyleSheet, ImageBackground, Keyboard, YellowBox } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Input, Text } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { LinearButton, TransparentHeader } from '../../../components/Common';
import Styles from '../../../assets/Styles';
import { connect } from 'react-redux'
import { showMessage } from "react-native-flash-message";
import AsyncStorage from '@react-native-community/async-storage';

import firebase from 'react-native-firebase';
import axios from "axios";
import qs from 'qs';
import Helpers from '../../../Helpers';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            loading: false
        }
    }

    async checkPermission() {
        const enabled = await firebase.messaging().hasPermission();

        if (enabled) {
            response = this.getToken();
        } else {
            response = this.requestPermission();
        }

        return response;
    }

    async getToken() {
        let fcmToken = await AsyncStorage.getItem('fcmToken');

        if (!fcmToken) {

            fcmToken = await firebase.messaging().getToken();
            if (fcmToken) {
                try {
                    await AsyncStorage.setItem('fcmToken', fcmToken);
                } catch (e) {
                    console.log(e);
                }
            } else {
                alert('no token');
            }
        }

        return fcmToken;
    }

    async requestPermission() {
        try {
            await firebase.messaging().requestPermission();
            this.getToken();
        } catch (error) {
            return 'error';
        }
    }

    onSubmit = async () => {
        Keyboard.dismiss();
        this.setState({ loading: true });
        const { email, password } = this.state;

        if (email != "" && password != "") {
            await axios.post(
                Helpers.api_url + 'authtraveller',
                qs.stringify(this.state)
            ).then(response => {
                if (response.data.type == "success") {
                    this.auth(response.data.returnData);
                } else {
                    showMessage({
                        message: "Oops!",
                        description: response.data.msg,
                        type: "default",
                        backgroundColor: "white",
                        color: "#555555",
                    });
                }
            }).catch(() => {
                showMessage({
                    message: "Oops!",
                    description: "Something went wrong!",
                    type: "default",
                    backgroundColor: "white",
                    color: "#555555",
                });
            });
            this.setState({ loading: false });
        } else {
            showMessage({
                message: "Invalid Input",
                description: "Please enter your credentials",
                type: "default",
                backgroundColor: "white",
                color: "#555555",
            });
            this.setState({ loading: false });
        }
    }

    auth = async (userdata) => {
        const self = this;

        try {
            await AsyncStorage.multiSet([['userID', userdata.userID], ['userName', userdata.name]]).then((success) => {
                self.props.updateState({ target: 'userID', value: userdata.userID });
                self.props.updateState({ target: 'userName', value: userdata.name });

                self.updateToken()
                    .then(function (result) {
                        self.setState({ isLoading: false })
                        self.props.updateState({ target: 'isLoggedIn', value: true });
                    });
                // Actions.searchs('root');
            });

        } catch (e) {
            showMessage({
                message: "Server Error",
                description: "Something Went Wrong!",
                type: "default",
                backgroundColor: "white",
                color: "#555555",
            });
        }
    }

    updateToken = () => {
        const self = this;

        return new Promise(function (resolve, reject) {
            self.checkPermission()
                .then(token => {
                    const theData = {
                        userid: self.props.userID,
                        fcm: token
                    };

                    axios.post(
                        Helpers.api_url + 'updateUserFcm',
                        qs.stringify(theData)
                    ).then(() => {
                        resolve('success');
                    }).catch(function (e) {
                        reject(e);
                    });
                }).catch(function (e) {
                    reject(e);
                });
        });
    }

    render() {
        return (
            <ImageBackground
                style={{ flex: 1 }}
                source={require('../../../assets/images/bg-white.png')}
            >
                <View style={{ flex: 1, justifyContent: 'space-between' }}>
                    <TransparentHeader
                        title="Login"
                    />

                    <KeyboardAwareScrollView contentContainerStyle={{ flex: 1 }}>
                        <View style={[Styles.container, { justifyContent: 'flex-end', marginBottom: 20 }]}>
                            <Text style={[Styles.fontGilroyLight, { marginBottom: 20, margin: 10, fontSize: 15 }]}>LOGIN</Text>
                            <Input
                                inputContainerStyle={styles.textInputContainer}
                                placeholder='Email Address'
                                inputStyle={[styles.textInput, styles.fontGilroy]}
                                onChangeText={(email) => this.setState({ email })}
                            />
                            <Input
                                inputContainerStyle={styles.textInputContainer}
                                placeholder='Password '
                                inputStyle={[styles.textInput, styles.fontGilroy]}
                                onChangeText={(password) => this.setState({ password })}
                                secureTextEntry={true}
                            />

                            <View style={{ marginHorizontal: 10 }}>
                                <LinearButton
                                    title="Login"
                                    onPress={this.onSubmit}
                                    //onPress={() => Actions.searchs()}
                                    style={[Styles.buttonText, Styles.fontGilroyBold]}
                                    loading={this.state.loading}
                                />

                                <View style={styles.formGroup}>
                                    <Text style={styles.fontGilroy}>Need an account?</Text>
                                    <Text onPress={() => Actions.register()} style={[styles.link, Styles.fontGilroyBold]}> Sign Up</Text>
                                </View>

                                <View style={styles.formGroup}>
                                    <Text style={styles.fontGilroy}>Forgot your password</Text>
                                    <Text style={[styles.link, Styles.fontGilroyBold]} onPress={() => Actions.forgotpass()}> Retrieve</Text>
                                </View>

                            </View>
                        </View>
                    </KeyboardAwareScrollView>
                </View>
            </ImageBackground>
        );
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
)(Login);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-end",
        paddingHorizontal: 20,
        bottom: 25,
    },
    formGroup: {
        flexDirection: 'row',
        marginVertical: 10
    },
    link: {
        color: '#57b5aa',
        marginLeft: 5
    },
    btnLogin: {
        borderRadius: 20,
        backgroundColor: "#1CB9B2",
        paddingVertical: 10,
        marginVertical: 18,
        marginBottom: 40
    },
    textInputContainer: {
        backgroundColor: 'white',
        borderRadius: 13,
        marginVertical: 5,
        borderWidth: 1,
        borderColor: '#ebebeb',
        height: 45
    },
    textInput: {
        paddingHorizontal: 15,
        fontSize: 12
    },
    fontGilroy: {
        fontFamily: "Gilroy-Light",
    }
    , btnLogin: {
        borderRadius: 20,
        backgroundColor: "#1CB9B2",
        borderColor: '#DADADA',
        paddingVertical: 10,
        marginVertical: 18,
        marginBottom: 20
    },
    linearGradient: {
        borderRadius: 50,
        marginTop: 16,
        width: 350,
    },
    buttonText: {
        fontSize: 18,
        textAlign: 'center',
        margin: 0,
        color: '#ffffff',
        backgroundColor: 'transparent',
    }
});
