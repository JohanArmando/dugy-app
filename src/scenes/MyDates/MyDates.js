import React, { Component } from 'react';
import { View, Text, ToastAndroid, ListView, ActivityIndicator, StyleSheet, ScrollView, ToolbarAndroid, TouchableNativeFeedback, StatusBar, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { updateProfile } from '../../services/authServices';
import ItemListService from '../../components/ItemListService/ItemListService'

var utilities = require('../../assets/css/utilities');



export default class Profile extends Component {


  render (){
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    var source = ds.cloneWithRows(this.props.services);
    if (this.props.services == 0) {
      return (
        <View style={[utilities.pb_lg, { flex: 1}]}>
           <Icon.ToolbarAndroid
             style={utilities.toolbar}
             title="Proximos paseos"
             titleColor="white"
             navIconName="arrow-back"
             onIconClicked={Actions.pop}
             elevation={1}
           />
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Image source={require('../../../src/assets/images/dugy_grey.png')} style={{width: 200, height: 200}}/>
          <TouchableNativeFeedback onPress={Actions.CreateWalk}>
              <Text style={{fontSize: 16, textAlign: 'center', width: '70%'}}>Upps, No tienes agendados paseos <Text style={{fontWeight: 'bold'}}>tap aqui</Text> para agendar.</Text>
          </TouchableNativeFeedback>
        </View>
        </View>
      );
    }
    return (
      <View style={[utilities.container]}>
        <StatusBar
          backgroundColor="#1e9284"
          barStyle="light-content"
        />
        <Icon.ToolbarAndroid
          style={utilities.toolbar}
          title="Proximos paseos"
          titleColor="white"
          navIconName="arrow-back"
          onIconClicked={Actions.pop}
          elevation={1}
        />
        <View style={[utilities.container, {backgroundColor: '#f9f9f9'}]}>
          <ListView
            contentContainerStyle={
              {
                paddingBottom: 10
              }
            }
            enableEmptySections={true}
            dataSource={source}
            renderRow={(rowData) => <ItemListService pets={this.props.pets} service={rowData}/> }/>
        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  avatar: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    borderRadius: 200
  },
  content2: {
    width: 200,
  },
  changeAvatar: {
    width: 60,
    height: 60,
    borderRadius: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 1,
    right: 1
  },
  loading: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  avatarContent: {
    marginTop: 25,
    marginBottom: 25,
    alignItems: 'center'
  },
  colorGrey: {
    backgroundColor: '#f7f7f7'
  },
  data: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff'
  },
  item: {
    fontSize: 16,
    marginLeft: 25,
    paddingTop: 15,
    paddingBottom: 15
  }
});
