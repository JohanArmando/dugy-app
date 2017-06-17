import React, { Component } from 'react';
import { View, Text, Image, TouchableNativeFeedback, ToolbarAndroid, StatusBar, ListView } from 'react-native';
import { Actions } from 'react-native-router-flux';
var utilities = require('../../assets/css/utilities');
import DrawerLayout from '../../redux/containers/DrawerContainer'
import ActionButton from '../../components/ActionButton/ActionButton'
import CardPet from '../../components/CardPet/CardPet'
import Icon from 'react-native-vector-icons/MaterialIcons';

import PushNotification from 'react-native-push-notification';

export default class Home extends Component {
  constructor() {
    super();
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: this.ds.cloneWithRows([{},{},{}]),
    };
  }
  render (){
    let iconAction = (
      <Icon name="pets" size={30} color="white" />
    );
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    var source = ds.cloneWithRows(this.props.pets)
    if (this.props.pets.length === 0) {
      return (
        <View style={[utilities.pb_lg, { flex: 1}]}>
           <Icon.ToolbarAndroid
             style={utilities.toolbar}
             title="Mis Mascotas"
             titleColor="white"
             navIconName="arrow-back"
             onIconClicked={Actions.pop}
             elevation={1}
           />
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Image source={require('../../../src/assets/images/dugy_grey.png')} style={{width: 200, height: 200}}/>
          <TouchableNativeFeedback onPress={Actions.CreatePet}>
              <Text style={{fontSize: 16, textAlign: 'center', width: '70%'}}>Upps, Todavia no tiene mascota <Text style={{fontWeight: 'bold'}}>tap aqui</Text> para agregar.</Text>
          </TouchableNativeFeedback>
        </View>
        <ActionButton action={Actions.CreatePet} icon={iconAction}/>
        </View>
      );
    }
    return (
      <View style={utilities.container}>
        <StatusBar
          backgroundColor="#1e9284"
          barStyle="light-content"
        />
        <Icon.ToolbarAndroid
          style={utilities.toolbar}
          title="Mis mascotas"
          titleColor="white"
          navIconName="arrow-back"
          onIconClicked={Actions.pop}
          elevation={1}
        />
          <View style={{flex: 1, backgroundColor: '#f9f9f9'}}>
            <ListView
              contentContainerStyle={
                {
                  justifyContent: 'flex-start',
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  paddingBottom: 10
                }
              }
              enableEmptySections={true}
              dataSource={source}
              renderRow={(rowData) => <CardPet pet={rowData} />}/>
            <ActionButton action={Actions.CreatePet} icon={iconAction}/>
          </View>
      </View>
    );
  }
}
