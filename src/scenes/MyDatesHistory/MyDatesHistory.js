import React, { Component } from 'react';
import { View, Text, ToastAndroid, ListView, ActivityIndicator, StyleSheet, ScrollView, ToolbarAndroid, TouchableNativeFeedback, StatusBar, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ItemListService from '../../components/ItemListService/ItemListService'
import { getServicesHistory } from '../../services/servicesServices'
var utilities = require('../../assets/css/utilities');



export default class Profile extends Component {
  constructor({ populateServicesHistory }) {
    super();
    this.populateServicesHistory = populateServicesHistory;
    this.state = {
      loadingServices: true
    };
  }
  componentWillMount(){
    getServicesHistory(this.props.user.id)
    .then((data) => {
      this.populateServicesHistory(data);
      this.setState({
        loadingServices: false
      });
    })
    .catch(data => {
      console.log(data)
    });
  }
  render (){
    if (this.state.loadingServices) {
      return (
        <View style={utilities.container}>
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#00a79d'}}>
              <ActivityIndicator
                animating={true}
                style={[styles.centering, {height: 80}]}
                size="large"
                color="white"
              />
              <Text style={[{color: 'white'},utilities.text_lg]}>Cargando...</Text>
            </View>
        </View>
      );
    }
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    var source = ds.cloneWithRows(this.props.services);
    if (this.props.services == 0) {
      return (
        <View style={[utilities.pb_lg, { flex: 1}]}>
           <Icon.ToolbarAndroid
             style={utilities.toolbar}
             title="Historial de paseos"
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
          title="Historial de paseos"
          titleColor="white"
          navIconName="arrow-back"
          onIconClicked={Actions.pop}
          elevation={1}
        />
        <View style={[utilities.container, styles.colorGrey]}>
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
    backgroundColor: '#f1f1f1'
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
