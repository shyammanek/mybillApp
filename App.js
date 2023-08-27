import React, {Component} from 'react';

import HomeScreen from './src/Screens/HomeScreen';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HistoryScreen from './src/Screens/History';
import AddMenuItemScreen from './src/Screens/AddMenuItemScreen';
import CreateOrderScreen from './src/Screens/CreateOrderScreen';
import IoniIcons from 'react-native-vector-icons/Ionicons';


import * as Database from './src/Storage/Database';

// const realm = Database.getRealmInstance();

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import Profile from './src/Screens/Profile';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export default class App extends Component {
  
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator 
          screenOptions={{
            headerShown: false
          }}>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
          />
          <Stack.Screen
            options={{
              tabBarLabel: 'History',
            }}
            name="HistoryScreen"
            component={HistoryScreen}
          />
          <Stack.Screen
            name="AddMenuItemScreen"
            component={AddMenuItemScreen}
          />
          <Stack.Screen
            name="CreateOrderScreen"
            component={CreateOrderScreen}
          />
          <Stack.Screen
            name="Profile"
            component={Profile}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
