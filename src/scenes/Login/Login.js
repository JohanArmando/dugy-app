import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  Alert,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ToastAndroid,
  KeyboardAvoidingView,
  TouchableNativeFeedback,
  StatusBar,
  ActivityIndicator
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { AsyncStorage } from 'react-native';
import { login } from '../../services/authServices'
import Icon from 'react-native-vector-icons/MaterialIcons';
var utilities = require('../../assets/css/utilities');
import Dimensions from 'Dimensions';
const {width, height} = Dimensions.get('window');

var styles = require('../Register/welcomeStyles');

export default class Home extends Component {

  constructor({ doLogin }) {
    super();
    this.login = doLogin;
    this.state = {
      email: '',
      password: '',
      logs:'',
      loaded: '',
      loading: false
    };
  }

  checkLogin(data){
    if (data.errors) {
      errors = data.errors;
      this.setState({ logs: data.errors })
      return Actions.refresh()
    }
    this.setLocalLogin(data.auth.user);
    return onButtonPress()
  }

  createLogin(){
    var re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (!re.test(this.state.email)) {
      ToastAndroid.show('Debe suministrar un email valido', ToastAndroid.SHORT);
    } else if (this.state.password == '') {
      ToastAndroid.show('Le falto colocar su contrañesa', ToastAndroid.SHORT);
    } else {
      this.setState({ loading: true, logs: '' });
      login({
        email: this.state.email,
        password: this.state.password
        // email: 'davidfigueroar9@gmail.com',
        // password: '123456'
      })
      .then(data => {
        this.login(data.user);
        AsyncStorage.setItem('token', data.token);
        Actions.Home({type: 'reset'});
      })
      .catch((data) => {
        console.log(data)
        this.setState({ loading: false, logs: 'Email o contraseña invalidos' });
        ToastAndroid.show('Correo o contraseña invalidos', ToastAndroid.SHORT);
      });
    }
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
              <Text style={[{color: 'white'},utilities.text_lg]}>Iniciando sesión...</Text>
            </View>
        </View>
      );
    }
    return (
      <ScrollView >
      <View style={{height: (height-24), backgroundColor: '#00a79d'}}>
        <StatusBar
          backgroundColor="#1e9284"
          barStyle="light-content"
        />
        <Icon.ToolbarAndroid
          style={[utilities.toolbar,{backgroundColor: '#00a79d'}]}
          title="Iniciar Sesión"
          titleColor="white"
          navIconName="arrow-back"
          onIconClicked={Actions.pop}
        />
        <View style={[{flex: 1, alignItems: 'center', justifyContent: 'center'}]}>
          <View>
            <Image source={require('../../../src/assets/images/Dugy.png')} style={[styles.logo, {marginTop: 20}]} />
            <Text style={[styles.sloganText, {marginBottom: 20}]}> Caminantes urbanos</Text>
          </View>
            <View style={{width: '75%'}}>

              <TextInput
                underlineColorAndroid="transparent"
                style={styles.input}
                value={this.state.email}
                placeholder='Correo Electronico'
                onChangeText={(email) => this.setState({email})}
              />
              <TextInput
                underlineColorAndroid="transparent"
                style={styles.input}
                placeholder='Contraseña'
                value={this.state.password}
                secureTextEntry={true}
                onChangeText={(password) => this.setState({password})}
              />

              <TouchableNativeFeedback  onPress={this.createLogin.bind(this)}>
                <View style={styles.buttonRegister} elevation={1}>
                  <Text style={{color: 'white', fontSize: 18, textAlign: 'center'}}>Iniciar Sesión</Text>
                </View>
              </TouchableNativeFeedback>
            </View>
        </View>
        <View style={{marginBottom: 15}}>
          <TouchableNativeFeedback onPress={Actions.Register}>
              <Text style={{color: 'white', fontSize: 16, textAlign: 'center'}}>¿Todavia no tienes cuenta? <Text style={{fontWeight: 'bold'}}>Regístrese</Text></Text>
          </TouchableNativeFeedback>
        </View>
      </View>
      </ScrollView>
    );
  }
}
class LoadingEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false
    };
  }
  render(){
    if (this.props.loaded) {
      return(
        <View style={styles.loaingContainer}>
          <Text style={styles.loadingContainerText}>Iniciando sesion</Text>
        </View>
      )
    }
    return(
      <View></View>
    )
  }
}
const onButtonPress = () => {
  Actions.home();
};
