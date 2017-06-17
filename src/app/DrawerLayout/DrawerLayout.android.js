import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  Alert,
  TouchableOpacity,
  DrawerLayoutAndroid
} from 'react-native';

import { Router, Scene, Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Toolbar from './../Toolbar/Toolbar';
import Home from './../Home/Home';
import { AsyncStorage } from 'react-native';

var nativeImageSource = require('nativeImageSource');
var styles = require('./drawerLayout');
var utilities = require('./../../assets/css/utilities');

export default class DrawerLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toolbar: 1,
      formShow: false
    };
  }
  showForm(){

  }
  componentWillMount(){
    AsyncStorage.getItem("current_user").then((value) => {
      this.setState({
        userPic: JSON.parse(value).avatar,
        email: JSON.parse(value).email,
        userName: JSON.parse(value).name,
        userLastName: JSON.parse(value).last_name
      })
    }).done();
  }
  render() {
    let inputForm = null;
    if (this.state.formShow) {
      let inputForm = (<input style={{ visible: hidden }}/>);
    }



    var navigationView = (
      <View style={styles.container} >
        <View style={styles.menuPrincipal} >
          <Image source={require('../../../src/assets/images/Home/menuBack.png')} style={styles.menuBack} >
            <View style={[utilities.ml]}>
              <Image source={require('../../../src/assets/images/Home/backDoggy.png')} style={styles.menuDoggy} >
                <View style={[styles.avatar]}>
                  <Image style={styles.img} source={{uri: this.state.userPic}} />
                </View>
              </Image>
              <Text style={[utilities.mt, utilities.bold, styles.userName]}>{this.state.userName} {this.state.userLastName}</Text>
              <Text style={[styles.userEmail]}>{this.state.email}</Text>
            </View>
          </Image>
        </View>
        <View style={[styles.menuItem, utilities.mt]}>
          <Icon name="account-box" size={30} color="gray" />
          <Text style={utilities.ml} >Perfil</Text>
        </View>
        {inputForm}
        <View style={styles.menuItem}>
          <Icon name="star" size={30} color="gray" />
          <Text style={utilities.ml} >Mis mascotas</Text>
        </View>
        <View style={styles.menuItem}>
          <Icon name="payment" size={30} color="gray" />
          <Text style={utilities.ml} >Pagos</Text>
        </View>
        <View style={[utilities.divider, utilities.mt]}></View>
        <TouchableOpacity onPress={this.UserLogout.bind(this)}>
          <View style={[styles.menuItem, utilities.mt]}>
            <Icon name="close" size={30} color="gray" />
            <Text style={utilities.ml} >Cerrar Sesion</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
    return (
      <DrawerLayoutAndroid
        ref={'DRAWER'}
        drawerWidth={300}
        drawerPosition={DrawerLayoutAndroid.positions.Left}
        renderNavigationView={() => navigationView}
        open={this.state.drawer}>
        {this.props.children}
        <Toolbar
          visible={this.state.toolbar}
          style={styles.toolbar}
          title={'Mr. Doggy'}
          sidebarRef={()=>this._setDrawer()}
          navIcon={nativeImageSource({
              android: 'ic_menu_black_24dp',
              width: 18,
              height: 18
          })}
        />
        <Home/>
      </DrawerLayoutAndroid>
    )
  }

  _setDrawer() {
    this.refs['DRAWER'].openDrawer();
  }
  UserLogout(){
    this.setState({ toolbar: 0})
    this.refs['DRAWER'].closeDrawer();
    AsyncStorage.removeItem('current_user');
    Actions.App();
  }
}
