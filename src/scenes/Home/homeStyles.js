'use strict';

var React = require('react-native');

var { StyleSheet } = React;

module.exports = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    width: null,
    height: 500,
    // resizeMode: 'stretch'
  },
  containerMenu:{
    marginTop: 0,
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexDirection: 'row'
  },
  mtl: {
    marginTop: 50
  },
  backgroundImage:{
  	flex: 1,
    width: null,
    height: null
  },
  logoHeader:{
    marginTop: 25,
  	width: 85,
    height: 85,
  },
  containerActions:{
  	padding: 3,
  },
  containerActionsHeader:{
  	backgroundColor: 'gray',
  	textAlign:'center',
  	paddingTop:  0,
  	fontSize: 20,
  	color: '#fff'
  },
  buttonPrimary: {
    borderWidth: 2,
    borderColor: '#08AE9E',
    borderRadius: 10,
    alignItems: 'center',
    padding: 15,
    marginTop: 5,
    width: '65%',
    marginBottom: 5
  },
  containerCenter: {
    alignItems: 'center'
  },
  containerActionsImages:{
  	backgroundColor: '#fff',
  	// resizeMode: 'stretch',
    // borderBottomRightRadius:10,
    // borderBottomLeftRadius:10,
    borderWidth: 0,
  	width: 160,
  	height: 180
  },
  containerSingleImage:{
    justifyContent: 'space-around',
    alignItems: 'center',
    resizeMode: 'stretch',
	  width: 125,
	  marginLeft: 20,
  	height: 150
  },
  containerPlans:{
    marginTop: -60,
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexDirection: 'row',
    backgroundColor: '#ffffff'
  },
  containerPlansGreen:{
    width: 310,
    margin: 10,
    flexDirection: 'row',
    backgroundColor:'#21a79d'
  },
  containerPlansText:{
    color: '#fff',
    marginTop: 60,
    fontWeight: 'bold',
    fontSize: 15,
    marginLeft: 20

  }

});
