import React, { Component } from "react";
import { StyleSheet, View, Image, Dimensions, Platform, PermissionsAndroid } from "react-native";
import { Button } from 'react-native-elements';
import { BackgroundCarousel } from './BackgroundCarousel';
import { Actions } from 'react-native-router-flux';
import { LinearButton, FullScreenLoader } from '../../components/Common';
import Styles from '../../assets/Styles';
import { connect } from 'react-redux';
import { showMessage } from "react-native-flash-message";
import firebase from 'react-native-firebase';
import AsyncStorage from "@react-native-community/async-storage";
import Axios from "axios";
import qs from "qs";
import Helpers from "../../Helpers";


const deviceHeight = Dimensions.get("window").height;

const images = [
    Helpers.assets_url + "app/login-bg-1.jpg",
    Helpers.assets_url + "app/login-bg-2.jpg",
    Helpers.assets_url + "app/login-bg-3.jpg",
];

class Landing extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            tokenfcm: '',
        }
    }

    componentDidMount = () => {
        const self = this;

        self.checkStorage()

        this.requestLocationPermission();
    }

    requestLocationPermission = async () => {
        console.log('ah yawa');
        
        if (Platform.OS == 'android') {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                    {
                        title: "Earthling Location Permission",
                        message:
                            "Earthling want know your location for better search results",
                        buttonNegative: "Cancel",
                        buttonPositive: "OK"
                    }
                );
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    console.log("You can use the location");
                } 
            } catch (err) {
                console.warn(err);
            }
        }
    };

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

    updateToken = () => {
        const self = this;

        return new Promise(function (resolve, reject) {
            self.checkPermission()
                .then(token => {
                    const theData = {
                        userid: self.props.userID,
                        fcm: token
                    };

                    Axios.post(
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

    checkStorage = async () => {
        const self = this;

        try {
            const userID = await AsyncStorage.getItem('userID');
            const userName = await AsyncStorage.getItem('userName')

            if (userID !== null) {
                self.props.updateState({ target: 'userID', value: userID });
                self.props.updateState({ target: 'userName', value: userName });

                self.updateToken()
                    .then(function (result) {
                        self.setState({ isLoading: false })
                        self.props.updateState({ target: 'isLoggedIn', value: true });
                    });
            } else {
                self.setState({ isLoading: false })
            }
        } catch (e) {
            showMessage({
                message: "Server Error",
                description: "Something Went Wrong!",
                type: "default",
                backgroundColor: "white",
                color: "#555555",
            });

            self.setState({ isLoading: false })
        }
    }


    render() {
        return this.state.isLoading ? (
            <FullScreenLoader>
                <Image
                    source={require('../../assets/images/logo.png')}
                    style={{
                        width: '50%',
                        height: 200,
                    }}
                    resizeMode="contain"
                />
            </FullScreenLoader>
        ) : (
                <View style={style.container}>
                    <BackgroundCarousel images={images} />

                    <View style={style.loginContainer}>
                        <View style={style.logoContainer}>
                            <Image
                                source={require('../../assets/images/logo.png')}
                                style={style.logo}
                                resizeMode="contain"
                            />
                        </View>

                        <View style={style.buttonContainer}>
                            <Button
                                title="Sign Up"
                                type="outline"
                                titleStyle={[{ color: '#fff' }, Styles.fontGilroyBold]}
                                buttonStyle={[style.button, { borderWidth: 1.2 }]}
                                onPress={() => Actions.register()}
                            />
                            <LinearButton
                                title="Login"
                                containerStyle={{ borderRadius: 50 }}
                                onPress={() => Actions.auth()}
                                style={[Styles.buttonText, Styles.fontGilroyBold]}
                            />
                        </View>

                    </View>
                </View>
            )
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
)(Landing);

const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F5FCFF"
    },
    loginContainer: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        alignItems: 'center',
        flex: 1
    },
    logoContainer: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'flex-start',
        top: (deviceHeight / 5),
    },
    logo: {
        width: '70%',
        height: 200,
    },
    buttonContainer: {
        width: '80%',
        justifyContent: 'flex-end',
        flex: 1,
        bottom: 25
    },
    button: {
        borderColor: '#fff',
        borderRadius: 50,
        paddingVertical: 11
    },
    btnLogin: {
        borderRadius: 30,
        borderRadius: 50,
        paddingVertical: 11,
        marginBottom: 20
    },
    buttonText: {
        fontSize: 16,
        textAlign: 'center',
        margin: 0,
        color: '#ffffff',
        backgroundColor: 'transparent',
    },
});
