
import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Alert } from 'react-native';
import firebase from 'react-native-firebase';
import AsyncStorage from '@react-native-community/async-storage';

import Routers from './src/Routers';
import { Provider } from 'react-redux';
//import PayPalSetUp from './src/screens/SetupProperty/Pricing/PayPalSetUp';

import { store } from './src/redux/store';
import FlashMessage from "react-native-flash-message";
import Styles from './src/assets/Styles';

//Ignore Messages
// YellowBox.ignoreWarnings([
//   'Warning: componentWillMount is deprecated',
//   'Warning: componentWillReceiveProps is deprecated',
//   'Warning: componentWillReceiveProps has been renamed',
//   'Setting a timer',
//   'Require cycle:'
// ]);

class App extends Component {

  async componentDidMount() {
    this.checkPermission();
    this.createNotificationListeners();
  }

  componentWillUnmount() {
    this.notificationListener;
    this.notificationOpenedListener;
  }


  async checkPermission() {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
      this.getToken();
    } else {
      this.requestPermission();
    }
  }


  async getToken() {
    let fcmToken = await AsyncStorage.getItem('fcmToken');
    if (!fcmToken) {
      fcmToken = await firebase.messaging().getToken();
      if (fcmToken) {

        console.log('fcmToken:', fcmToken);
        await AsyncStorage.setItem('fcmToken', fcmToken);
      }
    }
    console.log('fcmToken:', fcmToken);
  }


  async requestPermission() {
    try {
      await firebase.messaging().requestPermission();

      this.getToken();
    } catch (error) {

      console.log('permission rejected');
    }
  }

  async createNotificationListeners() {

    this.notificationListener = firebase.notifications().onNotification((notification) => {
      const { title, body } = notification;
      console.log('onNotification:');

      const localNotification = new firebase.notifications.Notification({
        sound: 'sampleaudio',
        show_in_foreground: true,
      })
        .setSound('sampleaudio.wav')
        .setNotificationId(notification.notificationId)
        .setTitle(notification.title)
        .setBody(notification.body)
        .android.setChannelId('fcm_channel')

        .android.setColor('#000000')
        .android.setPriority(firebase.notifications.Android.Priority.High);


      firebase.notifications()
        .displayNotification(localNotification)
        .catch(err => console.error(err));
    });

    const channel = new firebase.notifications.Android.Channel('fcm_channel', 'Demo app name', firebase.notifications.Android.Importance.High)
      .setDescription('Demo app description')
      .setSound('sampleaudio.wav');
    firebase.notifications().android.createChannel(channel);


    this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
      const { title, body } = notificationOpen.notification;
      console.log('onNotificationOpened:');
      Alert.alert(title, body)
    });


    const notificationOpen = await firebase.notifications().getInitialNotification();
    if (notificationOpen) {
      const { title, body } = notificationOpen.notification;
      console.log('getInitialNotification:');
      Alert.alert(title, body)
    }

    this.messageListener = firebase.messaging().onMessage((message) => {
      //process data message
      if (Platform.OS == 'android') {
        console.log("JSON.stringify:", JSON.stringify(message));

      } else {
        alert(message);
      }
    });
  }

  render() {
    return (
      <Provider store={store}>
        <Routers />
        <FlashMessage
          style={{
            elevation: 5,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: -2 },
            shadowOpacity: 0.1,
            shadowRadius: 2,
          }} position="bottom"
          titleStyle={Styles.fontGilroyBold}
          textStyle={Styles.fontGilroyLight}
        />
      </Provider>
    );
  }
}

export default App;
