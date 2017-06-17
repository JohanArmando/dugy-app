'use strict';

var React = require('react-native');

var { StyleSheet } = React;

module.exports = StyleSheet.create({

  container: {
      flex: 1,
    },
    containerApp:{
      marginTop: 70,
      justifyContent: 'center',
      alignItems: 'center'
    },
    inputs: {
      margin: 40
    },
    button: {
      marginTop: 150,
    },
    buttons: {
      marginTop: 10,
      flexDirection: 'row',
      alignSelf: 'stretch',
      justifyContent: 'space-around',
    },
    mb: {
      marginBottom: 20
    },
    logo:{
      width: 100,
      height: 140
    },
    loginMain:{
      backgroundColor: '#21a79d'
    },
    loginText:{
      textAlign: 'center',
      padding: 8,
      color: '#ffffff'
    },
    loginFB:{
      backgroundColor: '#4d6fa9',
      marginRight: 4
    },
    loginFBView:{
      width: 130,
      alignItems: 'center'
    },
    loginGoogle:{
      backgroundColor: '#dd4b39',
      marginLeft: 4
    },
    loginGoogleView:{
      width: 130,
      alignItems: 'center'
    },
    loaingContainer:{
      alignItems: 'center',
      marginTop: 10
    },
    loadingContainerText:{
      textAlign: 'center',
      fontWeight: 'bold'
    },
    logs:{
      marginTop: 20
    }
});
