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
  Image,
  ScrollView
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import Form from 'react-native-form';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { AsyncStorage } from 'react-native';
var utilities = require('../../assets/css/utilities');

var styles = require('./WalksStyles');

export default class WalksCreate extends Component {
  constructor(){
    super();
    this.state = {
      loadedPets: 0,
      userPets: [],
      availableDays: [],
      availableHours: []
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

  getAvailableDays(){
    fetch('http://mrdoggy.ppbox.us/v1/services/available/days', {
      method: 'get'
    })
    .then(response => response.json())
    .then(data  => data)
    .then(days => {
      this.setState({
        availableDays: days,
      })
      this.getAvailableHours()
    })
  }
  getAvailableHours(){
    let userSelectedDay     =  this.state.userSelectedDay;
    let availableDays       =  this.state.availableDays;
    let hours        = [];
    availableDays.map(function(e){
      if (userSelectedDay == e.id) {
        hours  = e.available_hours
      }
    })
    this.setState({
      availableHours: hours
    })
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
    return(
      <View style={utilities.pb_lg}>
         <Icon.ToolbarAndroid
           style={utilities.toolbar}
           title="Solicitar paseador"
           titleColor="white"
           navIconName="arrow-back"
           onIconClicked={Actions.pop}
           actions={[
             { title: 'Settings', iconName: 'check', iconSize: 30, show: 'always' }
           ]}
           elevation={1}
         />
         <ScrollView>

            <View style={styles.container}>
              <Text style={styles.label}>Elige la mascota que deseas pasear</Text>
              <Picker
                style={styles.select}
                mode='dialog'
                selectedValue={this.state.userSelectedPets}
                onValueChange={(lang) => {
                    this.setState({userSelectedPets: lang})
                  }
                }
                >
                {userPetsArray}
              </Picker>
              <Text style={styles.label} >¿Donde buscamos tu mascota?</Text>
              <View style={styles.address}>
                <TextInput  type="TextInput" name="myTextInput" placeholder='Tu Direccion'  />
              </View>
              <Text style={styles.label}>¿Fecha de tu paseo?</Text>
              <View style={styles.dateTimePicker}>
                <Text>Dia</Text>
                <Picker
                  style={{width: 140}}
                  mode='dialog'
                  selectedValue={this.state.userSelectedDay}
                  onValueChange={(lang) => {
                      this.setState({
                        userSelectedDay: lang,
                      })
                      this.getAvailableHours()
                    }
                  }
                  >
                  {availableDaysArray}
                </Picker>
                <Text>Hora</Text>
                <Picker
                  style={{width: 100}}
                  mode='dialog'
                  selectedValue={this.state.userHourPick}
                  onValueChange={(lang) => {
                      this.setState({userHourPick: lang})
                    }
                  }
                  >
                  {availableHoursArray}
                </Picker>
              </View>
              <Text style={styles.label}>Tiempo de paseo</Text>
              <Picker
                style={styles.selectHours}
                mode='dropdown'
                selectedValue={this.state.userSelectedTime}
                onValueChange={(lang) => {
                    this.setState({userSelectedTime: lang})
                  }
                }
                >
                <Picker.Item key={0} label='1 Hora' value={1} style={styles.selectChild}/>
                <Picker.Item key={1} label='2 Horas' value={2} style={styles.selectChild}/>
                <Picker.Item key={2} label='3 Horas' value={3} style={styles.selectChild}/>
                <Picker.Item key={3} label='4 Horas' value={4} style={styles.selectChild}/>
                <Picker.Item key={4} label='5 Horas' value={5} style={styles.selectChild}/>
              </Picker>
              <View style={styles.iconContainer}>
                <Image source={require('../../../src/assets/images/Home/mrdoggy_planes.png')} style={styles.doggyIcon} ></Image>
                <Text>Tu mascota te lo agradecerá</Text>
              </View>
              <TouchableOpacity onPress={Actions.PlanIndex} style={styles.containerButton}>
                <View style={styles.buttonNow}>
                  <Text style={styles.buttonNowText}>Solicitar Ahora</Text>
                </View>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>

    )
  }
}


const onButtonPress = () => {
  Alert.alert('Button has been pressed!');
};
const goToLogin = () => {
  Actions.login();
};
