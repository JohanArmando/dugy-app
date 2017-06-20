import React, { Component } from 'react';
import { View, Animated, ActivityIndicator, DatePickerAndroid, Text, ToastAndroid, TouchableHighlight, ScrollView, Alert, ToolbarAndroid, Picker, Image,TouchableNativeFeedback, StatusBar, StyleSheet, TextInput } from 'react-native';
import { Actions } from 'react-native-router-flux';
import ImagePicker from 'react-native-image-crop-picker'
import DatePicker from 'react-native-datepicker';
import { updatePet } from '../../services/petsServices';
import Icon from 'react-native-vector-icons/MaterialIcons';
import moment from 'moment';
import Dimensions from 'Dimensions';
const {width, height} = Dimensions.get('window');
require('moment/locale/es.js');

var utilities = require('../../assets/css/utilities');

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



export default class Home extends Component {

  constructor(props) {
    super();
    this.updatePet = props.updatePet;
    this.state = {
      name: props.pet.name,
      race: props.pet.race.id,
      size: props.pet.size.id,
      avatar: props.pet.avatar.thumbnail,
      date: props.pet.born_date,
      text: props.pet.comments,
      gender: props.pet.gender,
      original_name: props.pet.name,
      original_text: props.pet.comments,
      imageloader: false,
      modalType: 'race',
      openModal: true,
      opacity: new Animated.Value(0),
      height: new Animated.Value(0),
      width: new Animated.Value(0),
      slide: new Animated.Value(-500),
      loading: false,
      avatarSource: props.pet.photos[0].thumbnail,
      races: [{
        id: 1,
        name: 'ninguna'
      }],
      sizes: [{
        id: 1,
        name: 'ninguna'
      }]
    };
    this.opacityInterpolate = this.state.opacity.interpolate({
        inputRange: [0,100],
        outputRange: [0,1]
    });
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
        let source = { uri: 'data:image/jpeg;base64,' + response.data };
        this.setState({
          imageloader: true
        });
        updatePet({id: this.props.pet.id, avatar: {avatar: source.uri, name: 'avatar'} })
        .then(pet => {
          this.updatePet(pet);
          ToastAndroid.show('Se ha actualizado el avatar de la mascota', ToastAndroid.SHORT);
          this.setState({
            imageloader: false
          });
        })
        .catch((err) => {
          ToastAndroid.show('no se ha podido actualizar el avatar de la mascota', ToastAndroid.SHORT);
          this.setState({
            imageloader: false
          });
        });

      }
    });
  }
  showModal()
  {
    if (this.state.openModal) {
      Animated.sequence([
        Animated.timing(this.state.width, {
          toValue: width,
          duration: 0
        }),
        Animated.timing(this.state.opacity, {
          toValue: 100,
          duration: 250
        })
      ]).start();
      Animated.timing(this.state.slide, {
        toValue: 0,
        duration: 250
      }).start();


    } else {
      Animated.sequence([
        Animated.timing(this.state.opacity, {
          toValue: 0,
          duration: 250
        }),
        Animated.timing(this.state.width, {
          toValue: 0,
          duration: 0
        })
      ]).start();
      Animated.timing(this.state.slide, {
        toValue: -500,
        duration: 250
      }).start();
    }
    this.setState({openModal: !this.state.openModal});
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
        let source = { uri: 'data:image/jpeg;base64,' + response.data };
        // console.log(response)
        this.setState({
          imageloader: true
        });
        updatePet({id: this.props.pet.id, avatar: {avatar: source.uri, name: 'avatar'} })
        .then(pet => {
          this.updatePet(pet);
          ToastAndroid.show('Se ha actualizado el avatar de la mascota', ToastAndroid.SHORT);
          this.setState({
            imageloader: false
          });
        })
        .catch((err) => {
          ToastAndroid.show('no se ha podido actualizar el avatar de la mascota', ToastAndroid.SHORT);
          this.setState({
            imageloader: false
          });
        });
      }
    });
  }

  modalRace () {
    this.setState({modalType: 'race'});
    this.showModal();
  }
  modalSize () {
    this.setState({modalType: 'size'});
    this.showModal();
  }
  modalGender () {
    this.setState({modalType: 'gender'});
    this.showModal();
  }
  // <ToolbarAndroid
  //    style={utilities.toolbar}
  //    title="Creando mascota..."
  //    navIcon={require('../../assets/images/back.png')}
  //    onActionSelected={this.sendPet.bind(this)}
  //    titleColor="#FFF"
  //    onIconClicked={Actions.pop}
  //    elevation={1}/>

  render (){
    var contentModal;
    var age;
    var raceName;
    var sizeName;
    var gender;
    var genders = (
      <View>
        <TouchableNativeFeedback onPress={
          () => {
            updatePet({id: this.props.pet.id, gender: 1})
            .then(pet => {
              this.updatePet(pet);
              this.showModal();
              ToastAndroid.show('Se ha actualizado el sexo de la mascota', ToastAndroid.SHORT);
            })
            .catch((err) => {
              ToastAndroid.show('no se ha podido actualizar la raza de la mascota', ToastAndroid.SHORT);
              this.showModal();
            });
          }
        }>
          <View style={{paddingLeft: 15, paddingRight: 15, paddingTop: 10, paddingBottom: 10, borderBottomWidth: 1, borderColor: '#EEF6F9'}}>
            <Text style={{fontSize: 20, color: '#6d6d6d'}}>Macho</Text>
          </View>
        </TouchableNativeFeedback>
        <TouchableNativeFeedback onPress={
          () => {
            updatePet({id: this.props.pet.id, gender: 0})
            .then(pet => {
              this.updatePet(pet);
              this.showModal();
              ToastAndroid.show('Se ha actualizado el sexo de la mascota', ToastAndroid.SHORT);
            })
            .catch((err) => {
              ToastAndroid.show('no se ha podido actualizar la raza de la mascota', ToastAndroid.SHORT);
              this.showModal();
            });
          }
        }>
          <View style={{paddingLeft: 15, paddingRight: 15, paddingTop: 10, paddingBottom: 10}}>
            <Text style={{fontSize: 20, color: '#6d6d6d'}}>Hembra</Text>
          </View>
        </TouchableNativeFeedback>
      </View>
    );
    if (this.props.pet.gender == -1) {
      gender = (
        <Text style={{fontSize: 20, color: '#CCC'}}>Seleccionar sexo</Text>
      );
    } else if (this.props.pet.gender == 1) {
      gender = (
        <Text style={{fontSize: 20, color: '#6d6d6d'}}>Macho</Text>
      );
    } else {
      gender = (
        <Text style={{fontSize: 20, color: '#6d6d6d'}}>Hembra</Text>
      );
    }
    raceName = this.props.races.filter(r => {
      if (r.id == this.props.pet.race.id) {
        return r;
      }
    });
    if (raceName.length == 0) {
      raceName = (

          <Text style={{fontSize: 20, color: '#CCC'}}>Seleccionar raza</Text>

      );
    } else {
      raceName = (

          <Text style={{fontSize: 20, color: '#6d6d6d'}}>{raceName[0].name}</Text>

      );
    }

    sizeName = this.props.sizes.filter(r => {
      if (r.id == this.props.pet.size.id) {
        return r;
      }
    });
    if (sizeName.length == 0) {
      sizeName = (
        <Text style={{fontSize: 20, color: '#CCC'}}>Seleccionar tamaño</Text>
      );
    } else {
      sizeName = (
        <Text style={{fontSize: 20, color: '#6d6d6d'}}>{sizeName[0].name}</Text>
      );
    }


    if (this.state.date != '') {
      age = moment().diff(this.props.pet.born_date, 'years');
      if (age == 0) {
        age = moment().diff(this.state.date, 'months');
        if (age > 1) {
          age = (
            <Text style={{fontSize: 20, color: '#6d6d6d'}}>{age + ' meses'}</Text>
          );
        } else {
          age = (
            <Text style={{fontSize: 20, color: '#6d6d6d'}}>{age + ' mes'}</Text>
          );
        }
      } else {
        if (age == 1) {
          age = (
            <Text style={{fontSize: 20, color: '#6d6d6d'}}>{age + ' año'}</Text>
          );
        } else {
          age = (
            <Text style={{fontSize: 20, color: '#6d6d6d'}}>{age + ' años'}</Text>
          );
        }
      }
    } else {
      age = (
        <Text style={{fontSize: 20, color: '#ccc'}}>Agregar edad</Text>
      );
    }
    let races = this.state.races.map( (race, i) => {
      return (
        <View key={i}>
          <Text>{race.name}</Text>
        </View>
      );

    });

    if (this.props.races.length > 0) {
      races = this.props.races.map( (race, i) => {
        if (i == 0) {
          return (
            <TouchableNativeFeedback key={i} onPress={
              () => {
                updatePet({id: this.props.pet.id, race: race.id})
                .then(pet => {
                  this.updatePet(pet);
                  this.showModal();
                  ToastAndroid.show('Se ha actualizado la raza de la mascota', ToastAndroid.SHORT);
                })
                .catch((err) => {
                  ToastAndroid.show('no se ha podido actualizar la raza de la mascota', ToastAndroid.SHORT);
                  this.showModal();
                });
              }
            }>
              <View style={{paddingLeft: 15, paddingRight: 15, paddingTop: 10, paddingBottom: 10}}>
                <Text style={{fontSize: 20, color: '#6d6d6d'}}>{race.name}</Text>
              </View>
            </TouchableNativeFeedback>
          );
        }
        return (
          <TouchableNativeFeedback key={i}
          onPress={
            () => {
              updatePet({id: this.props.pet.id, race: race.id})
              .then(pet => {
                this.updatePet(pet);
                this.showModal();
                ToastAndroid.show('Se ha actualizado la raza de la mascota', ToastAndroid.SHORT);
              })
              .catch((err) => {
                ToastAndroid.show('no se ha podido actualizar la raza de la mascota', ToastAndroid.SHORT);
                this.showModal();
              });
            }
          }
          >
            <View style={{paddingLeft: 15, paddingRight: 15, paddingTop: 10, paddingBottom: 10, borderTopWidth: 1, borderColor: '#EEF6F9'}}>
              <Text style={{fontSize: 20, color: '#6d6d6d'}}>{race.name}</Text>
            </View>
          </TouchableNativeFeedback>
        );
      });
    }
    let sizes = this.state.sizes.map( (size, i) => {
      return <Picker.Item key={i} value={size.id} label={size.name} style={styles.picker}/>
    });
    if (this.props.sizes.length > 0) {
      sizes = this.props.sizes.map( (size, i) => {
        if (i == 0) {
          return (
            <TouchableNativeFeedback key={i} onPress={
              () => {
                updatePet({id: this.props.pet.id, size: size.id})
                .then(pet => {
                  this.showModal();
                  this.updatePet(pet);
                  ToastAndroid.show('Se ha actualizado el tamaño de la mascota', ToastAndroid.SHORT);
                })
                .catch((err) => {
                  ToastAndroid.show('no se ha podido actualizar el tamaño de la mascota', ToastAndroid.SHORT);
                  this.showModal();
                });
              }
            }>
              <View style={{paddingLeft: 15, paddingRight: 15, paddingTop: 10, paddingBottom: 10}}>
                <Text style={{fontSize: 20, color: '#6d6d6d'}}>{size.name}</Text>
              </View>
            </TouchableNativeFeedback>
          );
        }
        return (
          <TouchableNativeFeedback key={i} onPress={
            () => {
              updatePet({id: this.props.pet.id, size: size.id})
              .then(pet => {
                this.showModal();
                this.updatePet(pet);
                ToastAndroid.show('Se ha actualizado el tamaño de la mascota', ToastAndroid.SHORT);
              })
              .catch((err) => {
                ToastAndroid.show('no se ha podido actualizar el tamaño de la mascota', ToastAndroid.SHORT);
                this.showModal();
              });
            }
          }>
            <View style={{paddingLeft: 15, paddingRight: 15, paddingTop: 10, paddingBottom: 10, borderTopWidth: 1, borderColor: '#EEF6F9'}}>
              <Text style={{fontSize: 20, color: '#6d6d6d'}}>{size.name}</Text>
            </View>
          </TouchableNativeFeedback>
        );
      });
    }
    if (this.props.pet.avatar.thumbnail === '') {
      var image = (
        <View style={[styles.avatar,{backgroundColor: 'rgba(0,0,0,0.5)'}]}>
          <Icon name="add-a-photo" size={50} color="white" />
          <Text style={
            {
              color: '#fff',
              fontSize: 18,
              textShadowColor: 'rgba(0, 0, 0, 0.5)',
              textShadowRadius: 5,
              textShadowOffset: {
                height: 1,
                width: 0
              }
            }
          }>Agregar imagen</Text>
        </View>
      );
    } else {
      let load;
      if (this.state.imageloader) {
        load = (
          <ActivityIndicator
            animating={true}
            color="white"
            style={[styles.centering, {height: 150}]}
            size="large"
          />
        );
      }
      var image = (
        <Image style={[styles.avatar, {resizeMode: 'cover'}]} source={{uri: this.props.pet.avatar.thumbnail }}>
          {load}
        </Image>
      );
    }
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
              <Text style={utilities.text_lg}>Creando mascota...</Text>
            </View>
        </View>
      );
    }
    if (this.state.modalType == 'race') {
      contentModal = races;
    } else if(this.state.modalType == 'size') {
      contentModal = sizes;
    } else {
      contentModal = genders;
    }
    return (
      <View style={utilities.container}>
        <StatusBar
          backgroundColor="#1e9284"
          barStyle="light-content"
        />
          <Icon.ToolbarAndroid
            style={utilities.toolbar}
            title={'Editar ' + this.props.pet.name}
            titleColor="white"
            navIconName="arrow-back"
            onIconClicked={Actions.pop}
          />
          <ScrollView>

          <View style={styles.container}>
            <View style={{marginBottom: 20}}>
                {image}
            </View>
            <TouchableNativeFeedback onPress={() => Alert.alert(
              'Imagen de la mascota',
              'Seleccione desde el origen de la imagen',
              [
                {text: 'Camara', onPress: this.selectAvatar2.bind(this)},
                {text: 'Galeria', onPress: this.selectAvatar.bind(this)},
              ]
            )}>
              <View elevation={10} style={[styles.changeAvatar, utilities.color_primary]}>
                <Icon name="add-a-photo" size={25} color="white" />
              </View>
            </TouchableNativeFeedback>
              <View style={[{paddingTop: 15, paddingLeft: 10, paddingBottom: 10,alignItems: 'center', paddingRight: 10, flexDirection: 'row', justifyContent: 'flex-start', borderBottomWidth: 1, borderColor: '#EEF6F9'}]}>

                <View style={{marginLeft: 10, marginRight: 10}}>
                  <Text style={{marginLeft: 5,fontSize: 16, color: '#ccc'}}>Nombre</Text>
                  <TextInput
                    style={{width: '100%', fontSize: 20, color: '#6d6d6d'}}
                    autoCapitalize = 'words'
                    onChangeText={(name) => this.setState({name: name})}
                    onEndEditing = {
                      () => {
                        if (this.props.pet.name != this.state.name) {
                          updatePet({id: this.props.pet.id, name: this.state.name})
                          .then(pet => {
                            this.updatePet(pet);
                            ToastAndroid.show('Se ha actualizado el nombre de la mascota', ToastAndroid.SHORT);
                          })
                          .catch((err) => {
                            ToastAndroid.show('no se ha podido actualizar el nombre de la mascota', ToastAndroid.SHORT);
                          });
                        }
                      }
                    }
                    value={this.state.name}
                    placeholder="Ingresar nombre"
                    placeholderTextColor="#ccc"
                    underlineColorAndroid="transparent"

                  />
                </View>
              </View>
              <TouchableNativeFeedback onPress={this.modalGender.bind(this)}>
              <View style={[{paddingTop: 15, paddingLeft: 10, paddingBottom: 20,alignItems: 'center', paddingRight: 20, flexDirection: 'row', justifyContent: 'flex-start', borderBottomWidth: 1, borderColor: '#EEF6F9'}]}>

                <View style={{marginLeft: 10, marginRight: 10, width: '100%'}}>
                  <Text style={{marginLeft: 5,fontSize: 16, color: '#ccc', marginBottom: 10}}>Sexo</Text>
                  <View style={{marginLeft: 5, flexDirection: 'row', justifyContent: 'space-between'}}>
                    {gender}
                  </View>
                </View>
              </View>
              </TouchableNativeFeedback>
              <TouchableNativeFeedback onPress={this.modalRace.bind(this)}>
              <View style={[{paddingTop: 15, paddingLeft: 10, paddingBottom: 20,alignItems: 'center', paddingRight: 20, flexDirection: 'row', justifyContent: 'flex-start', borderBottomWidth: 1, borderColor: '#EEF6F9'}]}>

                <View style={{marginLeft: 10, marginRight: 10, width: '100%'}}>
                  <Text style={{marginLeft: 5,fontSize: 16, color: '#ccc', marginBottom: 10}}>Raza</Text>
                  <View style={{marginLeft: 5, flexDirection: 'row', justifyContent: 'space-between'}}>
                    {raceName}
                  </View>
                </View>
              </View>
              </TouchableNativeFeedback>
              <View style={[{paddingTop: 15, paddingLeft: 10, paddingBottom: 20,alignItems: 'center', paddingRight: 30, flexDirection: 'row', justifyContent: 'flex-start', borderBottomWidth: 1, borderColor: '#EEF6F9'}]}>

                <View style={{marginLeft: 10, marginRight: 10, width: '100%'}}>
                  <Text style={{marginLeft: 5,fontSize: 16, color: '#ccc'}}>Edad (Fecha de nacimiento)</Text>
                  <View style={{marginLeft: 5, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                    {age}
                    <DatePicker
                      date={this.state.date}
                      mode="date"
                      placeholder="Seleccionar fecha"
                      format="YYYY-MM-DD"
                      minDate="2010-01-01"
                      maxDate={moment().format('YYYY-MM-DD')}
                      iconComponent={
                        <View style={{backgroundColor: '#1e9284', width: 40, height: 40, borderRadius: 100, justifyContent: 'center', alignItems: 'center'}}>
                          <Icon name="date-range" size={20} color="white" />
                        </View>
                      }
                      customStyles={{
                        dateInput: {
                          borderWidth: 0,
                          borderBottomWidth: 0,
                          backgroundColor: '#1e9284',
                          width: 0,
                          height: 0,
                          borderRadius: 5
                        },
                        placeholderText: {
                          color: '#FFF'
                        }
                      }}
                      confirmBtnText="Seleccionar"
                      cancelBtnText="Cancelar"
                      hideText={true}
                      onDateChange={(date) => {
                        updatePet({id: this.props.pet.id, born_date: moment.utc(moment(date).format()).format()})
                        .then(pet => {
                          this.updatePet(pet);
                          ToastAndroid.show('Se ha actualizado la edad de la mascota', ToastAndroid.SHORT);
                        })
                        .catch((err) => {
                          ToastAndroid.show('no se ha podido actualizar la edad de la mascota', ToastAndroid.SHORT);
                        });
                      }}
                    />
                  </View>
                </View>
              </View>
              <TouchableNativeFeedback onPress={this.modalSize.bind(this)}>
                <View style={[{paddingTop: 15, paddingLeft: 10, paddingBottom: 20,alignItems: 'center', paddingRight: 60, flexDirection: 'row', justifyContent: 'flex-start', borderBottomWidth: 1, borderColor: '#EEF6F9'}]}>

                  <View style={{marginLeft: 10, marginRight: 10, width: '100%'}}>
                    <Text style={{marginLeft: 5,fontSize: 16, color: '#ccc', marginBottom: 10}}>Tamaño</Text>
                    <View style={{marginLeft: 5, flexDirection: 'row', justifyContent: 'space-between'}}>
                      {sizeName}
                    </View>
                  </View>
                </View>
              </TouchableNativeFeedback>

              <View style={[{paddingTop: 15, paddingLeft: 10, paddingBottom: 10,alignItems: 'center', paddingRight: 10, flexDirection: 'row', justifyContent: 'flex-start', borderBottomWidth: 1, borderColor: '#EEF6F9'}]}>

                <View style={{marginLeft: 10, marginRight: 10}}>
                  <Text style={{marginLeft: 5,fontSize: 16, color: '#ccc'}}>Comentario</Text>
                  <TextInput
                    style={{width: '100%', fontSize: 16, color: '#6d6d6d'}}
                    multiline={true}
                    numberOfLines={4}
                    onChangeText={(text) => this.setState({text})}
                    value={this.state.text}
                    placeholder="Ingresar comentario"
                    placeholderTextColor="#ccc"
                    autoCapitalize = 'sentences'
                    underlineColorAndroid="transparent"
                    onEndEditing = {
                      () => {
                        if (this.props.pet.comments != this.state.text) {
                          updatePet({id: this.props.pet.id, comments: this.state.text})
                          .then(pet => {
                            this.updatePet(pet);
                            ToastAndroid.show('Se ha actualizado el comentario acerca de la mascota', ToastAndroid.SHORT);
                          })
                          .catch((err) => {
                            ToastAndroid.show('no se ha podido actualizar el comentario acerca de la mascota', ToastAndroid.SHORT);
                          });
                        }
                      }
                    }

                  />
                </View>
              </View>
          </View>
          </ScrollView>
          <TouchableNativeFeedback onPress={this.showModal.bind(this)}>
            <Animated.View style={{opacity: this.opacityInterpolate, position: 'absolute', top: 0, backgroundColor: 'rgba(0,0,0,0.5)', width: this.state.width, height: '100%'}}>
              <TouchableNativeFeedback>
                <Animated.View style={{position: 'absolute', bottom: this.state.slide, width: '100%', backgroundColor: '#fff'}}>
                  {contentModal}
                </Animated.View>
              </TouchableNativeFeedback>
            </Animated.View>
          </TouchableNativeFeedback>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  letter: {
    fontSize: 20,
    color: '#FFF'
  },
  container1: {
    flex: 1,
  },
  inputText: {
    fontSize: 22
  },
  changeAvatar: {
    width: 60,
    height: 60,
    borderRadius: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 190,
    right: 20
  },
  picker: {
    borderBottomWidth: 0,
    borderColor: '#ccc',
    fontSize: 20,
    color: '#6d6d6d'
  },
  avatar: {
    width: '100%',
    height: 220,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {

  },
  input: {
    flex: 1,
    marginRight: 10,
    marginLeft: 10
  },
  margins: {
    marginRight: 10,
    marginLeft: 10
  }
});
