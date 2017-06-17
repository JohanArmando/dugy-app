'use strict';

var React = require('react-native');

var { StyleSheet } = React;

module.exports = StyleSheet.create({
  planTextContainer:{
    marginTop: 10
  },
  planContainer:{
    margin: 5,
    height: 180,

  },
  planTextPrice: {
    fontSize: 25,
    textAlign: 'center',
    color: '#000000',
    fontWeight: 'bold'
  },
  planTextTitle: {
    fontSize: 15,
    textAlign: 'center',
    color: '#000000'
  },
  planTextSubTitle:{
    fontSize: 14,
    textAlign: 'center',
  },
  backContainer:{
    borderBottomColor: '#f2f2f2',
    borderBottomWidth:1
  },
  loadingContainer:{
    flex:1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center'
  }



});
