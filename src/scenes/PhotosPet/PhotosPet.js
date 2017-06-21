import React, { Component } from 'react';
import { View, Text, Image, ActivityIndicator, Alert, TouchableNativeFeedback, ToastAndroid, ToolbarAndroid, StatusBar, ListView } from 'react-native';
import { Actions } from 'react-native-router-flux';
var utilities = require('../../assets/css/utilities');
import ActionButton from '../../components/ActionButton/ActionButton'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { addPhoto, getPet, deletePhoto } from '../../services/petsServices';
import Dimensions from 'Dimensions';
import ImagePicker from 'react-native-image-crop-picker'
const {width, height} = Dimensions.get('window');
import PushNotification from 'react-native-push-notification';
import moment from 'moment';
require('moment/locale/es.js');

export default class Home extends Component {
  constructor(props) {
    super();
    this.updatePet = props.updatePet;
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: this.ds.cloneWithRows([{},{},{}]),
      imageSelect: '',
      loading: false
    };
  }
  selectAvatar () {

    ImagePicker.openPicker({
      width: 800,
      height: 800,
      includeBase64: true,
      cropping: true
    }).then(response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        //let source = { uri: response.uri };

        // You can also display the image using data:
        let source = { uri: 'data:image/jpeg;base64,' + response.data };
        this.setState({loading: true});
        addPhoto({id: this.props.pet.id, avatar: source.uri})
        .then(pet => {
          getPet(pet.id)
          .then(pet => {
            this.updatePet(pet);
            ToastAndroid.show('Se ha agregado la foto correctamente', ToastAndroid.SHORT);
            this.setState({loading: false});
          });
        })
        .catch(() => {
          ToastAndroid.show('No se ha agregado la foto, intente mas tarde', ToastAndroid.SHORT);
        });
      }
    });
  }
  selectAvatar2 () {

    ImagePicker.openCamera({
      width: 800,
      height: 800,
      includeBase64: true,
      cropping: true
    }).then(response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {

        let source = { uri: 'data:image/jpeg;base64,' + response.data };
        this.setState({loading: true});

        addPhoto({id: this.props.pet.id, avatar: source.uri})
        .then(pet => {
          getPet(pet.id)
          .then(pet => {
            this.updatePet(pet);
            this.setState({loading: false});
            ToastAndroid.show('Se ha agregado la foto correctamente', ToastAndroid.SHORT);
          });
        })
        .catch(() => {
          ToastAndroid.show('No se ha agregado la foto, intente mas tarde', ToastAndroid.SHORT);
        });

      }
    });
  }
  eliminar (id, self) {
    self.setState({loading: true});
    deletePhoto({petid: self.props.pet.id, photoid: id})
    .then(pet => {
      getPet(pet.id)
      .then(pet => {
        self.updatePet(pet);
        self.setState({loading: false});
        ToastAndroid.show('Se ha eliminado la foto correctamente', ToastAndroid.SHORT);
      });
    })
    .catch(() => {
      ToastAndroid.show('No se ha eliminado la foto, intente mas tarde', ToastAndroid.SHORT);
    });
  }
  render (){
    let loading;
    if (this.state.loading) {
      loading = (
        <View elevation={5} style={{right: '45%', position: 'absolute', top: 10, backgroundColor: '#1e9284', width: 40, height: 40, borderRadius: 50}}>
          <ActivityIndicator
            animating={true}
            color="white"
            style={[{height: 40}]}
          />
        </View>
      );
    }
    let iconAction = (
      <Icon name="add-a-photo" size={30} color="white" />
    );
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    var source = ds.cloneWithRows(this.props.pet.photos)
    if (this.props.pet.photos.length === 0) {
      return (
        <View style={[utilities.pb_lg, { flex: 1}]}>
           <Icon.ToolbarAndroid
             style={utilities.toolbar}
             title={'Fotos ' + this.props.pet.name}
             titleColor="white"
             navIconName="arrow-back"
             onIconClicked={Actions.pop}
             elevation={1}
           />
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Image source={require('../../../src/assets/images/dugy_grey.png')} style={{width: 200, height: 200}}/>
          <TouchableNativeFeedback onPress={
            () => Alert.alert(
              'Imagen de la mascota',
              'Seleccione desde el origen de la imagen',
              [
                {text: 'Camara', onPress: this.selectAvatar2.bind(this)},
                {text: 'Galeria', onPress: this.selectAvatar.bind(this)},
              ]
            )
          }>
              <Text style={{fontSize: 16, textAlign: 'center', width: '70%'}}>Upps, Todavia no ha añadido fotos <Text style={{fontWeight: 'bold'}}>tap aqui</Text> para agregar.</Text>
          </TouchableNativeFeedback>
          {loading}
        </View>
        <ActionButton action={() => Alert.alert(
          'Imagen de la mascota',
          'Seleccione desde el origen de la imagen',
          [
            {text: 'Camara', onPress: this.selectAvatar2.bind(this)},
            {text: 'Galeria', onPress: this.selectAvatar.bind(this)},
          ]
        )} icon={iconAction}/>
        </View>
      );
    }
    return (
      <View style={utilities.container}>
        <StatusBar
          backgroundColor="#1e9284"
          barStyle="light-content"
        />
        <Icon.ToolbarAndroid
          style={utilities.toolbar}
          title={'Fotos ' + this.props.pet.name}
          titleColor="white"
          navIconName="arrow-back"
          onIconClicked={Actions.pop}
          elevation={5}
        />
          <View style={{flex: 1, backgroundColor: '#f1f1f1'}}>
          <ListView
            contentContainerStyle={
              {
                paddingTop: 10,
                paddingBottom: 60
              }
            }
            enableEmptySections={true}
            dataSource={source}
            renderRow={(rowData) => {
                return (
                  <View elevation={1} style={{marginLeft: 5, marginRight: 5, marginBottom: 10, backgroundColor: '#FFF', borderBottomWidth: 1, borderColor: '#f1f1f1'}}>

                    <Image style={{width: '100%', height: width}} source={{uri: rowData.thumbnail }}/>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <View style={{flex: 1, alignItems: 'flex-start'}}>
                        <Text style={{fontSize: 14, color: '#6d6d6d', marginLeft: 10}} >{ moment(rowData.createdAt).fromNow()}</Text>
                      </View>
                      <TouchableNativeFeedback>
                        <View style={{height: 45, width: 45, borderLeftWidth: 1, borderColor: '#ccc', justifyContent: 'center',alignItems: 'center'}}>
                          <Icon name="check" size={25} color="#1e9284" />
                        </View>
                      </TouchableNativeFeedback>

                      <TouchableNativeFeedback onPress={
                        () => Alert.alert(
                          'Eliminar Foto',
                          '¿Esta seguro de eliminar la foto?',
                          [
                            {
                              text: 'Eliminar',
                              onPress: () => {
                                this.eliminar(rowData.id, this);
                                return 0;
                              }
                            },
                            {
                              onPress: () => {},
                              text: 'Cancelar',
                              style: 'cancel'
                            },
                          ]
                        )
                      }>
                        <View style={{height: 45, width: 45, borderLeftWidth: 1, borderColor: '#ccc', justifyContent: 'center',alignItems: 'center'}}>
                          <Icon name="delete" size={25} color="#1e9284" />
                        </View>
                      </TouchableNativeFeedback>


                    </View>
                  </View>
                );
              }
            }/>
            <ActionButton action={() => Alert.alert(
              'Imagen de la mascota',
              'Seleccione desde el origen de la imagen',
              [
                {text: 'Camara', onPress: this.selectAvatar2.bind(this)},
                {text: 'Galeria', onPress: this.selectAvatar.bind(this)},
              ]
            )} icon={iconAction}/>
            {loading}
          </View>
      </View>
    );
  }
}
