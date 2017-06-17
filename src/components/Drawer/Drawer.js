import React, { Component } from 'react';
import { View, Text, DrawerLayoutAndroid, StatusBar } from 'react-native';
import { Actions } from 'react-native-router-flux';
import DrawerLayout from '../../redux/containers/DrawerContainer'

var utilities = require('../../assets/css/utilities');

export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      mode: 'unlocked'
    };
  }
  openDrawer() {
    this.refs['DRAWER'].openDrawer()
  }

  closeDrawer() {
    this.refs['DRAWER'].closeDrawer()
  }

  blockDrawer(session) {
    if (!session) {
      this.setState({ mode: 'locked-closed' });
    } else {
      this.setState({ mode: 'unlocked' });
    }
  }

  render (){
    var navigationView = (
      <DrawerLayout close={ this.closeDrawer.bind(this)} session={ this.blockDrawer.bind(this) } />
    );
    return (
      <DrawerLayoutAndroid
        drawerWidth={300}
        ref={'DRAWER'}
        drawerLockMode = {this.state.mode}
        drawerPosition={DrawerLayoutAndroid.positions.Left}
        ref={'DRAWER'}
        renderNavigationView={() => navigationView}>
        <View style={utilities.container}>
          <StatusBar
            backgroundColor="#1e9284"
            barStyle="light-content"
          />
         { this.props.children }
        </View>
      </DrawerLayoutAndroid>
    );
  }
}
