import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import { Router, Scene } from 'react-native-router-flux';
import Splash from './Splash/Splash';
import Welcome from './Welcome/Welcome';
import Login from './Login/Login';
import Home from './Home/Home';
import WalksCreate from './Walks/WalksCreate';
import DrawerLayout from './DrawerLayout/DrawerLayout';
import {Actions} from 'react-native-router-flux';
import { AsyncStorage } from 'react-native';
import App from './app';
import PlanIndex from './Plans/PlanIndex';


export default class MrDoggy extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logged: false,
      loading: true,
    };

  }
  componentWillMount(){
    AsyncStorage.getItem("current_user")
      .then((value) => {
        if (value != null) {
          this.setState({
            logged: true,
            loading: false,
          });
        } else  {
          this.setState({
            loading: false,
          })
        }
      })
  }
  render() {
    if (this.state.loading) {
      return <View><Text> loading </Text></View>;
    }

    return (
      <Router>
        <Scene key="root">
          <Scene key="Welcome" component={Welcome}  title="Welcome" initial={!this.state.logged} hideNavBar='true'  />
          <Scene key="home" component={DrawerLayout}  initial={this.state.logged} hideNavBar='true' />
          <Scene key="login" component={Login} title="Login" />
          <Scene key="WalksCreate" component={WalksCreate} title="WalksCreate" />
          <Scene key="PlanIndex" component={PlanIndex} title="PlanIndex" />
          <Scene key="App" component={App} title="App" hideNavBar={true} />
        </Scene>
      </Router>
    );

  }
}
AppRegistry.registerComponent('MrDoggy', () => MrDoggy);
