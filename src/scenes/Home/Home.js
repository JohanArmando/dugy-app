import React, { Component } from 'react';
import { View, Text, DrawerLayoutAndroid, Image, ScrollView, ActivityIndicator, ToolbarAndroid, TouchableNativeFeedback, StatusBar } from 'react-native';
import { Actions } from 'react-native-router-flux';
import DrawerLayout from '../../redux/containers/DrawerContainer'
import { getPets } from '../../services/petsServices'
import { getSizes } from '../../services/sizesServices'
import { getRaces } from '../../services/racesServices'
import { getPlans } from '../../services/plansServices'
import { getServices } from '../../services/servicesServices'
import Icon from 'react-native-vector-icons/MaterialIcons';
var styles = require('./homeStyles');
var utilities = require('../../assets/css/utilities');
import ItemListService from '../../components/ItemListService/ItemListService'
import Dimensions from 'Dimensions';
const {width, height} = Dimensions.get('window');


import PushNotification from 'react-native-push-notification';

export default class Home extends Component {
  constructor({ populatePets, populateRaces, populateSizes, populatePlans, populateServices }) {
    super();
    this.populatePets = populatePets;
    this.populateRaces = populateRaces;
    this.populateSizes = populateSizes;
    this.populatePlans = populatePlans;
    this.populateServices = populateServices;
    this.state = {
      loadingServices: true,
      mode: 'unlocked'
    };
  }
  blockDrawer(session) {
    if (!session) {
      this.setState({ mode: 'locked-closed' });
    } else {
      this.setState({ mode: 'unlocked' });
    }
  }
  componentWillMount(){
    getPets(this.props.user.id)
    .then((data) => {
      this.populatePets(data);
    })
    .catch(data => {
      console.log(data)
    });
    getSizes()
    .then((data) => {
      this.populateSizes(data);
    })
    .catch(data => {
      console.log(data)
    });
    getRaces()
    .then((data) => {
      this.populateRaces(data);
    })
    .catch(data => {
      console.log(data)
    });
    getPlans()
    .then((data) => {
      this.populatePlans(data);
    })
    .catch(data => {
      console.log(data)
    });
    getServices(this.props.user.id)
    .then((data) => {
      this.setState({loadingServices: false});
      this.populateServices(data);
    })
    .catch(data => {
      console.log(data)
    });
  }
  openDrawer() {
    this.refs['DRAWER'].openDrawer()
  }
  closeDrawer() {
    this.refs['DRAWER'].closeDrawer()
  }
  render (){
    var navigationView = (
      <DrawerLayout close={this.closeDrawer.bind(this)} session={ this.blockDrawer.bind(this) }/>
    );
    var NextWalks;
    if (this.state.loadingServices) {
      NextWalks = (
        <View style={{justifyContent: 'center', alignItems: 'center', flex: 1, paddingBottom: 15}}>
          <ActivityIndicator
            animating={true}
            style={[{height: 80}]}
            size="large"
          />
        </View>
      );
    } else if (this.props.services.length != 0) {
      NextWalks = (<ItemListService pets={this.props.pets} service={this.props.services[0]}/>);
      // NextWalks = (
      //   <View style={{padding: 15, flex: 1, flexDirection: 'row', alignItems: 'center'}}>
      //     <View style={{width: 75, height: 75, backgroundColor: '#1e9284', borderRadius: 50}}>
      //     </View>
      //     <View style={{marginLeft: 15}}>
      //       <Text style={{fontSize: 18, fontWeight: 'bold', color: '#144163'}}>Pochie</Text>
      //       <View style={{flexDirection: 'row'}}>
      //         <Icon name="directions-walk" size={20} color="#144163" />
      //         <Text style={{fontSize: 16, color: '#383838',  marginLeft: 10}}>Alexandra</Text>
      //       </View>
      //       <View style={{flexDirection: 'row'}}>
      //         <Icon name="home" size={20} color="#144163" />
      //         <Text style={{fontSize: 16, color: '#383838',  marginLeft: 10}}>Car 58 calle 182</Text>
      //       </View>
      //       <View style={{flexDirection: 'row'}}>
      //         <Icon name="date-range" size={20} color="#144163" />
      //         <Text style={{fontSize: 16, color: '#383838', marginLeft: 10}}>7 julio / 2:00 - 4:00</Text>
      //       </View>
      //     </View>
      //   </View>
      // );
    } else {
      NextWalks = (
        <View style={{justifyContent: 'center', alignItems: 'center', flex: 1, paddingBottom: 15}}>
          <Text style={{textAlign: 'center', fontSize: 16, marginTop: 5, color: '#1e9284'}}>No tienes paseos agendados</Text>
        </View>
      );
    }
    return (
      <DrawerLayoutAndroid
        drawerWidth={300}
        ref={'DRAWER'}
        drawerPosition={DrawerLayoutAndroid.positions.Left}
        ref={'DRAWER'}
        drawerLockMode = {this.state.mode}
        renderNavigationView={() => navigationView}>
        <View style={utilities.container}>
          <StatusBar
            backgroundColor="#1e9284"
            barStyle="light-content"
          />
          <Icon.ToolbarAndroid
            style={utilities.toolbar}
            title="Dugy"
            titleColor="white"
            navIconName="menu"
            onIconClicked={this.openDrawer.bind(this)}
            elevation={1}
          />
          <ScrollView>
          <View style={{justifyContent: 'flex-start', minHeight: height-StatusBar.currentHeight - 56, backgroundColor: '#f7f7f7'}}>
            <View elevation={1} style={{flex: 1,backgroundColor: '#fff', paddingBottom: 10, paddingLeft: 10, paddingRight: 10}}>
              <Text style={{textAlign: 'center', fontSize: 18, marginTop: 5, color: '#1e9284', fontWeight: 'bold'}}>Tu proximo paseo</Text>
              {NextWalks}
            </View>
            <Image source={require('../../../src/assets/images/dugy_home.png')} style={[styles.containerCenter, {justifyContent: 'flex-end', flex: 1, width: '100%',height: 300, resizeMode: 'stretch'}]}>

            </Image>
            </View>
            </ScrollView>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20, position: 'absolute', bottom: 10, left: 0, right: 0, justifyContent: 'center'}}>
              <TouchableNativeFeedback onPress={Actions.MyDates}>
                <View style={{ padding: 10, width: 120, backgroundColor: '#144163',borderBottomLeftRadius: 10, borderTopLeftRadius: 10}}>
                  <Text style={[utilities.text_md, utilities.text_primary, {textAlign: 'center', fontWeight: 'bold', color: 'white'}]}>Mis paseos</Text>
                </View>
              </TouchableNativeFeedback>
              <TouchableNativeFeedback onPress={Actions.CreateWalk}>
                <View elevation={1} style={[ utilities.color_primary, {width: 75, height: 75,borderRadius: 10, borderWidth: 2, borderColor: 'white', justifyContent: 'center', alignItems: 'center'}]}>
                  <Image source={require('../../../src/assets/images/walk.png')} style={{width: 45, height: 40}} />
                </View>
              </TouchableNativeFeedback>
              <TouchableNativeFeedback onPress={Actions.Plans}>
                <View style={{ padding: 10, backgroundColor: '#FF9800', width: 120,borderBottomRightRadius: 10, borderTopRightRadius: 10}}>
                  <Text style={[utilities.text_md, {textAlign: 'center', color: 'white', fontWeight: 'bold'}]}>Planes Dugy</Text>
                </View>
              </TouchableNativeFeedback>
            </View>
        </View>
      </DrawerLayoutAndroid>
    );
  }
}
