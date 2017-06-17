import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View,
  ToastAndroid,
  Animated,
  ScrollView,
  Image,
} from 'react-native';
import Dimensions from 'Dimensions';
const {width, height} = Dimensions.get('window');
import DatePicker from 'react-native-datepicker';
import moment from 'moment';
require('moment/locale/es.js');
import AvatarPet from '../../components/ItemListService/avatarPet'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
var {GooglePlacesAutocomplete} = require('react-native-google-places-autocomplete');
const homePlace = {description: 'Mi casa', geometry: { location: { lat: 48.8152937, lng: 2.4597668 } }};
const workPlace = {description: 'Trabajo', geometry: { location: { lat: 48.8496818, lng: 2.2940881 } }};
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/MaterialIcons';
var utilities = require('../../assets/css/utilities');

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
  constructor(props) {
    super(props);
    this.state = {
      latitude: parseFloat(props.service.latitude),
      longitude: parseFloat(props.service.longitude),
      address: props.service.address,
      addressSelect: true,
      date: props.service.date,
      heightDetails: new Animated.Value(height / 2 + height / 4 + height / 20),
      heightDetailsContent: new Animated.Value((height / 2 + height / 4 + height / 20) - 115),
      openDetails: true,
      TextToggle: 'Ocultar detalles',
      withToggle: new Animated.Value( width - width/10),
      borderRadius: new Animated.Value(0),
      iconLoaded: false
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
      ToastAndroid.show('Listo para el paseo', ToastAndroid.SHORT);
      console.log(this.state);
    }
  }
  toggleDetails()
  {
    if (this.state.openDetails) {
      Animated.timing(this.state.heightDetails, {
        toValue: 50,
        duration: 200
      }).start();
      Animated.timing(this.state.borderRadius, {
        toValue: 50,
        duration: 200
      }).start();
      Animated.timing(this.state.withToggle, {
        toValue: 50,
        duration: 200
      }).start();
      this.setState({TextToggle: ''});
    } else {
      this.setState({TextToggle: 'Ocultar detalles'});
      Animated.timing(this.state.borderRadius, {
        toValue: 0,
        duration: 200
      }).start();
      Animated.timing(this.state.withToggle, {
        toValue: (width - width/10),
        duration: 200
      }).start();
      Animated.timing(this.state.heightDetails, {
        toValue: (height / 2 + height / 4 + height / 20),
        duration: 200
      }).start();

    }
    this.setState({openDetails: !this.state.openDetails});
  }
  render() {
    let image = require('../../../src/assets/images/pin_1.png');
    let button;
    let content;
    let datestring;
    let hour;
    let contentButtom;
    let datestringbuttom;
    let pin;
    let image2;
    if (!this.state.iconLoaded) {
      pin = (
        <Image
          style={{
            width: 40,
            height: 58,
            opacity: 0
          }}
           source={image}
           onLoadEnd={() => {this.setState({iconLoaded: true});}}
         />
      );
    } else {
      pin = (
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
          coordinate={{
            latitude: this.state.latitude,
            longitude: this.state.longitude,
          }}>
          <Image
            style={{
              width: 40,
              height: 58
            }}
             source={image}
           />
           </MapView.Marker>
        </MapView>
      );
    }

    if (this.state.openDetails) {
      contentButtom = (
        <View style={{width: '100%', justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', paddingLeft: 15}}>
          <Text style={{fontSize: 16, fontWeight: 'bold', color: '#fff'}}>{moment(this.state.date).fromNow().replace(/\b[a-z]/,function(f){return f.toUpperCase();})}</Text>
          <TouchableNativeFeedback onPress={this.toggleDetails.bind(this)}>
            <View style={{width: 50, height: 50, alignItems: 'center', justifyContent: 'center'}}>
              <Icon name="map" size={22} color="white" />
            </View>
          </TouchableNativeFeedback>
        </View>

      );
    } else {
      contentButtom = (
        <TouchableNativeFeedback onPress={this.toggleDetails.bind(this)}>
        <View style={{width: 50, height: 50, alignItems: 'center', justifyContent: 'center'}}>
          <Icon name="info" size={22} color="white" />
        </View>
        </TouchableNativeFeedback>

      );
    }
    let pets = this.props.service.pets.map(function(e, index){
      pet = this.props.allPets.filter(function (p) {
        return p.id === e.id;
      });
      return (
        <AvatarPet key={index} pet={pet[0]}/>
      );
    }.bind(this))
    if (this.state.date == '') {
      datestring = 'No ha seleccionado la fecha del paseo';
      datestringbuttom = 'Seleccionar fecha';
    } else {
      datestring = moment(this.state.date).format('LL');
      hour = moment(this.props.service.date).format('hh:mm a') + ' - ' + moment(this.props.service.date).add(this.props.service.hours ,'hour').format('hh:mm a');
      datestringbuttom = 'Cambiar fecha';
    }
    button = (
      <View style={{ width: '90%', flex: 1, justifyContent: 'flex-end' ,marginLeft: '5%', marginBottom: 10, marginTop: 10}}>
        <TouchableNativeFeedback onPress={this.confirmWalk.bind(this)}>
        <View style={{height: 40, backgroundColor: '#1e9284', borderRadius: 5, alignItems: 'center', justifyContent: 'center'}}>
          <Text style={{fontSize: 16, color: '#fff'}}>Cancelar Paseo</Text>
        </View>
        </TouchableNativeFeedback>
      </View>
    );
    content = (
      <Animated.View style={
        {
          position: 'absolute',
          top: 70,
          right: '5%',
          width: this.state.withToggle,
          height: this.state.heightDetails,
          borderRadius: this.state.borderRadius,
          backgroundColor: 'white',
          borderWidth: 1,
          borderColor: '#08AE9E'
        }
      }>

      <Animated.View style={
        {
          backgroundColor: '#08AE9E',
          width: '100%',
          height: 49,
          borderRadius: this.state.borderRadius,
          justifyContent: 'center',
          alignItems: 'center'
        }
      }>
      {contentButtom}
      </Animated.View>
      <ScrollView>
      <Animated.View style={{paddingTop: 10, paddingBottom: 10, paddingRight: 15, paddingLeft: 15, minHeight: (this.state.heightDetailsContent)}}>
        <Text style={{fontWeight: 'bold'}}>Dirección: </Text>
        <Text style={{fontSize: 14}}>{this.state.address}</Text>
        <Text style={{fontWeight: 'bold', marginTop: 10}}>Fecha: </Text>
        <Text style={{fontSize: 14}}>{ datestring }</Text>
        <Text style={{fontWeight: 'bold', marginTop: 10}}>Hora: </Text>
        <Text style={{fontSize: 14}}>{ hour }</Text>
        <Text style={{fontWeight: 'bold', marginTop: 10}}>Mascotas: </Text>
        <View style={{
          flexDirection: 'row',
          marginTop: 5,
          justifyContent: 'flex-start',
          marginRight: 10
        }}>{ pets }</View>
        <Text style={{fontWeight: 'bold', marginTop: 10}}>Paseador: </Text>
        <Text style={{fontSize: 14}}>Sin asignar</Text>
      </Animated.View>
      {button}

      </ScrollView>
    </Animated.View>
    );


    return(
      <View style={[{flex: 1}]}>
        <Icon.ToolbarAndroid
          style={utilities.toolbar}
          title="Detalles del paseo"
          titleColor="white"
          navIconName="arrow-back"
          onIconClicked={Actions.pop}
          elevation={1}
        />
        {pin}

        {content}

      </View>
    )
  }
}
