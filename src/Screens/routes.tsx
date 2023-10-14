import {StyleSheet, Text, View} from 'react-native';
import React, {useContext, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AuthState, {AuthContext} from './context/authContext';
import HomeScreen from './HomeScreen';
import HistoryScreen from './History';
import AddMenuItemScreen from './AddMenuItemScreen';
import CreateOrderScreen from './CreateOrderScreen';
import Profile from './Profile';
import BillPrintExample from './BillPrintExample';
import PreviewScreen from './PreviewScreen';
import Login from './Login';
import {UserActions} from '../Storage/Database';
import moment from 'moment';

const Stack = createNativeStackNavigator();

export default function Routes() {
  const user = useContext(AuthContext);

  useEffect(() => {
    let savedUser = UserActions.getUser();
    if (savedUser && savedUser.length > 0) {
      if (moment().diff(moment(savedUser[0].expiry), 'days') < 0) {
        user.setAuthenticated(false);
      } else {
        user.setUserData({
          expiry: savedUser[0].expiry,
          id: savedUser[0].id,
          fullName: savedUser[0].fullName,
        });
        user.setAuthenticated(true);
      }
    }
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        {user?.authenticated ? (
          <>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="HistoryScreen" component={HistoryScreen} />
            <Stack.Screen
              name="AddMenuItemScreen"
              component={AddMenuItemScreen}
            />
            <Stack.Screen
              name="CreateOrderScreen"
              component={CreateOrderScreen}
            />
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen
              name="BillPrintExample"
              component={BillPrintExample}
            />
            <Stack.Screen name="PreviewScreen" component={PreviewScreen} />
          </>
        ) : (
          <Stack.Screen name="Login" component={Login} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
