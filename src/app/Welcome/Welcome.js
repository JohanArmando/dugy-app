import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  Alert,
  TouchableOpacity,
  StatusBar,
  Image
} from 'react-native';
import { Actions } from 'react-native-router-flux';

var styles = require('./welcomeStyles');

export default class Welcome extends Component {
  render() {
    return (
      
      <View style={styles.container}>
        <StatusBar
          backgroundColor="#1e9284"
          barStyle="light-content"
        />
        <Text style={styles.welcome}>
          Bienvenido a <Text style={styles.name}>Mr. Doggy</Text>
        </Text>
        <View>
          <Image source={require('../../../src/assets/images/logoNew.png')} style={styles.logo} />
          <Text style={styles.sloganText}> Caminantes urbanos</Text>
        </View>
        <View style={styles.slogan}>        
          <TouchableOpacity onPress={onButtonPress} style={styles.whiteButton}>
            <View>
              <Text style={styles.button}>Registrate</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={goToLogin} style={styles.whiteButton}>
            <View >
              <Text style={styles.button} >Iniciar sesion</Text>
            </View>
          </TouchableOpacity>   
        </View>     
      </View>
    );
  }
}

const onButtonPress = () => {
  Alert.alert('Button has been pressed!');
};

const goToLogin = () => {
  Actions.login();
};
