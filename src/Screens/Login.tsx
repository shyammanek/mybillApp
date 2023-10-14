import {StyleSheet, Text, TextInput, ToastAndroid, View} from 'react-native';
import React, {useContext, useState} from 'react';
import CustText from './common/CustText';
import CustButton from './common/CustButton';
import {AuthContext} from './context/authContext';
import {loginUser} from '../Services/authServices';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const authState = useContext(AuthContext);

  const onLogin = async () => {
    if (username.length > 0 && password.length > 0) {
      const result = await loginUser({
        username,
        password,
      });
      if (result) {
        authState.setAuthenticated(true);
        authState.setUserData(result);
      } else {
        ToastAndroid.show('User does not exist', ToastAndroid.LONG);
      }
    } else {
      ToastAndroid.show('Enter valid details', ToastAndroid.LONG);
    }
  };

  return (
    <View style={styles.main}>
      <CustText bold fontSize={24}>
        Login
      </CustText>
      <TextInput
        value={username}
        style={styles.inputStyle}
        placeholder="Username"
        onChangeText={text => setUsername(text)}
      />
      <TextInput
        value={password}
        style={styles.inputStyle}
        placeholder="Password"
        secureTextEntry
        onChangeText={text => setPassword(text)}
      />
      <CustButton onPress={onLogin} style={styles.button}>
        Login
      </CustButton>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    paddingHorizontal: 28,
    marginVertical: 30,
  },
  button: {
    marginTop: 24,
  },
  inputStyle: {
    borderWidth: 1,
    marginTop: 28,
    borderRadius: 8,
    borderColor: 'grey',
    paddingHorizontal: 16,
  },
});
