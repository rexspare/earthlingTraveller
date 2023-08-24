import React, { Component } from "react";
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native'
import { Actions } from 'react-native-router-flux';
import { Button } from 'react-native-elements';
import { TransparentHeader } from '../../../components/Common';
import Styles from '../../../assets/Styles';

class Register1 extends Component {
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
                    <View style={styles.container}>
                        <View style={{ justifyContent: 'flex-end' }}>
                            <Text style={[styles.texts, Styles.fontGilroyLight, { marginBottom: 20 }]}>SIGN UP WITH</Text>
                        </View>

                        <View style={{ alignSelf: 'center', flexDirection: 'row', marginHorizontal: 5 }}>

                            <Button
                                buttonStyle={[styles.inlineButtons]}
                                titleStyle={[{ color: 'white' }, Styles.fontGilroyBold]}
                                title="Facebook"
                                type="outline"
                                onPress={() => Actions.Facebook()}
                            />
                            <Button
                                buttonStyle={[styles.inlineButtons]}
                                titleStyle={[{ color: 'white' }, Styles.fontGilroyBold]}
                                title="Google"
                                type="outline"
                                onPress={() => Actions.Google()}
                            />
                        </View>
                        <Text style={[styles.texts, Styles.fontGilroyLight]}>OR</Text>

                        <Button buttonStyle={[styles.btnEmail, {width:'96%'}]}
                            titleStyle={[{ color: '#1CB9B2' }, Styles.fontGilroyBold]}
                            type="solid"
                            title="Email"
                            onPress={() => Actions.reg2()}
                        />

                        <View>
                            <Text style={styles.texts}></Text>
                        </View>
                        
                        <View style={styles.formGroup}>

                            <Text style={[styles.texts, Styles.fontGilroyLight]}>Already have an account?</Text>

                            <TouchableOpacity
                                onPress={() => Actions.auth()}
                            >
                                <Text style={[styles.texts, Styles.fontGilroyBold,{marginLeft:0}]}>Login</Text>
                            </TouchableOpacity>

                        </View>
                    </View>
                </View>
            </ImageBackground>
        );
    }
}

export default Register1;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-end",
        paddingHorizontal: 20,
        bottom: 25,
    },
    inlineButtons: {
        width: '85%',
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 25,
        alignSelf: 'center'
    },
    btnEmail: {
        width: '100%',
        borderWidth: 1.5,
        borderColor: 'white',
        borderRadius: 25,
        backgroundColor: 'white',
        alignSelf: 'center'
    },
    texts: {
        margin: 10,
        fontSize: 15,
        color: 'white'
    },
    fontGilroy: {
        fontFamily: "Gilroy-Light",
    },
    formGroup: {
        flexDirection: 'row',
        marginVertical: 10
    }
});
