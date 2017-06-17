'use strict';

var React = require('react-native');

var { StyleSheet } = React;

module.exports = StyleSheet.create({
  container: {
  	paddingTop:10,
    padding: 25
  },
  label:{
  	padding:5,
  	fontSize:15,
  	color:'#000000',
  	fontFamily: 'roboto-thin'
  },
  select:{
  	padding:10,
  	width:280
  },
  selectChild:{
  	fontSize:100
  },
  address:{
  	paddingLeft:1
  },
  selectHours:{
  	width:130
  },
  doggyIcon:{
  	width:100,
  	height:120
  },
  iconContainer:{
  	paddingTop:10,
  	alignItems:'center',
  	flexDirection: 'row'
  },
  buttonNow:{
  	backgroundColor: '#08ae9e',
  },
  buttonNowText:{
  	color:'#ffffff',
  	textAlign:'center',
  	padding:10
  },
  containerButton:{
  	paddingTop: 20
  },
  dateTimePicker:{
  	marginLeft: 6,
  	alignItems:'center',
  	flexDirection: 'row'
  }

});
