import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  Alert,
  TouchableNativeFeedback,
  ListView,
  TextInput,
  ToolbarAndroid,
  Picker,
  ToastAndroid,
  StatusBar,
  ActivityIndicator,
  Image,
  ScrollView
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import Form from 'react-native-form';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DatePicker from 'react-native-datepicker';
import { AsyncStorage } from 'react-native';
var utilities = require('../../assets/css/utilities');
import CardPet from '../../components/ItemListPet/ItemListPet'
import {storeService} from '../../services/servicesServices';

var styles = require('./WalksStyles');

export default class WalksCreate extends Component {
  constructor(){
    super();
    this.state = {
      address: '',
      date: '',
      hours: '',
      pets: '',
      loading: false
    }
  }

  walk () {
    if (this.state.address == '') {
      ToastAndroid.show('La Direccion no puede estar vacia', ToastAndroid.SHORT);
    } else if (this.state.date == '') {
      ToastAndroid.show('Debe Proporcionar una fecha', ToastAndroid.SHORT);
    } else if (this.state.hours == '') {
      ToastAndroid.show('debe seleccionar la cantidad de hora del paseo', ToastAndroid.SHORT);
    } else {
      this.setState({
        loading: true
      });
      storeService({
        client: this.props.user.id,
        address: this.state.address,
        date: this.state.date,
        hours: this.state.hours,
        pets: this.props.pets
      })
      .then(service => {
        this.setState({
          loading: false
        });
        console.log(service)
        ToastAndroid.show('Listo! Ya se ha solicitado un paseador', ToastAndroid.SHORT);
        Actions.Home();
      })
      .catch(error => {
        console.log(error);
        this.setState({
          loading: false
        });
        ToastAndroid.show('Upps! No se pudo solicitar paseador', ToastAndroid.SHORT);

      });
    }
  }
  componentWillMount(){
    this.setState({
      userId: this.props.user.id
    });
  }



  render() {
    if (this.state.loading) {
      return (
        <View style={utilities.container}>
          <StatusBar
            backgroundColor="#1e9284"
            barStyle="light-content"
          />
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <ActivityIndicator
                animating={true}
                style={[styles.centering, {height: 80}]}
                size="large"
              />
              <Text style={utilities.text_lg}>Enviando solicitud...</Text>
            </View>
        </View>
      );
    }
    return(
      <View style={[utilities.pb_lg]}>
         <Icon.ToolbarAndroid
           style={utilities.toolbar}
           title="Buscar paseador"
           titleColor="white"
           navIconName="arrow-back"
           onIconClicked={Actions.pop}
           onActionSelected={this.walk.bind(this)}
           actions={[
             { title: 'Settings', iconName: 'check', iconSize: 30, show: 'always' }
           ]}
           elevation={1}
         />
         <ScrollView>

            <View style={[styles.container]}>

              <Text style={styles.label} >¿Donde buscamos tu mascota?</Text>
              <View style={styles.address}>
                <TextInput
                  onChangeText={(address) => this.setState({address: address})}
                  type="TextInput" name="myTextInput" placeholder='Tu Direccion'
                />
              </View>
              <Text style={styles.label}>¿Fecha de tu paseo?</Text>
              <View style={{flexDirection: 'row'}}>
              <DatePicker
                is24Hour={false}
                mode="datetime"
                placeholder="Dia"

                format="YYYY-MM-DD HH:mm"
                minDate={ new Date().toLocaleDateString() }
                maxDate="2018-01-01"
                customStyles={{
                  dateInput: {
                    borderWidth: 0,
                    borderBottomWidth: 0,
                    backgroundColor: '#ccc',
                    color: '#000',
                    width: 20
                  }
                }}
                confirmBtnText="Seleccionar"
                cancelBtnText="Cancelar"
                placeholderStyle={{ color: '#000', textAlign: 'center'}}
                showIcon={false}
                onDateChange={(date) => {this.setState({date: date})}}
              />


              </View>

              <View style={{marginTop: 15}}>
                <Text style={styles.label}>Tiempo de paseo</Text>
                <Picker
                  mode='dropdown'
                  selectedValue={this.state.hours}
                  onValueChange={(hours) => {
                      this.setState({hours: hours})
                    }
                  }
                  >
                  <Picker.Item key={0} label='Seleccionar horas' value={''} style={styles.selectChild}/>
                  <Picker.Item key={0} label='1 Hora' value={1} style={styles.selectChild}/>
                  <Picker.Item key={1} label='2 Horas' value={2} style={styles.selectChild}/>
                  <Picker.Item key={2} label='3 Horas' value={3} style={styles.selectChild}/>
                  <Picker.Item key={3} label='4 Horas' value={4} style={styles.selectChild}/>
                  <Picker.Item key={4} label='5 Horas' value={5} style={styles.selectChild}/>
                </Picker>
              </View>

              <View style={{flex: 1}}></View>
              <TouchableNativeFeedback onPress={this.walk.bind(this)} style={styles.containerButton}>
                <View style={styles.buttonNow}>
                  <Text style={styles.buttonNowText}>Solicitar Ahora</Text>
                </View>
              </TouchableNativeFeedback>
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
