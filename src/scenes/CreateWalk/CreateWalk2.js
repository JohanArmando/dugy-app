import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View,
  ToastAndroid,
  ActivityIndicator,
  Image,
} from 'react-native';
import DatePicker from 'react-native-datepicker';
import {storeService} from '../../services/servicesServices';
import moment from 'moment';
require('moment/locale/es.js');
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
var {GooglePlacesAutocomplete} = require('react-native-google-places-autocomplete');
const homePlace = {description: 'Mi casa', geometry: { location: { lat: 48.8152937, lng: 2.4597668 } }};
const workPlace = {description: 'Trabajo', geometry: { location: { lat: 48.8496818, lng: 2.2940881 } }};
import { Actions } from 'react-native-router-flux';
import AvatarPet from '../../components/ItemListService/avatarPet'
import Icon from 'react-native-vector-icons/MaterialIcons';
var utilities = require('../../assets/css/utilities');
// <MapView
//   provider={PROVIDER_GOOGLE}
//   style={{flex: 1, width: '100%'}}
//   initialRegion={{
//     latitude: 37.78825,
//     longitude: -122.4324,
//     latitudeDelta: 0.0922,
//     longitudeDelta: 0.0421,
//   }}
// />

var mapStyle = [
    {
        featureType: "water",
        elementType: "geometry",
        stylers: [
            {
                color: "#1e9284"
            },
            {
                lightness: 17
            }
        ]
    },
    {
        featureType: "road.highway",
        elementType: "geometry.fill",
        stylers: [
            {
                color: "#dedede"
            },
            {
                lightness: 17
            }
        ]
    },
    {
        featureType: "road.highway",
        elementType: "geometry.stroke",
        stylers: [
            {
                color: "#dedede"
            },
            {
                lightness: 29
            },
            {
                weight: 0.2
            }
        ]
    },
    {
        featureType: "road.arterial",
        elementType: "geometry",
        stylers: [
            {
                color: "#dedede"
            },
            {
                lightness: 18
            }
        ]
    },
    {
        featureType: "road.local",
        elementType: "geometry",
        stylers: [
            {
                color: "#ffffff"
            },
            {
                lightness: 16
            }
        ]
    },
    {
        featureType: "poi",
        elementType: "geometry",
        stylers: [
            {
                color: "#f1f1f1"
            },
            {
                lightness: 21
            }
        ]
    },
    {
        elementType: "labels.text.stroke",
        stylers: [
            {
                visibility: "on"
            },
            {
                color: "#ffffff"
            },
            {
                lightness: 16
            }
        ]
    },
    {
        elementType: "labels.text.fill",
        stylers: [
            {
                saturation: 36
            },
            {
                color: "#424242"
            },
            {
                lightness: 40
            }
        ]
    },
    {
        elementType: "labels.icon",
        stylers: [
            {
                visibility: "off"
            }
        ]
    },
    {
        featureType: "transit",
        elementType: "geometry",
        stylers: [
            {
                color: "#f2f2f2"
            },
            {
                lightness: 19
            }
        ]
    },
    {
        featureType: "administrative",
        elementType: "geometry.fill",
        stylers: [
            {
                color: "#fefefe"
            },
            {
                lightness: 20
            }
        ]
    },
    {
        featureType: "administrative",
        elementType: "geometry.stroke",
        stylers: [
            {
               color: "#fefefe"
            },
            {
                lightness: 17
            },
            {
                weight: 1.2
            }
        ]
    }
];

export default class ServiceDetails extends Component {
  constructor() {
    super();
    this.state = {
      latitude: 4.710988599999999,
      longitude: -74.072092,
      address: '',
      addressSelect: false,
      date: '',
      loading: false
    };
  }
  selectAddress () {
    if (this.state.address == '') {
      ToastAndroid.show('Debe proporcinar la Direccion', ToastAndroid.SHORT);
    } else {
      this.setState({
        addressSelect: true
      });
    }
  }

