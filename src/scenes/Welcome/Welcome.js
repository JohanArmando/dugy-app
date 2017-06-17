import React, { Component } from 'react';
import { Text, View, ActivityIndicator, Button, Alert, TouchableNativeFeedback, StatusBar, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { AsyncStorage } from 'react-native';
var utilities = require('../../assets/css/utilities');
import { session } from '../../services/authServices'

var styles = require('./welcomeStyles');

export default class Welcome extends Component {
  constructor({ doLogin }) {
    super();
    this.login = doLogin;
    this.state = {
      loading: true,
      login: false
    };
  }

  componentWillMount(){
    AsyncStorage.getItem("token")
    .then((value) => {
      if (value != null) {
        session(value)
        .then((data) => {
          console.log('login 1')
          this.login(data.user);
          Actions.Home({type: 'reset'});
        })
        .catch(data => {
          console.log('login 2')

          this.setState({ loading: false });
        });
      } else  {
        console.log('login 3')
        this.setState({ loading: false });
      }
    })
  }
  render() {
    if (this.state.loading) {
      return (
        <View style={utilities.container}>
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#00a79d'}}>
              <ActivityIndicator
                animating={true}
                style={[styles.centering, {height: 80}]}
                size="large"
                color="white"
              />
              <Text style={[{color: 'white'},utilities.text_lg]}>Cargando...</Text>
            </View>
        </View>
      );
    } else {
      if (this.props.user.name !== '') {
        return (
          <View style={styles.container}>
            <StatusBar
              backgroundColor="#1e9284"
              barStyle="light-content"
            />
            <Text style={styles.welcome}>
              Bienvenido a <Text style={styles.name}>Dugy</Text>
            </Text>
            <View>
              <Image source={require('../../../src/assets/images/Dugy.png')} style={styles.logo} />
              <Text style={styles.sloganText}> Caminantes urbanos</Text>
            </View>
            <View style={styles.slogan}>
              <TouchableNativeFeedback onPress={Actions.Home} >
                <View style={styles.whiteButton}>
                  <Text style={styles.button}>Entrar</Text>
                </View>
              </TouchableNativeFeedback>
            </View>
          </View>
        );
      } else {
        return (
          <View style={styles.container}>
            <StatusBar
              backgroundColor="#1e9284"
              barStyle="light-content"
            />
            <Text style={styles.welcome}>
              Bienvenido a <Text style={styles.name}>Dugy</Text>
            </Text>
            <View>
              <Image source={require('../../../src/assets/images/Dugy.png')} style={styles.logo} />
            </View>
            <View style={styles.slogan}>
              <TouchableNativeFeedback onPress={goToLogin}>
                <View style={styles.whiteButton}>
                  <Text style={styles.button}>Iniciar sesion</Text>
                </View>
              </TouchableNativeFeedback>
              <TouchableNativeFeedback onPress={goToRegister}>
                <View style={styles.whiteButton}>
                  <Text style={styles.button}>Registrate</Text>
                </View>
              </TouchableNativeFeedback>
            </View>
          </View>
        );
      }
    }

  }
}

const goToRegister = () => {
  Actions.Register();
};

const goToLogin = () => {
  Actions.Login();
};
