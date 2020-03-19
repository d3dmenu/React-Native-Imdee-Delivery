import * as React from 'react';

import SpashPage from '../Components/SpashPage.js';
import LoginPage from '../Components/LoginPage.js';
import HomePage from '../Components/HomePage.js';
import StatusPage from '../Components/StatusPage.js';
import StatusPageOrder from '../Components/StatusPageOrder.js';

import { createAppContainer,createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

const Login = createStackNavigator({
  LoginScreen:{screen:LoginPage,navigationOptions: {header: null}},
});


const Home = createStackNavigator({
  HomeScreen:{screen:HomePage,navigationOptions: {header: null}},
})

const navigate = createSwitchNavigator({
  SpashScreen:{screen:SpashPage,navigationOptions: {header: null}},
  FirstScreen:{screen:Login,navigationOptions: {header: null}},
  SecondScreen:{screen:Home,navigationOptions: {header: null}},
  ThirdScreen:{screen:StatusPage,navigationOptions: {header: null}},
  FourScreen:{screen:StatusPageOrder,navigationOptions: {heade: null}},
});

export default createAppContainer(navigate);
