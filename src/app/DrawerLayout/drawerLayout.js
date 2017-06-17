'use strict';

var React = require('react-native');
var { StyleSheet } = React;

module.exports = StyleSheet.create({
  menuBack:{
    width: 300,
    height: 180
  },
  container: {
    flex: 1,
    alignItems: 'stretch',

  },
  menuPrincipal: {
    backgroundColor: '#00a79d',
    height: 180,
    justifyContent: 'center',

  },
  avatar: {
    height:82,
    width: 82,
    borderRadius: 82/2,
    marginTop: 65,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center'
  },
  menuItem: {
    flexDirection: 'row',
    height: 40, 
    alignItems: 'center',
    marginLeft: 15,
  },
  img: {
    width: 75,
    height: 75,
    resizeMode: 'contain',
    borderBottomRightRadius: 100,
    borderBottomLeftRadius: 100,
    borderTopRightRadius: 100,
    borderTopLeftRadius: 100,

  },
  menuDoggy:{
    width: 100,
    height: 100,
    resizeMode: 'contain',
    alignItems: 'center',
    justifyContent: 'center'
  },
  userName:{
    marginLeft: 12,
    marginTop: 30,
    fontSize: 11
  },
  userEmail:{
    marginLeft: 12,
  }
});