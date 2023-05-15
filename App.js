import React, {Component} from 'react';

import HomeScreen from './src/Screens/HomeScreen';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HistoryScreen from './src/Screens/History';
import AddMenuItemScreen from './src/Screens/AddMenuItemScreen';
import CreateOrderScreen from './src/Screens/CreateOrderScreen';

import * as Database from './src/Storage/Database';

// const realm = Database.getRealmInstance();

const Tab = createBottomTabNavigator();

import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';

export default class App extends Component {
  
  render() {
    return (
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="AddMenuItemScreen"
          tabBarOptions={{
            activeTintColor: '#000000',
            inactiveTintColor: '#999999',
            labelStyle: {
              fontSize: 16,
            },
            style: {
              backgroundColor: '#ffffff',
            },
          }}>
          <Tab.Screen
            name="Home"
            component={HomeScreen}
            options={{
              tabBarLabel: 'Home',
            }}
          />
          <Tab.Screen
            options={{
              tabBarLabel: 'History',
            }}
            name="HistoryScreen"
            component={HistoryScreen}
          />
          <Tab.Screen
            name="AddMenuItemScreen"
            options={{
              tabBarLabel: 'Menu',
            }}
            component={AddMenuItemScreen}
          />
          <Tab.Screen
            name="CreateOrderScreen"
            options={{
              tabBarLabel: 'Create Order',
            }}
            component={CreateOrderScreen}
          />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }
}
