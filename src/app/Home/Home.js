import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  DrawerLayoutAndroid,
  Button,
  Image,
  TouchableHighlight,
  TouchableOpacity,
  StatusBar,
  ToolbarAndroid,
  ToastAndroid
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import DrawerLayout from './../DrawerLayout/DrawerLayout';
import { AsyncStorage } from 'react-native';
var styles = require('./homeStyles');

import PushNotification from 'react-native-push-notification';

PushNotification.configure({

    // (optional) Called when Token is generated (iOS and Android)
    onRegister: function(token) {
        console.log( 'TOKEN:', token );
    },

    // (required) Called when a remote or local notification is opened or received
    onNotification: function(notification) {
        console.log( 'NOTIFICATION:', notification );
    },

    // ANDROID ONLY: GCM Sender ID (optional - not required for local notifications, but is need to receive remote push notifications)
    senderID: "YOUR GCM SENDER ID",

    // Should the initial notification be popped automatically
    // default: true
    popInitialNotification: true,

    /**
      * (optional) default: true
      * - Specified if permissions (ios) and token (android and ios) will requested or not,
      * - if not, you must call PushNotificationsHandler.requestPermissions() later
      */
    requestPermissions: true,
});

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  componentDidMount(){
    AsyncStorage.getItem("current_user").then((value) => {
      this.welcomeMessage('Bienvenido ' + JSON.parse(value).name );
    }).done();
    // PushNotification.localNotification({
    //     /* Android Only Properties */
    //     bigText: "My big text that will be shown when notification is expanded", // (optional) default: "message" prop
    //     //subText: "This is a subText", // (optional) default: none
    //     vibrate: true, // (optional) default: true
    //     vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
    //     tag: 'some_tag', // (optional) add tag to message
    //     group: "group", // (optional) add group to message
    //     ongoing: false, // (optional) set whether this is an "ongoing" notification
    //
    //
    //     /* iOS and Android properties */
    //     title: "Bienvenido a Dugy", // (optional, for iOS this is only used in apple watch, the title will be the app name on other iOS devices)
    //     message: "Dugy made in china", // (required)
    //     playSound: false, // (optional) default: true
    //     soundName: 'default', // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
    // });
  }
  welcomeMessage(data){
    ToastAndroid.show(data, ToastAndroid.SHORT);
  }
  render() {
    return (
      <Image source={require('../../../src/assets/images/Home/background2.png')} style={styles.backgroundImage} >
        <StatusBar
          backgroundColor="#1e9284"
          barStyle="light-content"
        />
        <View style={styles.container}>
          <Image source={require('../../../src/assets/images/Home/logoHeader.png')} style={styles.container, styles.logoHeader} ></Image>

          <View style={styles.container}>
            <View style={styles.containerMenu}>
              <TouchableOpacity onPress={Actions.WalksCreate}>
                <View style={styles.containerActions} >
                  <Text style={styles.containerActionsHeader}>Paseos</Text>
                  <View style={styles.containerActionsImages}>
                    <Image source={require('../../../src/assets/images/Home/paseos.png')} style={styles.containerSingleImage} ></Image>
                  </View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={Actions.Welcome}>
                <View style={styles.containerActions}>
                  <Text style={styles.containerActionsHeader}>Entrenamientos</Text>
                  <View style={styles.containerActionsImages}>
                    <Image source={require('../../../src/assets/images/Home/entrenamiento.png')} style={styles.containerSingleImage} ></Image>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.containerPlans}>
              <TouchableOpacity onPress={Actions.PlanIndex} style={styles.containerPlansGreen}>
                <View style={styles.containerPlansCSS}>
                  <Image source={require('../../../src/assets/images/Home/mrdoggy_planes.png')} style={styles.containerSingleImage} ></Image>
                </View>
                <Text style={styles.containerPlansText}>PLANES Y PRECIOS</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Image>
    );
  }
}
