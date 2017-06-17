'use strict';
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';

var ToolbarAndroid = require('ToolbarAndroid');

class Toolbar extends Component {
  render() {
    var navigator = this.props.navigator;
    var visible   = this.props.visible;
    if (visible==1) {
      return (
        <ToolbarAndroid
          title={this.props.title}
          navIcon={require('../../../src/assets/images/menu.png')}
          style = {styles.toolbar}
          titleColor={'white'} 
          onIconClicked={this.props.sidebarRef}/>
      );
    }
    return <View></View>;
  }
  
  _onIconClicked(){
    this.props.sidebarRef.refs['DRAWER'].openDrawer();
  } 
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  navIcon:{
    height: 50
  },
  toolbar: {
    height: 56,
    backgroundColor: '#08AE9E',
    alignItems: 'center'
  }  
});

module.exports = Toolbar;