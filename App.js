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

import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import Profile from './src/Screens/Profile';

export default class App extends Component {
  
  render() {
    return (
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="AddMenuItemScreen"

          tabBarOptions={{
            activeTintColor: '#000000',
            inactiveTintColor: '#444',
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
              tabBarIcon: ({color, size}) => (
                <IoniIcons name="home" color={'#Faa'} size={18} />
              ),
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
              tabBarLabel: 'Order',
              ...{
                tabBarIcon: ({color, size}) => (
                  <IoniIcons name="create" color={'#Faa'} size={18} />
                ),
              },

            }}
            component={CreateOrderScreen}
          />
          <Tab.Screen
            name="Profile"
            options={{
              tabBarLabel: 'Profile',
              TabBarIcon: ({color, size}) => (
                <IoniIcons name="person" color={'#Faa'} size={18} />
              ),
            }}
            component={Profile}
          />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }
}