  confirmWalk () {
    if (this.state.date == '') {
      ToastAndroid.show('Debe proporcinar la La fecha', ToastAndroid.SHORT);
    } else {
      this.setState({
        loading: true
      });
      storeService({
        client: this.props.user.id,
        address: this.state.address,
        date: moment.utc(moment(this.state.date).format()).format(),
        hours: 1,
        pets: this.props.pets,
        latitude: this.state.latitude,
        longitude: this.state.longitude,
        iconLoaded: false
      })
      .then(service => {
        ToastAndroid.show('Listo! Ya se ha solicitado un paseador', ToastAndroid.SHORT);
        Actions.Home({type: 'reset'});
      })
      .catch(error => {
        console.log(error);
        this.setState({
          loading: false
        });
        ToastAndroid.show('Upps! No se pudo solicitar paseador', ToastAndroid.SHORT);

      });
      // console.log({
      //   client: this.props.user.id,
      //   address: this.state.address,
      //   date: moment.utc(moment(this.state.date).format()).format(),
      //   hours: 1,
      //   pets: this.props.pets,
      //   latitude: this.state.latitude,
      //   longitude: this.state.longitude
      // });
    }
  }

  render() {
    let contentMap;
    let source = require('../../../src/assets/images/pin_1.png');
    if (!this.state.iconLoaded) {
      contentMap = (
        <Image
          style={{
            width: 40,
            height: 58,
            opacity: 0
          }}
          source={source}
           onLoadEnd={() => {this.setState({iconLoaded: true});}}
         />
      );
    } else {
      contentMap = (
        <MapView
          customMapStyle={mapStyle}
          provider={PROVIDER_GOOGLE}
          style={{flex: 1, width: '100%'}}
          region={{
            latitude: this.state.latitude,
            longitude: this.state.longitude,
            latitudeDelta: 0.00500,
            longitudeDelta: 0.00500,
          }}
        >
        <MapView.Marker

          draggable
          onDragEnd={(e) => {
            this.setState({ latitude: e.nativeEvent.coordinate.latitude, longitude: e.nativeEvent.coordinate.longitude })
          }}
          coordinate={{
            latitude: this.state.latitude,
            longitude: this.state.longitude,
          }}>
          <Image
            style={{
              width: 40,
              height: 58
            }}
             source={source}
           />
           </MapView.Marker>
        </MapView>
      );
    }
    if (this.state.loading) {
      return (
        <View style={utilities.container}>
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <ActivityIndicator
                animating={true}
                style={[{height: 80}]}
                size="large"
              />
              <Text style={utilities.text_lg}>Enviando solicitud...</Text>
            </View>
        </View>
      );
    }
    let button;
    let content;
    let datestring;
    let datestringbuttom;
    if (this.state.addressSelect == false) {
      content = (
        <View elevation={3} style={
          {
            position: 'absolute',
            top: 70,
            right: '5%',
            width: '90%',
            borderRadius: 5,
            backgroundColor: 'white'
          }
        }>
          <GooglePlacesAutocomplete
          placeholder='Direccion'
          minLength={2}
          autoFocus={false}
          returnKeyType={'search'}

          listViewDisplayed='auto'
          fetchDetails={true}
          renderDescription={(row) => row.description}
          onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
            console.log('data', data);
            if (details != null) {
              this.setState({
                latitude: details.geometry.location.lat,
                longitude: details.geometry.location.lng,
                address: data.description
              });
            }
            console.log(this.state);
          }}
          getDefaultValue={() => {
            return ''; // text input default value
          }}
          query={{
            // available options: https://developers.google.com/places/web-service/autocomplete
            key: 'AIzaSyBKZQUTKaRL_esBP0Mzub1lEGRWJX9Rb3E',
            language: 'es', // language of the results

          }}
          styles={{
            textInputContainer: {
              backgroundColor: 'rgba(0,0,0,0)',
              borderWidth: 0,
              borderTopWidth: 0,
              borderBottomWidth: 0
            }
          }}
          nearbyPlacesAPI='GooglePlacesSearch'
          GoogleReverseGeocodingQuery={{
            // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
          }}
          GooglePlacesSearchQuery={{
            // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
            rankby: 'distance',
            types: 'food',
          }}


          filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']}
          debounce={200}

        />
      </View>
      );
      button = (
        <View style={{position: 'absolute', bottom: 10, width: '90%', right: '5%'}}>
          <TouchableNativeFeedback onPress={this.selectAddress.bind(this)}>
          <View style={{height: 40, backgroundColor: '#1e9284', borderRadius: 5, alignItems: 'center', justifyContent: 'center'}}>
            <Text style={{fontSize: 16, color: '#fff'}}>Confirmar ubicacion</Text>
          </View>
          </TouchableNativeFeedback>
        </View>
      );
    } else {
      let pets = this.props.pets.map(function(e, index){
        pet = this.props.allPets.filter(function (p) {
          return p.id === e;
        });
        return (
          <AvatarPet key={index} pet={pet[0]}/>
        );
      }.bind(this))
      if (this.state.date == '') {
        datestring = 'No ha seleccionado la fecha del paseo';
        datestringbuttom = 'Seleccionar fecha';
      } else {
        datestring = moment(this.state.date).format('LLLL');
        datestringbuttom = 'Cambiar fecha';
      }
      content = (
        <View elevation={3} style={
          {
            position: 'absolute',
            top: 70,
            right: '5%',
            width: '90%',
            borderRadius: 5,
            backgroundColor: 'white'
          }
        }>
        <View style={{paddingTop: 10, paddingBottom: 10, paddingRight: 15, paddingLeft: 15}}>
          <Text style={{fontWeight: 'bold'}}>Dirección: </Text>
          <Text style={{fontSize: 14}}>{this.state.address}</Text>
          <Text style={{fontWeight: 'bold', marginTop: 10}}>Mascotas: </Text>
          <View style={{
            flexDirection: 'row',
            marginTop: 5,
            justifyContent: 'flex-start',
            marginRight: 10
          }}>{ pets }</View>
          <Text style={{fontWeight: 'bold', marginTop: 10}}>Fecha: </Text>
          <Text style={{fontSize: 14}}>{ datestring }</Text>
          <View style={{marginTop: 10}}>
            <DatePicker
              is24Hour={false}
              mode="datetime"
              placeholder={datestringbuttom}
              format="YYYY-MM-DD HH:mm"
              minDate={ new Date().toLocaleDateString() }
              maxDate="2018-01-01"
              customStyles={{
                dateInput: {
                  borderWidth: 0,
                  borderBottomWidth: 0,
                  backgroundColor: '#1e9284',
                  width: 20,
                  height: 30,
                  borderRadius: 5
                },
                placeholderText: {
                  color: '#FFF'
                }
              }}
              confirmBtnText="Seleccionar"
              cancelBtnText="Cancelar"
              placeholderStyle={{ color: '#000', textAlign: 'center'}}
              showIcon={false}
              onDateChange={(date) => {this.setState({date: date})}}
            />
          </View>
        </View>
      </View>
      );
      button = (
        <View style={{position: 'absolute', bottom: 10, width: '90%', right: '5%'}}>
          <TouchableNativeFeedback onPress={this.confirmWalk.bind(this)}>
          <View style={{height: 40, backgroundColor: '#1e9284', borderRadius: 5, alignItems: 'center', justifyContent: 'center'}}>
            <Text style={{fontSize: 16, color: '#fff'}}>Solicitar Paseador</Text>
          </View>
          </TouchableNativeFeedback>
        </View>
      );
    }
    return(
      <View style={[{flex: 1}]}>
        <Icon.ToolbarAndroid
          style={utilities.toolbar}
          title="Seleccionar dirección"
          titleColor="white"
          navIconName="arrow-back"
          onIconClicked={Actions.pop}
          elevation={1}
        />

        {contentMap}
        {button}
        {content}

      </View>
    )
  }
}
