import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  Image,
  View,
  TouchableNativeFeedback,
  ScrollView
} from 'react-native';
import moment from 'moment';
require('moment/locale/es.js');
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/MaterialIcons';
var utilities = require('../../assets/css/utilities');

export default class PlanIndex extends Component {
  render() {
    var item;
    var content;
    if (this.props.user.subscription_active != null) {
      item = this.props.plans.find((plan) => {
        if (plan.id == this.props.user.subscription_active.plan.id) {
          return plan
        }
      })
      content = (
        <View style={{ backgroundColor: '#FFF'}}>
          <Image
            source={{uri: item.logo.original}}
            style={{ width: '100%', height: 170, justifyContent: 'flex-end', resizeMode: 'stretch'}}
            >
            <View style={{margin: 20}} >
              <Text style={
                {
                  textShadowColor: 'rgba(0, 0, 0, 0.5)',
                  textShadowRadius: 5,
                  marginBottom: 0,
                  textShadowOffset: {
                    height: 1,
                    width: 0
                  },
                  fontSize: 22,
                  color: 'white',
                  fontWeight: '100'
                }
              }>PLAN {item.name.toUpperCase()}</Text>
            </View>
          </Image>

          <View style={[{alignItems: 'center', flexDirection: 'row', justifyContent: 'flex-start', borderBottomWidth: 1, borderTopWidth: 1, borderColor: '#EEF6F9'}]}>

            <View style={{padding: 20, width: '50%', borderRightWidth: 1, borderColor: '#EEF6F9'}}>
              <Text style={{fontSize: 14, color: '#ccc', textAlign: 'center'}}>Estado</Text>
              <Text style={{fontSize: 18, color: '#1e9284', textAlign: 'center'}}>Activo</Text>
            </View>
            <View style={{padding: 20, width: '50%'}}>
              <Text style={{fontSize: 14, color: '#ccc', textAlign: 'center'}}>Vence</Text>
              <Text style={{fontSize: 18, color: '#6d6d6d', textAlign: 'center'}}>{ moment(this.props.user.subscription_active.end_date).diff(moment(),'days')} dias</Text>
            </View>
          </View>
          <View style={[{alignItems: 'center', flexDirection: 'row', justifyContent: 'flex-start', borderBottomWidth: 1, borderColor: '#EEF6F9'}]}>

            <View style={{padding: 20, width: '50%', borderRightWidth: 1, borderColor: '#EEF6F9'}}>
              <Text style={{fontSize: 14, color: '#ccc', textAlign: 'center'}}>Paseos Restante</Text>
              <Text style={{fontSize: 18, color: '#6d6d6d', textAlign: 'center'}}>25</Text>
            </View>
            <View style={{padding: 20, width: '50%'}}>
              <Text style={{fontSize: 14, color: '#ccc', textAlign: 'center'}}>Paseos Mensuales</Text>
              <Text style={{fontSize: 18, color: '#6d6d6d', textAlign: 'center'}}>{ this.props.user.subscription_active.plan.walks_number }</Text>
            </View>
          </View>
          <View style={[{alignItems: 'center', flexDirection: 'row', justifyContent: 'flex-start', borderBottomWidth: 1, borderColor: '#EEF6F9'}]}>

            <View style={{padding: 20, width: '50%', borderRightWidth: 1, borderColor: '#EEF6F9'}}>
              <Text style={{fontSize: 14, color: '#ccc', textAlign: 'center'}}>Desde</Text>
              <Text style={{fontSize: 18, color: '#6d6d6d', textAlign: 'center'}}>{ moment(this.props.user.subscription_active.createdAt).format('L')}</Text>
            </View>
            <View style={{padding: 20, width: '50%'}}>
              <Text style={{fontSize: 14, color: '#ccc', textAlign: 'center'}}>Hasta</Text>
              <Text style={{fontSize: 18, color: '#6d6d6d', textAlign: 'center'}}>{ moment(this.props.user.subscription_active.end_date).format('L')}</Text>
            </View>
          </View>
          <View style={[{marginLeft: 5, justifyContent: 'flex-start', borderBottomWidth: 1, borderColor: '#EEF6F9'}]}>
            <View style={{flexDirection: 'row'}}>
              <TouchableNativeFeedback>
                <View style={{
                  padding: 20,
                  width: '33%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRightWidth: 1,
                  borderColor: '#EEF6F9'
                }}>
                  <Icon name="history" size={25} color="#1e9284" />
                  <Text style={{fontSize: 14, marginTop: 5, color: '#1e9284'}}>Historial</Text>

                </View>
              </TouchableNativeFeedback>
              <TouchableNativeFeedback onPress={Actions.Plans}>
                <View style={{
                  padding: 20,
                  width: '34%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRightWidth: 1,
                  borderColor: '#EEF6F9'
                }}>
                  <Icon name="dashboard" size={25} color="#1e9284" />
                  <Text style={{fontSize: 14, marginTop: 5, color: '#1e9284'}}>Planes</Text>

                </View>
              </TouchableNativeFeedback>
              <TouchableNativeFeedback onPress={Actions.MyDatesHistory}>
                <View style={{
                  padding: 20,
                  width: '33%',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}>
                  <Icon name="directions-walk" size={25} color="#1e9284" />
                  <Text style={{fontSize: 14, marginTop: 5, color: '#1e9284'}}>Paseos</Text>

                </View>
              </TouchableNativeFeedback>
            </View>
          </View>
        </View>
      );
    }
    return(
      <View style={[{flex: 1, backgroundColor: '#f7f7f7'}]}>
        <Icon.ToolbarAndroid
          style={utilities.toolbar}
          title="Mi suscripción"
          titleColor="white"
          navIconName="arrow-back"
          onIconClicked={Actions.pop}
          elevation={1}
        />
        <ScrollView>
        { content }
        </ScrollView>
      </View>
    )
  }
}
