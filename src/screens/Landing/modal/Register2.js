import React, { Component } from "react";
import { View, Text, TouchableOpacity, TextInput, StyleSheet, ImageBackground, ScrollView } from 'react-native'
import { Actions } from 'react-native-router-flux';
import { Button, Input } from 'react-native-elements';

import axios from "axios";
import qs from 'qs';
import Helpers from '../../../Helpers';

import Styles from '../../../assets/Styles';
import { TransparentHeader } from '../../../components/Common';
import InputScrollView from 'react-native-input-scroll-view';
import { showMessage } from 'react-native-flash-message';

class Register2 extends Component {

    constructor(props) {
        super(props);

        this.state = {
            first_name: '',
            last_name: '',
            loading: false,
        }
    }

    processRegister = () => {
        this.setState({
            loading: true
        })
        const form_data = {
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            email_address: this.state.email_address,
            password: this.state.password
        }

        axios.post(Helpers.api_url + 'register', qs.stringify(form_data)).then(response => {
            this.setState({
                loading: false
            })

            if (response.data.type == 'success') {
                showMessage({
                    message: "Successfully Registered",
                    description: "You have successfully registered as a handler",
                    type: "default",
                    backgroundColor: "white",
                    color: "#555555",
                });
                Actions.pop();
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
            this.setState({
                loading: fasle
            })
            showMessage({
                message: "Oops!",
                description: "Something went wrong!",
                type: "default",
                backgroundColor: "white",
                color: "#555555",
            });
        });
    }

    render() {
        return (
            <ImageBackground
                style={{ flex: 1 }}
                source={require('../../../assets/images/bg-green.png')}
            >

                <View style={{ flex: 1, justifyContent: 'space-between' }}>
                    <TransparentHeader
                        title="Signup"
                        contentColor="#F0FAF9"
                        borderColor="#eafffd"
                    />

                    <View style={{ flex: 1 }}>
                        <InputScrollView contentContainerStyle={{ flex: 1, justifyContent: 'flex-end', paddingHorizontal: 15 }}>
                            <Text style={{ fontSize: 40, color: 'white', paddingHorizontal: 15, ...Styles.fontGilroyBold }}>New Traveller</Text>
                            <Text style={{ fontSize: 18, color: 'white', paddingHorizontal: 15, marginBottom: 25, ...Styles.fontGilroyLight }}>Input the required fields below</Text>
                            <Input
                                inputContainerStyle={styles.textInputContainer}
                                placeholder='First Name '
                                inputStyle={[styles.textInput, styles.fontGilroy]}
                                value={this.state.first_name}
                                onChangeText={(first_name) => this.setState({ first_name })}
                            />
                            <Input
                                inputContainerStyle={styles.textInputContainer}
                                placeholder='Last Name'
                                inputStyle={[styles.textInput, styles.fontGilroy]}
                                value={this.state.last_name}
                                onChangeText={(last_name) => this.setState({ last_name })}
                            />
                            <Input
                                inputContainerStyle={styles.textInputContainer}
                                placeholder='Email Address'
                                inputStyle={[styles.textInput, styles.fontGilroy]}
                                value={this.state.email_address}
                                onChangeText={(email_address) => this.setState({ email_address })}
                            />
                            <Input
                                inputContainerStyle={styles.textInputContainer}
                                placeholder='Type your Password'
                                secureTextEntry={true}
                                inputStyle={[styles.textInput, styles.fontGilroy]}
                                value={this.state.password}
                                onChangeText={(password) => this.setState({ password })}

                            />

                            <Button
                                buttonStyle={styles.btnSignup}
                                titleStyle={[{ color: 'white' }, Styles.fontGilroyBold]}
                                type="outline"
                                title="Sign Up"
                                loadingProps={{ color: 'white' }}
                                loading={this.state.loading}
                                onPress={() => this.processRegister()}
                            />

                            <View style={styles.formGroup}>
                                <Text
                                    style={[styles.texts, styles.fontGilroy]}>Already have an account?
                            </Text>
                                <Button
                                    titleStyle={[{ color: 'white' }, Styles.fontGilroyBold]}
                                    type="clear"
                                    title="Login"
                                    onPress={() => Actions.auth()}
                                />
                            </View>
                        </InputScrollView>
                    </View>
                </View>
            </ImageBackground>
        );
    }
}

export default Register2;

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        paddingVertical: 20,
        flex: 1
    },
    wrapper: {
        margin: 10,
    },

    btnEmail: {
        width: '100%',
        borderWidth: 1.5,
        borderColor: 'white',
        borderRadius: 19,
        margin: 5
    },
    link: {
        fontWeight: 'bold',
        color: '#F57D22',
    },
    submitButton: {
        padding: 10,
        margin: 5

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
        fontSize: 15,
        color: 'white'
    },
    fontGilroy: {
        fontFamily: "Gilroy-Light",
    },
    btnSignup: {
        borderRadius: 50,
        borderColor: 'white',
        paddingVertical: 13,
        marginHorizontal: 10,
        marginVertical: 18,
        marginBottom: 15,
        borderWidth: 1
    },
    formGroup: {
        flexDirection: 'row',
        marginVertical: 10,

    }
});
