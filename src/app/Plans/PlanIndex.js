import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  Alert,
  TouchableOpacity,
  ListView,
  Image
} from 'react-native';
import { Actions } from 'react-native-router-flux';

var styles = require('./PlanIndexStyle');

export default class PlanIndex extends Component {
  constructor(){
    super();
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
    plans: new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2
    }),
    loaded: false
    };
  }
  componentWillMount(){
    fetch('http://mrdoggy.ppbox.us/v1/plans', {
      method: 'get'
    })
    .then(response => response.json())
    .then(data  => data)
    .then(plan => {
      this.setState({
        plans: this.state.plans.cloneWithRows(plan),
        loaded: true
      })
    })
  }
  loadingData(){
    return(
      <View style={styles.loadingContainer}>
        <Image source={require('../../../src/assets/images/cargardomrdoggy.gif')} style={{width: 280, height: 280}} />
      </View>
      )
    }
  copFormat(item){
    item = '$' + item
    return item
  }
  renderList(item){
    return(
      <View style={styles.backContainer}>
        <Image
          source={{uri: item.logo}}
          style={styles.planContainer}
          >
          <View style={styles.planTextContainer} >
            <Text style={styles.planTextPrice}>{this.copFormat(item.price)}</Text>
            <Text style={styles.planTextTitle}>{item.name}</Text>
            <Text style={styles.planTextSubTitle}>({item.services} paseos en total)</Text>
          </View>
        </Image>
      </View>
      )
  }
  render() {
    if (!this.state.loaded) {
      return this.loadingData();
    }
    return(
      <ListView
        dataSource={this.state.plans}
        renderRow={this.renderList.bind(this)}
      />
    )
  }
}

const onButtonPress = () => {
  Alert.alert('Button has been pressed!');
};
const goToLogin = () => {
  Actions.login();
};
