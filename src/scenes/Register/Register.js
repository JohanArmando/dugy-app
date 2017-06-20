import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  Alert,
  Image,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
  TouchableNativeFeedback,
  ScrollView,
  KeyboardAvoidingView,
  ToastAndroid,
  StatusBar
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { AsyncStorage } from 'react-native';
import { register } from '../../services/authServices'
import Icon from 'react-native-vector-icons/MaterialIcons';
var styles = require('./welcomeStyles');
var utilities = require('../../assets/css/utilities');

export default class Home extends Component {

  constructor({ doLogin }) {
    super();
    this.login = doLogin;
    this.state = {
      name: '',
      last_name: '',
      email: '',
      password: '',
      confirm_password: '',
      logs:'',
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

  createRegister(){
    var re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (this.state.name == '') {
      ToastAndroid.show('Debe suministrar su nombre', ToastAndroid.SHORT);
    } else if (this.state.last_name == '') {
      ToastAndroid.show('Debe suministrar su apellido', ToastAndroid.SHORT);
    } else if (!re.test(this.state.email)) {
      ToastAndroid.show('Debe suministrar un email valido', ToastAndroid.SHORT);
    } else if (this.state.password == '') {
      ToastAndroid.show('Debe suministrar su contraseña', ToastAndroid.SHORT);
    } else if (this.state.confirm_password != this.state.password) {
      ToastAndroid.show('No coinciden sus contraseñas', ToastAndroid.SHORT);
    } else {
      console.log();
      this.setState({ loading: true});
      register({
        password: this.state.password,
        confirmPassword: this.state.confirm_password,
        name: this.state.name,
        avatar: 1,
        last_name: this.state.last_name,
        email: this.state.email
      })
      .then(data => {
        this.login(data.user);
        this.setState({ loading: false, logs: 'Bien' });
        AsyncStorage.setItem('token', data.token);
        Actions.Home({type: 'reset'});
      })
      .catch((data) => {
        console.log(data)
        this.setState({ loading: false, logs: 'Upss, No pudo ser registrado' });
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
              <Text style={[{color: 'white'},utilities.text_lg]}>Cargando...</Text>
            </View>
        </View>
      );
    }
    return (
      <View style={{flex: 1, backgroundColor: '#00a79d'}}>
        <StatusBar
          backgroundColor="#1e9284"
          barStyle="light-content"
        />
        <Icon.ToolbarAndroid
          style={[utilities.toolbar,{backgroundColor: '#00a79d'}]}
          title="Registrarse"
          titleColor="white"
          navIconName="arrow-back"
          onIconClicked={Actions.pop}
        />
        <ScrollView style={{flex: 1}}>

        <View style={[styles.container, {flex: 1, paddingBottom: 25}]}>
          <View>
            <Image source={require('../../../src/assets/images/Dugy.png')} style={[styles.logo, {marginTop: 20}]} />
            <Text style={[styles.sloganText, {marginBottom: 20}]}> Caminantes urbanos</Text>
          </View>
              <View style={{width: '75%'}}>
              <TextInput
                underlineColorAndroid="transparent"
                style={styles.input}
                value={this.state.name}
                placeholder='Nombre'
                onChangeText={(name) => this.setState({name: name.replace(/\b[a-z]/g,function(f){return f.toUpperCase();})})}
              />
              <TextInput
                underlineColorAndroid="transparent"
                style={styles.input}
                value={this.state.last_name}
                placeholder='Apellido'
                onChangeText={(last_name) => this.setState({last_name: last_name.replace(/\b[a-z]/g,function(f){return f.toUpperCase();})})}
              />
              <TextInput
                underlineColorAndroid="transparent"
                style={styles.input}
                placeholder='Correo Electronico'
                onChangeText={(email) => this.setState({email})}
              />
              <TextInput
                underlineColorAndroid="transparent"
                style={styles.input}
                placeholder='Contraseña'
                secureTextEntry={true}
                onChangeText={(password) => this.setState({password})}
              />
              <TextInput
                underlineColorAndroid="transparent"
                style={styles.input}
                placeholder='Confirmar Contraseña'
                secureTextEntry={true}
                onChangeText={(confirm_password) => this.setState({confirm_password})}
              />
              <TouchableNativeFeedback onPress={this.createRegister.bind(this)}>
                <View style={styles.buttonRegister} elevation={1}>
                  <Text style={{color: 'white', fontSize: 18, textAlign: 'center'}}>Registrar</Text>
                </View>
              </TouchableNativeFeedback>
            </View>
        </View>
        <View style={{marginBottom: 15}}>
          <TouchableNativeFeedback onPress={Actions.Login}>
              <Text style={{color: 'white', fontSize: 16, textAlign: 'center'}}>¿Ya tienes una cuenta? <Text style={{fontWeight: 'bold'}}>Iniciar Sesión</Text></Text>
          </TouchableNativeFeedback>
        </View>
        </ScrollView>
      </View>
    );
  }
}
const onButtonPress = () => {
  Actions.home();
};
