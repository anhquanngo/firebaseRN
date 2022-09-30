/* eslint-disable no-shadow */
/* eslint-disable react-native/no-inline-styles */
import {View, Text, Alert} from 'react-native';
import React, {useState} from 'react';
import {TextInput} from 'react-native';
import {TouchableOpacity} from 'react-native';
import filebaseApp from './FireConfig';
import {getAuth, createUserWithEmailAndPassword} from 'firebase/auth';

export default function RegisterScreen(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handelRegister = () => {
    const auth = getAuth(filebaseApp);
    createUserWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        // Signed in
        const user = userCredential.user;
        console.log('🚀 ~ handelRegister ~ user', user);
        Alert.alert('Alert Title', 'Đăng ký thành công: ' + email, [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {text: 'OK', onPress: () => props.navigation.navigate('LoginScreen')},
        ]);
        // ...
        setEmail('');
        setPassword('');
      })
      .catch(error => {
        console.log('🚀 ~ handelRegister ~ error', error);
        Alert.alert('Alert Title', 'Đăng ký thất bại', [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ]);
      });
  };
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{color: 'blue', fontSize: 40}}>REGISTER</Text>
      <TextInput
        style={{
          width: '90%',
          margin: 10,
          height: 40,
          borderColor: 'gray',
          borderWidth: 1,
        }}
        onChangeText={email => setEmail(email)}
        value={email}
      />
      <TextInput
        style={{
          width: '90%',
          margin: 10,
          height: 40,
          borderColor: 'gray',
          borderWidth: 1,
        }}
        secureTextEntry={true}
        onChangeText={password => setPassword(password)}
        value={password}
      />
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity
          onPress={() => handelRegister()}
          style={{backgroundColor: 'green', padding: 10}}>
          <Text style={{color: '#fff'}}>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
