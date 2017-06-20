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
    width: 200,
    height: 200,
    backgroundColor: '#00a79d',
  },
  buttons: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'space-around',
  },
  input: {
    backgroundColor: 'white',
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 15,
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 5,
    marginBottom: 5,
    fontSize: 16
  },
  buttonRegister: {
    backgroundColor: '#1e9284',
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 15,
    borderWidth: 1,
    borderColor: '#1b897c',
    borderRadius: 5,
    marginBottom: 5
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
