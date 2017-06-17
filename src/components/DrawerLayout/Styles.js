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
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    height:80,
    width: 80,
    borderRadius: 1000,
    marginTop: 45,
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
    borderBottomRightRadius: 1000,
    borderBottomLeftRadius: 1000,
    borderTopRightRadius: 1000,
    borderTopLeftRadius: 1000,

  },
  menuDoggy:{
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center'
  },
  userName:{
    marginLeft: 0,
    marginTop: 25,
    fontSize: 17
  },
  userEmail:{
    marginLeft: 0,
  }
});
