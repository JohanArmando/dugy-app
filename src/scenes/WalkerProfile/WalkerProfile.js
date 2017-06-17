import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/MaterialIcons';
var utilities = require('../../assets/css/utilities');

export default class PlanIndex extends Component {

  render() {

    return(
      <View style={[utilities.pb_lg,{flex: 1}]}>
        <Icon.ToolbarAndroid
          style={utilities.toolbar}
          title="Perfil Paseador"
          titleColor="white"
          navIconName="arrow-back"
          onIconClicked={Actions.pop}
          elevation={1}
        />
        <Text>Perfil Paseador</Text>
      </View>
    )
  }
}
