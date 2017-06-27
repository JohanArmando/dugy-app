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
  ToolbarAndroid,
  TouchableNativeFeedback
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
      <View elevation={2} style={{ margin: 5, marginBottom: 0, borderWidth: 1, borderColor: 'rgba(0,0,0,0.1)'}}>
        <Image
          source={{uri: item.logo.original}}
          style={{ width: '100%', height: 150, resizeMode: 'stretch'}}
          >

        </Image>
        <View style={{margin: 20}} >
          <Text style={{fontSize: 22, color: '#1e9284', fontWeight: '100'}}>{item.name.toUpperCase()}</Text>
          <View style={{marginTop: 5, flexDirection: 'row'}}>
            <Text style={{color: '#1e9284'}}><Text style={{fontSize: 36, fontWeight: 'bold'}}>${item.price}</Text><Text style={{fontSize: 18}}> / mensual</Text></Text>
          </View>
        </View>
        <View style={{paddingLeft: 20, paddingRight: 20, paddingBottom: 20, borderTopWidth: 1, borderColor: 'rgba(0,0,0,0.1)' }}>
          <Text style={{fontSize: 18, marginTop: 15}}><Text style={{fontWeight: 'bold'}}>{item.expiration_days}</Text> paseos mensuales</Text>

          <View style={{justifyContent: 'center', marginTop: 15}}>
            <TouchableNativeFeedback onPress={() => { Actions.MethodPays({plan: item})}}>
              <View elevation={2} style={{backgroundColor: '#1e9284',justifyContent: 'center', alignItems: 'center', height: 35, width: 130, borderRadius: 5}}>
                <Text style={{color: 'white', fontSize: 16}}>COMPRAR</Text>
              </View>
            </TouchableNativeFeedback>
          </View>
        </View>
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
          contentContainerStyle={
            {
              paddingBottom: 10
            }
          }
          dataSource={this.state.plans}
          renderRow={this.renderList.bind(this)}
        />
      );
    }
    return(
      <View style={[{flex: 1}]}>
        <Icon.ToolbarAndroid
          style={utilities.toolbar}
          title="Planes"
          titleColor="white"
          navIconName="arrow-back"
          onIconClicked={Actions.pop}
          elevation={2}
        />
        { content }
      </View>
    )
  }
}
