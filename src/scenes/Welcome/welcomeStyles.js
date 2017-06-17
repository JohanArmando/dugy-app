'use strict';

var React = require('react-native');

var { StyleSheet } = React;

module.exports = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#00a79d',
  },
  welcome: {
    color: 'white',
    fontSize: 15
  },
  slogan: {
    alignItems: 'center',
    width: '80%'
  },
  sloganText:{
    textAlign: 'center',
    color:'white'
  },
  name: {
    fontWeight: 'bold',
  },
  logo: {
    width: 220,
    height: 220,
    backgroundColor: '#00a79d',
  },
  buttons: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'space-around',
  },
  button: {
    textAlign: 'center',
    color: '#2E9298',
    fontSize: 17,
  },
  whiteButton:{
    margin: 5,
    borderRadius: 10,
    paddingTop: 10,
    paddingBottom: 10,
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: '#FFFFFF',
    width: 200
  }

});
