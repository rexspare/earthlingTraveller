import React, { Component } from 'react';
import { View, StyleSheet, ImageBackground, TouchableOpacity, ActivityIndicator, Keyboard } from 'react-native';
import { Button, Input, Text } from 'react-native-elements';
import { TransparentHeader, defaultColors } from '../../../components/Common';
import Styles from '../../../assets/Styles';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import { showMessage } from 'react-native-flash-message';
import Axios from 'axios';
import qs from 'qs';
import Helpers from '../../../Helpers';

export default class Forgotpass extends Component {
    state = {
        email: '',
        loading: false,
        sentEmail: false
    }

    sendEmail = () => {
        this.setState({
            loading: true,
            sentEmail: false
        });
        const { email } = this.state;

        Axios.post(
            Helpers.api_url + 'resetPassword',
            qs.stringify({
                email_address: email
            })
        ).then(response => {
            console.log(response.data);
            
            if (response.data.type == 'success') {
                showMessage({
                    message: "Success",
                    description: response.data.msg,
                    type: "success",
                    backgroundColor: "#fff",
                    color: "#000",
                    duration: 1000,
                });

                this.setState({
                    email: '',
                    sentEmail: true,
                    loading: false
                })
            } else {
                showMessage({
                    message: "Oops!",
                    description: response.data.msg ? response.data.msg : 'Something went wrong!',
                    type: "error",
                    backgroundColor: "#fff",
                    color: "#000",
                    duration: 1000,
                });
                this.setState({
                    loading: false
                })
            }
        })

        Keyboard.dismiss();
    }

    render() {
        return (
            <ImageBackground
                style={{ flex: 1 }}
                source={require('../../../assets/images/bg-green.png')}
            >
                <View style={{ flex: 1, justifyContent: 'space-between' }}>
                    <TransparentHeader
                        title="Login"
                        contentColor="white"
                        borderColor="white"
                    />
                    <View style={styles.container}>
                        <View style={styles.sendContainer}>
                            <View style={styles.sendContent}>
                                <Icons name={this.state.sentEmail ? "email-check-outline" : "email-search"} size={90} color={defaultColors(1)} />
                                <Text style={[Styles.fontGilroyBold, { marginTop: 10 }]}>{this.state.sentEmail ? "Check your Email!" : "Type in your Email Address"}</Text>
                            </View>
                        </View>

                        <View style={styles.inputs}>
                            <Input
                                inputContainerStyle={styles.textInputContainer}
                                placeholder='Email Address'
                                value={this.state.email}
                                inputStyle={[styles.textInput, styles.fontGilroy]}
                                onChangeText={(emailText) => this.setState({ email: emailText })}
                            />

                            <Button
                                buttonStyle={styles.btnLogin}
                                titleStyle={[{ color: 'white' }, Styles.fontGilroyBold]}
                                type="outline"
                                title="Send"
                                loading={this.state.loading}
                                loadingProps={{ color: 'white' }}
                                onPress={() => this.sendEmail()}
                            />
                        </View>
                    </View>
                </View>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
    },
    sendContainer: {
        flex: 1.5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    inputs: {
        flex: 1,
        justifyContent: 'flex-end'
    },
    sendContent: {
        alignItems: 'center',
        backgroundColor: 'white',
        paddingVertical: 30,
        width: '80%',
        borderRadius: 5
    },
    formGroup: {
        flexDirection: 'row',
        marginVertical: 10
    },
    btnLogin: {
        borderColor: '#fff',
        borderWidth: 1,
        borderRadius: 50,
        marginHorizontal: 10,
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
    texts: {
        margin: 10,
    },
    fontGilroy: {
        fontFamily: "Gilroy-Light",
    }
});