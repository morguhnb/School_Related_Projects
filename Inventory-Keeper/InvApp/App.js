import React, {useState} from 'react';
import { View, Text } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';




import HomeScreen from './components/HomeScreen';
import LoginPage from './components/LoginPage';
import ItemDetails from './components/ItemDetails';
import ListItem from './components/ListItem';
import AddItem from './components/AddItem';
import LearnMore from './components/LearnMore';
import WelcomePage from './components/WelcomePage';


const RootStack = createStackNavigator(
  {
    Home: HomeScreen,
    WelcomePage: WelcomePage,
    AddItem: AddItem,
    ListItem: ListItem, 
    ItemDetails: ItemDetails,
    LearnMore: LearnMore,


  },
  {
    initialRouteName: 'WelcomePage',
  },

);

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}

