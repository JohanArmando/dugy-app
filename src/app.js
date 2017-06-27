import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text,  View } from 'react-native';
import { Router, Scene, Actions } from 'react-native-router-flux';
import Welcome from './redux/containers/WelcomeContainer';
import Login from './redux/containers/LoginContainer';
import Register from './redux/containers/RegisterContainer';
import Home from './redux/containers/HomeContainer';
import MyPets from './redux/containers/MyPetsContainer';
import CreatePet from './redux/containers/CreatePetContainer';
import Profile from './redux/containers/ProfileContainer';
import Pays from './redux/containers/PaysContainer';
import MethodPays from './redux/containers/MethodPaysContainer';
import EditProfile from './redux/containers/EditProfileContainer';
import ProfilePet from './redux/containers/ProfilePetContainer';
import ViewProfilePet from './redux/containers/ViewProfilePetContainer';
import ServiceDetails from './redux/containers/ServiceDetailsContainer';
import WalkerProfile from './redux/containers/WalkerProfileContainer';
import PhotosPet from './redux/containers/PhotosPetContainer';
import MyDates from './redux/containers/MyDatesContainer';
import MyDatesHistory from './redux/containers/MyDatesHistoryContainer';
import CreateWalk from './redux/containers/CreateWalkContainer';
import CreateWalk2 from './redux/containers/CreateWalk2Container';
import Plans from './redux/containers/PlansContainer';
import Drawer from './components/Drawer/Drawer';
import { createStore } from 'redux'
import { Provider, connect } from 'react-redux'
import reducer from './redux/reducers'

const store = createStore(reducer)

const Scenes = Actions.create(

  <Scene key="root">
    <Scene key="Welcome" component={Welcome}  title="Welcome" initial={true} hideNavBar='true'/>
    <Scene key="Login" component={Login}  title="Login" hideNavBar='true'/>
    <Scene key="Register" component={Register}  title="Register" hideNavBar='true'/>
    <Scene key="Home" component={Home}  title="Home" hideNavBar='true'/>
    <Scene key="MyPets" component={MyPets}  title="MyPets" hideNavBar='true'/>
    <Scene key="Pays" component={Pays}  title="Pays" hideNavBar='true'/>
    <Scene key="MethodPays" component={MethodPays}  title="MethodPays" hideNavBar='true'/>
    <Scene key="CreatePet" component={CreatePet}  title="CreatePet" hideNavBar='true'/>
    <Scene key="Profile" component={Profile}  title="Profile" hideNavBar='true'/>
    <Scene key="EditProfile" component={EditProfile}  title="EditProfile" hideNavBar='true'/>
    <Scene key="ProfilePet" component={ProfilePet}  title="ProfilePet" hideNavBar='true'/>
    <Scene key="ViewProfilePet" component={ViewProfilePet}  title="ViewProfilePet" hideNavBar='true'/>
    <Scene key="ServiceDetails" component={ServiceDetails}  title="ServiceDetails" hideNavBar='true'/>
    <Scene key="WalkerProfile" component={WalkerProfile}  title="WalkerProfile" hideNavBar='true'/>
    <Scene key="CreateWalk" component={CreateWalk}  title="CreateWalk" hideNavBar='true'/>
    <Scene key="CreateWalk2" component={CreateWalk2}  title="CreateWalk2" hideNavBar='true'/>
    <Scene key="Plans" component={Plans}  title="Plans" hideNavBar='true'/>
    <Scene key="MyDates" component={MyDates}  title="MyDates" hideNavBar='true'/>
    <Scene key="PhotosPet" component={PhotosPet}  title="PhotosPet" hideNavBar='true'/>
    <Scene key="MyDatesHistory" component={MyDatesHistory}  title="MyDatesHistory" hideNavBar='true'/>
  </Scene>
);

const ConnectedRouter = connect()(Router);

export default class MrDoggy extends Component {
  render() {
    return (
      <Provider store={store}>
        <Drawer>
          <ConnectedRouter scenes={Scenes}/>
        </Drawer>
      </Provider>
    );
  }
}
AppRegistry.registerComponent('MrDoggy', () => MrDoggy);
