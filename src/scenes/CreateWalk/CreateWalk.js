import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  Alert,
  TouchableOpacity,
  ListView,
  TextInput,
  ToolbarAndroid,
  Picker,
  TouchableNativeFeedback,
  ToastAndroid,
  Image,
  ScrollView
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import Form from 'react-native-form';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { AsyncStorage } from 'react-native';
var utilities = require('../../assets/css/utilities');
import CardPet from '../../components/ItemListPet/ItemListPet'

var styles = require('./WalksStyles');

export default class WalksCreate extends Component {
  constructor(){
    super();
    this.state = {
      loadedPets: 0,
      userPets: [],
      availableDays: [],
      availableHours: [],
      SelectedPets: []
    }
  }
  selectPet (pet) {
    var pets = this.state.SelectedPets;
    pets.push(pet.id)
    this.setState({
      SelectedPets: pets
    })
  }
  unselectPet (pet) {
    var pets = this.state.SelectedPets;
    pets = pets.filter(i => {
      if (i != pet.id) {
        return i
      }
    })
    this.setState({
      SelectedPets: pets
    })
  }
  step2 () {
    if (this.state.SelectedPets.length === 0) {
      ToastAndroid.show('Debe seleccionar al menos una mascota', ToastAndroid.SHORT);
    } else {
      Actions.CreateWalk2({pets: this.state.SelectedPets})
    }
  }
  createWalk(){
    this.setState({ loaded: true, logs: '' });
    fetch('http://mrdoggy.ppbox.us/v1/services', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'post',
      body: JSON.stringify({
        service_type_id: this.state.email,
        user_id: this.state.email,
        pet_id: this.state.email,
        address_id: this.state.password
      })
    })
    .then(response => response.json())
    .then(data => {
      this.setState({ loaded: false })
    })
  }
  componentWillMount(){
    this.setState({
      userId: this.props.user.id
    });
    this.getUserPets();
  }


  getUserPets(){
    this.setState({
      userPets: this.props.pets
    })
  }
  render() {
    let userPets  = this.state.userPets;
    let availableDays  = this.state.availableDays;
    let availableHours  = this.state.availableHours;
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    var source = ds.cloneWithRows(this.state.userPets)
    // console.warn(availableHours)
    let userPetsArray = userPets.map(function(e){
      return <Picker.Item key={e.id} label={e.name} value={e.id} style={styles.selectChild}/>;
    })
    let availableDaysArray = availableDays.map(function(e){
      return <Picker.Item key={e.id} label={e.name} value={e.id} style={styles.selectChild}/>;
    })
    let availableHoursArray = availableHours.map(function(e){
      return <Picker.Item key={4} label={e.start_hour} value={5} style={styles.selectChild}/>
    })
    var content;
    if (this.props.pets.length === 0) {
      content = (
        <View style={[utilities.pb_lg, { flex: 1}]}>
           <Icon.ToolbarAndroid
             style={utilities.toolbar}
             title="Seleccionar Mascota"
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
        </View>
      );
    } else {
      content = (
        <View style={[{ flex: 1, backgroundColor: '#f7f7f7'}]}>
           <Icon.ToolbarAndroid
             style={utilities.toolbar}
             title="Seleccionar Mascota"
             titleColor="white"
             navIconName="arrow-back"
             onIconClicked={Actions.pop}
             onActionSelected={this.step2.bind(this)}
             actions={[
               { title: 'Settings', iconName: 'check', iconSize: 30, show: 'always' }
             ]}
             elevation={1}
           />
           <View elevation={2} style={{width: '90%', marginLeft: '5%', marginBottom: 10, padding: 10, marginTop: 10, borderRadius: 5, backgroundColor: '#fff'}}>
           <ListView
             enableEmptySections={true}
             dataSource={source}
             renderRow={(rowData) => <CardPet pet={rowData} select={this.selectPet.bind(this)} unselect={this.unselectPet.bind(this)} />}/>
           </View>
           <View elevation={4} style={{width: '90%', marginLeft: '5%', marginBottom: 10, flex: 1, justifyContent: 'flex-end'}}>
             <TouchableNativeFeedback onPress={this.step2.bind(this)}>
             <View style={{height: 40, backgroundColor: '#1e9284', borderRadius: 5, alignItems: 'center', justifyContent: 'center'}}>
               <Text style={{fontSize: 16, color: '#fff'}}>Confirmar mascotas</Text>
             </View>
             </TouchableNativeFeedback>
           </View>
        </View>
      );
    }
    return content;
  }
}


const onButtonPress = () => {
  Alert.alert('Button has been pressed!');
};
const goToLogin = () => {
  Actions.login();
};
