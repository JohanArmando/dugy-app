import React, { Component } from 'react';
import { View, ToastAndroid, Text, TextInput,StyleSheet, ToolbarAndroid, TouchableNativeFeedback, StatusBar } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/MaterialIcons';
var utilities = require('../../assets/css/utilities');
import { updateProfile } from '../../services/authServices';



export default class Profile extends Component {

  constructor(props) {
    super(props);
    this.updateStore = props.store;
    var attr;
    var value;
    var value2 = '';
    if (props.attr == 'name') {
      attr = 'datos'
      value = props.user.name
      value2 = props.user.last_name
    } else if (props.attr == 'email') {
      attr = 'email'
      value = props.user.email
    } else if (props.attr == 'phone') {
      attr = 'telefono'
      value = props.user.phone
    } else if (props.attr == 'document') {
      attr = 'documento'
      value = props.user.documentation
    }
    this.state = {
      attr: attr,
      value: value,
      value2: value2
    };
  }

  editName () {
    updateProfile(this.props.user.id,{
      name: this.state.value,
      last_name: this.state.value2
    })
    .then(user => {
      ToastAndroid.show('El nombre ha sido actiualizado', ToastAndroid.SHORT);
      this.updateStore(user)
      Actions.pop()
    })
    .catch(err => {
      ToastAndroid.show('No se pudo actualizar el perfil', ToastAndroid.SHORT);
      console.log(error)
    })
  };
  editPhone () {
    updateProfile(this.props.user.id,{
      phone: this.state.value
    })
    .then(user => {
      this.updateStore(user)
      ToastAndroid.show('El Telefono ha sido actiualizado', ToastAndroid.SHORT);
      Actions.pop()
    })
    .catch(err => {
      ToastAndroid.show('No se pudo actualizar el perfil', ToastAndroid.SHORT);
      console.log(error)
    })
  };
  editEmail () {
    updateProfile(this.props.user.id,{
      email: this.state.value
    })
    .then(user => {
      ToastAndroid.show('El Email ha sido actiualizado', ToastAndroid.SHORT);
      this.updateStore(user)
      Actions.pop()
    })
    .catch(err => {
      ToastAndroid.show('No se pudo actualizar el perfil', ToastAndroid.SHORT);
      console.log(error)
    })
  };
  editDocument () {
    updateProfile(this.props.user.id,{
      documentation: this.state.value
    })
    .then(user => {
      ToastAndroid.show('Los datos han sido actiualizado', ToastAndroid.SHORT);
      this.updateStore(user)
      Actions.pop()
    })
    .catch(err => {
      ToastAndroid.show('No se pudo actualizar el perfil', ToastAndroid.SHORT);
      console.log(error)
    })
  };

  render (){
    var form;
    var button;
    if (this.props.attr == "name") {
      form = (
        <View>
          <TextInput
            autoFocus={true}
            style={{margin: 15, marginBottom: 0, fontSize: 18}}
            onChangeText={(value) => this.setState({value: value.replace(/\b[a-z]/g,function(f){return f.toUpperCase();})})}
            value={this.state.value}
            placeholder={'Escribe tu ' + this.state.attr}
            underlineColorAndroid='#CCC'
          />
          <TextInput
            style={{margin: 15, fontSize: 18}}
            onChangeText={(value) => this.setState({value2: value.replace(/\b[a-z]/g,function(f){return f.toUpperCase();})})}
            value={this.state.value2}
            placeholder={'Escribe tu apellido'}
            underlineColorAndroid='#CCC'
          />
        </View>
      );//
      button = (
        <TouchableNativeFeedback onPress={ this.editName.bind(this) }>
          <View style={{ flex: 1, borderLeftWidth: 1, borderTopWidth: 1, borderColor: '#ccc', padding: 10}}>
            <Text style={{fontSize: 18, textAlign: 'center'}}>OK</Text>
          </View>
        </TouchableNativeFeedback>
      )
    } else if (this.props.attr == "email") {
      form = (
        <View>
          <TextInput
            keyboardType="email-address"
            autoFocus={true}
            style={{margin: 15, marginBottom: 0, fontSize: 18}}
            onChangeText={(value) => this.setState({value: value })}
            value={this.state.value}
            placeholder={'Escribe tu ' + this.state.attr}
            underlineColorAndroid='#CCC'
          />
        </View>
      )
      button = (
        <TouchableNativeFeedback onPress={ this.editEmail.bind(this) }>
          <View style={{ flex: 1, borderLeftWidth: 1, borderTopWidth: 1, borderColor: '#ccc', padding: 10}}>
            <Text style={{fontSize: 18, textAlign: 'center'}}>OK</Text>
          </View>
        </TouchableNativeFeedback>
      )
    } else if (this.props.attr == "phone") {
      form = (
        <View>
          <TextInput
            keyboardType="numeric"
            autoFocus={true}
            style={{margin: 15, marginBottom: 0, fontSize: 18}}
            onChangeText={(value) => this.setState({value: value.replace(/[^\d]+/,'')})}
            value={this.state.value}
            placeholder={'Escribe tu ' + this.state.attr}
            underlineColorAndroid='#CCC'
          />
        </View>
      )
      button = (
        <TouchableNativeFeedback onPress={ this.editPhone.bind(this) }>
          <View style={{ flex: 1, borderLeftWidth: 1, borderTopWidth: 1, borderColor: '#ccc', padding: 10}}>
            <Text style={{fontSize: 18, textAlign: 'center'}}>OK</Text>
          </View>
        </TouchableNativeFeedback>
      )
    } else if (this.props.attr == "document") {
      form = (
        <View>
          <TextInput
            keyboardType="numeric"
            autoFocus={true}
            style={{margin: 15, marginBottom: 0, fontSize: 18}}
            onChangeText={(value) => this.setState({value: value.replace(/[^\d]+/,'')})}
            value={this.state.value}
            placeholder={'Escribe tu ' + this.state.attr}
            underlineColorAndroid='#CCC'
          />
        </View>
      )
      button = (
        <TouchableNativeFeedback onPress={ this.editDocument.bind(this) }>
          <View style={{ flex: 1, borderLeftWidth: 1, borderTopWidth: 1, borderColor: '#ccc', padding: 10}}>
            <Text style={{fontSize: 18, textAlign: 'center'}}>OK</Text>
          </View>
        </TouchableNativeFeedback>
      )
    }
    return (
      <View style={[utilities.container]}>
        <StatusBar
          backgroundColor="#1e9284"
          barStyle="light-content"
        />
         <ToolbarAndroid
            style={utilities.toolbar}
            title={'Escribe tu ' + this.state.attr}
            titleColor="#FFF"
            elevation={1}/>
            <View style={{flex: 1}}>
              { form }
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <TouchableNativeFeedback onPress={Actions.pop}>
                <View style={{ flex: 1, borderTopWidth: 1, borderColor: '#ccc', padding: 10}}>
                  <Text style={{fontSize: 18, textAlign: 'center'}}>CANCELAR</Text>
                </View>
              </TouchableNativeFeedback>
              { button }
            </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({

});
