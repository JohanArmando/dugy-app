import React, { Component } from 'react';
import { View, Text, ToastAndroid, Alert, ActivityIndicator, StyleSheet, ScrollView, ToolbarAndroid, TouchableNativeFeedback, StatusBar, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ImagePicker from 'react-native-image-crop-picker'
import { updateProfile } from '../../services/authServices';

var utilities = require('../../assets/css/utilities');

const editName = () => {
  Actions.EditProfile({attr: 'name'});
};
const editPhone = () => {
  Actions.EditProfile({attr: 'phone'});
};
const editEmail = () => {
  Actions.EditProfile({attr: 'email'});
};
const editDocument = () => {
  Actions.EditProfile({attr: 'document'});
};


// More info on all the options is below in the README...just some common use cases shown here
var options = {
  title: null,
  cancelButtonTitle: 'Cancelar',
  takePhotoButtonTitle: 'Desde la camara',
  chooseFromLibraryButtonTitle: 'Desde la galeria',
  storageOptions: {
    skipBackup: true,
    path: 'images'
  }
};

export default class Profile extends Component {

  constructor(props) {
    super(props);
    this.updateStore = props.store;
    this.state = {
      loading: false
    }
  }
  /**
   * The first arg is the options object for customization (it can also be null or omitted for default options),
   * The second arg is the callback which sends object: response (more info below in README)
   */
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
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };
        // console.log(response)
        // this.setState({
        //   avatarSource: source.uri
        // });
        let source = { uri: 'data:image/jpeg;base64,' + response.data };
        this.setState({
          loading: true
        });
        updateProfile(this.props.user.id,{
          avatar: {
            avatar: source.uri,
            name: 'avatar.png'
          }
        }).then(user => {
          ToastAndroid.show('El avatar ha sido actiualizado', ToastAndroid.SHORT);
          this.updateStore(user)
          this.setState({
            loading: false
          });
        })
        .catch(error => {
          ToastAndroid.show('No se pudo actualizar el perfil', ToastAndroid.SHORT);
          this.setState({
            loading: false
          });
          console.log(error)
        })
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
        //let source = { uri: response.uri };

        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };
        // console.log(response)
        // this.setState({
        //   avatarSource: source.uri
        // });
        let source = { uri: 'data:image/jpeg;base64,' + response.data };
        this.setState({
          loading: true
        });
        updateProfile(this.props.user.id,{
          avatar: {
            avatar: source.uri,
            name: 'avatar.png'
          }
        }).then(user => {
          ToastAndroid.show('El avatar ha sido actiualizado', ToastAndroid.SHORT);
          this.updateStore(user)
          this.setState({
            loading: false
          });
        })
        .catch(error => {
          ToastAndroid.show('No se pudo actualizar el perfil', ToastAndroid.SHORT);
          this.setState({
            loading: false
          });
          console.log(error)
        })
      }
    });
  }

  /**
   * The first arg is the options object for customization (it can also be null or omitted for default options),
   * The second arg is the callback which sends object: response (more info below in README)
   */
  // selectAvatar () {
  //   ImagePicker.showImagePicker(options, (response) => {
  //     console.log('Response = ', response);
  //
  //     if (response.didCancel) {
  //       console.log('User cancelled image picker');
  //     }
  //     else if (response.error) {
  //       console.log('ImagePicker Error: ', response.error);
  //     }
  //     else if (response.customButton) {
  //       console.log('User tapped custom button: ', response.customButton);
  //     }
  //     else {
  //       //let source = { uri: response.uri };
  //
  //       // You can also display the image using data:
  //       let source = { uri: 'data:image/jpeg;base64,' + response.data };
  //       this.setState({
  //         loading: true
  //       });
  //       updateProfile(this.props.user.id,{
  //         avatar: {
  //           avatar: source.uri,
  //           name: 'avatar.png'
  //         }
  //       }).then(user => {
  //         ToastAndroid.show('El avatar ha sido actiualizado', ToastAndroid.SHORT);
  //         this.updateStore(user)
  //         this.setState({
  //           loading: false
  //         });
  //       })
  //       .catch(error => {
  //         ToastAndroid.show('No se pudo actualizar el perfil', ToastAndroid.SHORT);
  //         this.setState({
  //           loading: false
  //         });
  //         console.log(error)
  //       })
  //       // this.setState({
  //       //   avatarSource: source.uri
  //       // });
  //     }
  //   });
  // }

  render (){
    var loading;
    if (this.state.loading) {
      loading = (
        <View style={styles.loading}>
          <ActivityIndicator
            animating={true}
            style={[styles.centering, {height: 150}]}
            size="large"
          />
        </View>
      );
    }
    return (
      <View style={[utilities.container, styles.colorGrey]}>
        <StatusBar
          backgroundColor="#1e9284"
          barStyle="light-content"
        />
        <Icon.ToolbarAndroid
          style={utilities.toolbar}
          title="Perfil"
          titleColor="white"
          navIconName="arrow-back"
          onIconClicked={Actions.pop}
          elevation={1}
        />
            <ScrollView>
              <View style={styles.avatarContent}>
                <View style={styles.content2}>
                  <Image style={styles.avatar} source={{uri: this.props.user.avatar.thumbnail }}/>
                  { loading }
                  <TouchableNativeFeedback onPress={() => Alert.alert(
                    'Imagen de la mascota',
                    'Seleccione desde el origen de la imagen',
                    [
                      {text: 'Camara', onPress: this.selectAvatar2.bind(this)},
                      {text: 'Galeria', onPress: this.selectAvatar.bind(this)},
                    ]
                  )}>
                    <View style={[styles.changeAvatar, utilities.color_primary]}>
                      <Icon name="photo-camera" size={25} color="white" />
                    </View>
                  </TouchableNativeFeedback>
                </View>
              </View>
              <View style={styles.data} elevation={1}>
                <Text style={styles.item}>{ this.props.user.name } { this.props.user.last_name }</Text>
                <TouchableNativeFeedback onPress={editName}>
                  <View style={{padding: 15}}>
                    <Icon name="edit" size={20} color="#08AE9E" />
                  </View>
                </TouchableNativeFeedback>
              </View>
              <View style={styles.data} elevation={1}>
                <Text style={styles.item}>Telefono: { this.props.user.phone }</Text>
                <TouchableNativeFeedback onPress={editPhone}>
                  <View style={{padding: 15}}>
                    <Icon name="edit" size={20} color="#08AE9E" />
                  </View>
                </TouchableNativeFeedback>
              </View>

              <View style={styles.data} elevation={1}>
                <Text style={styles.item}>{ this.props.user.email }</Text>
                <TouchableNativeFeedback onPress={editEmail}>
                  <View style={{padding: 15}}>
                    <Icon name="edit" size={20} color="#08AE9E" />
                  </View>
                </TouchableNativeFeedback>
              </View>

              <View style={styles.data} elevation={1}>
                <Text style={styles.item}>{ this.props.user.documentation }</Text>
                <TouchableNativeFeedback onPress={editDocument}>
                  <View style={{padding: 15}}>
                    <Icon name="edit" size={20} color="#08AE9E" />
                  </View>
                </TouchableNativeFeedback>
              </View>

            </ScrollView>
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
    backgroundColor: '#f7f7f7'
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
