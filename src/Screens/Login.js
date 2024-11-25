import React, { useState } from 'react';
import { View, Text, ImageBackground, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Colors } from '../Colors';
import Button from '../components/Button';
import CustomTitle from '../components/CustomTitle';
import BackArrowButton from '../components/BackArrowButton';
import CustomTextInput from '../components/CustomTextInput';
import { auth } from '../components/Configuration';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Login function to authenticate user with Firebase
  const onSubmit = () => {
    if (email.trim() === '' || password.trim() === '') {
      Alert.alert('Error', 'Please fill in both email and password fields.');
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        Alert.alert('Login Successful');
        navigation.navigate('MainHome');
        setEmail('');
        setPassword('');
      })
      .catch((error) => {
        Alert.alert('Login Failed', error.message);
      });
  };

  return (
    <ImageBackground source={require('../../assets/Images/bg.png')} style={styles.container}>
      {/* Back Button */}
      <BackArrowButton onPress={() => navigation.goBack()} />

      {/* Title Section */}
      <CustomTitle firstTitle="Welcome" secondTitle="Back!" />

      {/* Email Input */}
      <CustomTextInput
        iconName="email"
        iconType="Fontisto"
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />

      {/* Password Input */}
      <CustomTextInput
        iconName="lock"
        iconType="AntDesign"
        placeholder="Password"
        secureTextEntry={!showPassword}
        value={password}
        onChangeText={setPassword}
      />

      {/* Login Button */}
      <View style={{ marginTop: 20, marginHorizontal: 40 }}>
        <Button title="LOG IN" onPress={onSubmit} />
      </View>

      {/* Sign Up Link */}
      <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 30 }}>
        <Text style={{ color: 'white' }}>Not have an Account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
          <Text style={{ color: Colors.pink, marginHorizontal: 5 }}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  titleContainer: {
    marginHorizontal: 30,
    marginTop: 20,
  },
  title: {
    fontSize: 50,
    color: 'white',
  },
  titleHighlight: {
    fontSize: 50,
    color: Colors.pink,
    fontWeight: 'bold',
  },
  inputContainer: {
    backgroundColor: '#5d5b5b',
    flexDirection: 'row',
    alignItems: 'center',
    margin: 20,
    padding: 10,
    borderRadius: 15,
  },
  icon: {
    marginHorizontal: 10,
  },
  textInput: {
    flex: 1,
    color: 'white',
    marginHorizontal: 10,
    fontSize: 16,
  },
});

export default Login;
