import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableNativeFeedback,
  ScrollView
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/MaterialIcons';
var utilities = require('../../assets/css/utilities');
export default class PlanIndex extends Component {
  constructor() {
    super();
    this.state = {
      credit_card: '',
      days_expired: '',
      name: '',
      cvc: '',
      address: '',
      address2: '',
      country: '',
      state: '',
      city: '',
      zip_code: '',
      token: ''
    }
  }

  createToken(){
    console.log(this.state)
    var args = {
        // sellerId: "901341507",
        // publishableKey: "07502CA5-F830-47C6-90DC-E28CB26679BF",
        // ccNo: this.state.credit_card.split(' ').join(''),
        // cvv: this.state.cvc,
        // expMonth: this.state.days_expired.split('/')[0].trim(),
        // expYear: this.state.days_expired.split('/')[1].trim()
        /*ccNo: '4000000000000002',
         cvv: '123',
         expMonth: '02',
         expYear:'20'*/
    };


  }

  cc_format(value) {
    var v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    var matches = v.match(/\d{2,16}/g);
    var match = matches && matches[0] || ''
    var parts = []

    for (i=0, len=match.length; i<len; i+=4) {
        parts.push(match.substring(i, i+4))
    }

    if (parts.length) {
        return parts.join(' ')
    } else {
        return value
    }
  }
  days_format(value) {
    var v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    var matches = v.match(/\d{2,5}/g);
    var match = matches && matches[0] || ''
    var parts = []

    for (i=0, len=match.length; i<len; i+=2) {
        parts.push(match.substring(i, i+2))
    }

    if (parts.length) {
        return parts.join('/')
    } else {
        return value
    }
  }
  render() {
    let item = this.props.plan;
    return(
      <View style={[{flex: 1, backgroundColor: '#f7f7f7'}]}>
        <Icon.ToolbarAndroid
          style={utilities.toolbar}
          title="Metodos de pago"
          titleColor="white"
          navIconName="arrow-back"
          onIconClicked={Actions.pop}
          elevation={1}
        />
        <ScrollView>
        <View elevation={2} style={{ margin: 5, backgroundColor: '#FFF', marginBottom: 0, borderWidth: 1, borderColor: 'rgba(0,0,0,0.1)'}}>
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
          </View>
        </View>
        <View style={{ margin: 5, marginBottom: 0, backgroundColor: '#fff', borderWidth: 1, borderColor: 'rgba(0,0,0,0.2)' }}>
          <View style={{margin: 20}} >
            <Text style={{fontSize: 22, fontWeight: '100'}}>Datos de pago</Text>
            <Text style={{marginTop: 10, marginBottom: 5, color: '#ccc'}}>Nombre y apellido</Text>
            <View style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 5, paddingRight: 10, justifyContent: 'center',alignItems: 'center', flexDirection: 'row'}}>
              <TextInput
                autoCapitalize="words"
                style={{marginLeft: 10, padding: 5, flex: 1, fontSize: 15, color: '#6d6d6d'}}
                placeholder="Ingresar nombre"
                placeholderTextColor="#ccc"
                onChangeText={(name) => this.setState({name: name})}
                value={this.state.name}
                underlineColorAndroid="transparent"
              />
              <Icon name="person" size={24} color="#ccc" />
            </View>
              <Text style={{marginTop: 10, marginBottom: 5, color: '#ccc'}}>Numero de tarjeta</Text>
              <View style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 5, paddingRight: 10, justifyContent: 'center',alignItems: 'center', flexDirection: 'row'}}>
                <TextInput
                  maxLength={19}
                  keyboardType="numeric"
                  onChangeText={(credit_card) => this.setState({credit_card: credit_card})}
                  value={this.cc_format(this.state.credit_card)}
                  style={{marginLeft: 10, padding: 5, flex: 1, fontSize: 15, color: '#6d6d6d'}}
                  placeholder="xxxx-xxxx-xxxx-xxxx"
                  placeholderTextColor="#ccc"
                  underlineColorAndroid="transparent"
                />
                <Icon name="payment" size={24} color="#ccc" />
              </View>
              <View style={{flexDirection: 'row'}}>
                <View style={{flex: 1, marginRight: 10}}>
                  <Text style={{marginTop: 10, marginBottom: 5, color: '#ccc'}}>Fecha de vencimiento</Text>
                  <View style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 5, paddingRight: 10, justifyContent: 'center',alignItems: 'center', flexDirection: 'row'}}>
                    <TextInput
                      onChangeText={(days_expired) => this.setState({days_expired: days_expired})}
                      value={this.days_format(this.state.days_expired)}
                      keyboardType="numeric"
                      maxLength={5}
                      style={{marginLeft: 10, padding: 5, flex: 1, fontSize: 15, color: '#6d6d6d'}}
                      placeholder="xx/xx"
                      placeholderTextColor="#ccc"
                      underlineColorAndroid="transparent"
                    />
                    <Icon name="date-range" size={24} color="#ccc" />
                  </View>
                </View>
                <View style={{width: 120}}>
                  <Text style={{marginTop: 10, marginBottom: 5, color: '#ccc'}}>CVC</Text>
                  <View style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 5, paddingRight: 10, justifyContent: 'center',alignItems: 'center', flexDirection: 'row'}}>
                    <TextInput
                      keyboardType="numeric"
                      maxLength={3}
                      onChangeText={(cvc) => this.setState({cvc: cvc})}
                      value={this.state.cvc}
                      style={{marginLeft: 10, padding: 5, flex: 1, fontSize: 15, color: '#6d6d6d'}}
                      placeholder="xxx"
                      placeholderTextColor="#ccc"
                      underlineColorAndroid="transparent"
                    />
                    <Icon name="payment" size={24} color="#ccc" />
                  </View>
                </View>
            </View>
            <Text style={{marginTop: 10, marginBottom: 5, color: '#ccc'}}>Direccion</Text>
            <View style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 5, paddingRight: 10, justifyContent: 'center',alignItems: 'center', flexDirection: 'row'}}>
              <TextInput
                onChangeText={(address) => this.setState({address: address})}
                value={this.state.address}
                style={{marginLeft: 10, padding: 5, flex: 1, fontSize: 15, color: '#6d6d6d'}}
                autoCapitalize="sentences"
                placeholder=""
                placeholderTextColor="#ccc"
                underlineColorAndroid="transparent"
              />
              <Icon name="edit" size={24} color="#ccc" />
            </View>
            <Text style={{marginTop: 10, marginBottom: 5, color: '#ccc'}}>Direccion 2</Text>
            <View style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 5, paddingRight: 10, justifyContent: 'center',alignItems: 'center', flexDirection: 'row'}}>
              <TextInput
                onChangeText={(address2) => this.setState({address2: address2})}
                value={this.state.address2}
                style={{marginLeft: 10, padding: 5, flex: 1, fontSize: 15, color: '#6d6d6d'}}
                placeholder=""
                autoCapitalize="sentences"
                placeholderTextColor="#ccc"
                underlineColorAndroid="transparent"
              />
              <Icon name="edit" size={24} color="#ccc" />
            </View>
            <Text style={{marginTop: 10, marginBottom: 5, color: '#ccc'}}>Pais</Text>
            <View style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 5, paddingRight: 10, justifyContent: 'center',alignItems: 'center', flexDirection: 'row'}}>
              <TextInput
                onChangeText={(country) => this.setState({country: country})}
                value={this.state.country}
                style={{marginLeft: 10, padding: 5, flex: 1, fontSize: 15, color: '#6d6d6d'}}
                placeholder=""
                autoCapitalize="sentences"
                placeholderTextColor="#ccc"
                underlineColorAndroid="transparent"
              />
              <Icon name="edit" size={24} color="#ccc" />
            </View>
            <Text style={{marginTop: 10, marginBottom: 5, color: '#ccc'}}>Estado</Text>
            <View style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 5, paddingRight: 10, justifyContent: 'center',alignItems: 'center', flexDirection: 'row'}}>
              <TextInput
                onChangeText={(state) => this.setState({state: state})}
                value={this.state.state}
                style={{marginLeft: 10, padding: 5, flex: 1, fontSize: 15, color: '#6d6d6d'}}
                placeholder=""
                autoCapitalize="sentences"
                placeholderTextColor="#ccc"
                underlineColorAndroid="transparent"
              />
              <Icon name="edit" size={24} color="#ccc" />
            </View>
            <Text style={{marginTop: 10, marginBottom: 5, color: '#ccc'}}>Ciudad</Text>
            <View style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 5, paddingRight: 10, justifyContent: 'center',alignItems: 'center', flexDirection: 'row'}}>
              <TextInput
                onChangeText={(city) => this.setState({city: city})}
                value={this.state.city}
                style={{marginLeft: 10, padding: 5, flex: 1, fontSize: 15, color: '#6d6d6d'}}
                placeholder=""
                autoCapitalize="sentences"
                placeholderTextColor="#ccc"
                underlineColorAndroid="transparent"
              />
              <Icon name="edit" size={24} color="#ccc" />
            </View>
            <Text style={{marginTop: 10, marginBottom: 5, color: '#ccc'}}>Codigo postal</Text>
            <View style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 5, paddingRight: 10, justifyContent: 'center',alignItems: 'center', flexDirection: 'row'}}>
              <TextInput
                onChangeText={(zip_code) => this.setState({zip_code: zip_code})}
                value={this.state.zip_code}
                style={{marginLeft: 10, padding: 5, flex: 1, fontSize: 15, color: '#6d6d6d'}}
                placeholder=""
                keyboardType="numeric"
                placeholderTextColor="#ccc"
                underlineColorAndroid="transparent"
              />
              <Icon name="edit" size={24} color="#ccc" />
            </View>
          </View>
          <View style={{borderTopWidth: 1, borderColor: 'rgba(0,0,0,0.2)' }}>
            <TouchableNativeFeedback onPress={ this.createToken.bind(this) }>
              <View style={{flexDirection: 'row', margin: 20}}>
                <View style={{flex: 1, flexDirection: 'row', backgroundColor: '#1e9284', borderRadius: 5, justifyContent: 'center', paddingLeft: 20, padding: 10, alignItems: 'center'}}>
                  <Icon name="payment" size={24} color="white" />
                  <Text style={{marginLeft: 15, paddingRight: 50, fontSize: 16, color: 'white', fontWeight: 'bold'}}>Pagar</Text>
                </View>
              </View>
            </TouchableNativeFeedback>
          </View>
        </View>


        </ScrollView>

      </View>
    )
  }
}
