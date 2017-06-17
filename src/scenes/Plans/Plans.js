import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  Alert,
  TouchableOpacity,
  ListView,
  Image,
  ToolbarAndroid
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/MaterialIcons';
var utilities = require('../../assets/css/utilities');
var styles = require('./plansStyles');

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
    this.setState({
      plans: this.state.plans.cloneWithRows(this.props.plans),
      loaded: true
    })
  }
  loadingData(){
    return(
      <View style={styles.loadingContainer}>
        <Text>Cargando</Text>
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
          source={{uri: item.logo.thumbnail}}
          style={styles.planContainer}
          >
          <View style={styles.planTextContainer} >
            <Text style={styles.planTextPrice}>{this.copFormat(item.price)}</Text>
            <Text style={styles.planTextTitle}>{item.name}</Text>
            <Text style={styles.planTextSubTitle}>({item.expiration_days} paseos en total)</Text>
          </View>
        </Image>
      </View>
      )
  }
  // <ListView
  //   dataSource={this.state.plans}
  //   renderRow={this.renderList.bind(this)}
  // />
  render() {
    var content;
    if (!this.state.loaded) {
      return this.loadingData();
    }
    if (this.props.plans.length === 0) {
      content = (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Image source={require('../../../src/assets/images/dugy_grey.png')} style={{width: 200, height: 200}}/>
          <Text style={[utilities.text_md, {marginTop: 10}]}>Upps, No hay planes disponibles</Text>
        </View>
      );
    } else {
      content = (
        <ListView
          dataSource={this.state.plans}
          renderRow={this.renderList.bind(this)}
        />
      );
    }
    return(
      <View style={[utilities.pb_lg,{flex: 1}]}>
        <Icon.ToolbarAndroid
          style={utilities.toolbar}
          title="Planes"
          titleColor="white"
          navIconName="arrow-back"
          onIconClicked={Actions.pop}
          elevation={1}
        />
        { content }
      </View>
    )
  }
}
