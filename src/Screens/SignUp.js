import React, { useState } from 'react';
import { View, Text, ImageBackground, TouchableOpacity, Alert } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
import BackArrowButton from '../components/BackArrowButton';
import CustomTitle from '../components/CustomTitle';
import CustomTextInput from '../components/CustomTextInput';
import Button from '../components/Button';
import { auth, db } from '../components/Configuration';
import { Colors } from '../Colors';

const SignUp = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Sign-up function for Firebase authentication and Firestore
  const SignUpAccount = async () => {
    // Input validations
     if (name.trim() === '') {
      alert('Please enter your name.');
      return;
    }

    if (email.trim() === '') {
      alert('Please enter your email.');
      return;
    }

    if (password.trim() === '') {
      alert('Please enter your password.');
      return;
    }

    if (confirmPassword.trim() === '') {
      alert('Please confirm your password.');
      return;
    }

    if (password !== confirmPassword) {
      alert('Passwords do not match. Please re-enter.');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const userId = userCredential.user.uid;

      // Add user data to Firestore without image URL
      await setDoc(doc(db, "users", userId), {
        name,
        email,
      });

      Alert.alert('Your account has been created successfully!');
      navigation.navigate('Home'); // Navigate to the Home screen upon successful sign-up

      // Clear input fields
      setName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');

    } catch (error) {
      Alert.alert(error.message);
    }
  };

  return (
    <ImageBackground source={require('../../assets/Images/bg.png')} style={{ flex: 1 }}>
      <BackArrowButton onPress={() => navigation.goBack()} />
      <CustomTitle firstTitle="Create an" secondTitle="Account!" />

      <View style={{ marginHorizontal: 15 }}>
        <CustomTextInput
          iconName="person"
          iconType="Feather"
          placeholder="Username"
          value={name}
          onChangeText={(text)=>setName(text)}
        />
        <CustomTextInput
          iconName="email"
          iconType="AntDesign"
          placeholder="Email"
          value={email}
          onChangeText={(text)=>setEmail(text)}
        />
        <CustomTextInput
          iconName="lock"
          iconType="AntDesign"
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={(text)=>setPassword(text)}
        />
        <CustomTextInput
          iconName="lock"
          iconType="AntDesign"
          placeholder="Confirm Password"
          secureTextEntry
          value={confirmPassword}
          onChangeText={(text)=>setConfirmPassword(text)}
        />
      </View>

      <View style={{ marginTop: 10, marginHorizontal: 50 }}>
        <Button
          title="SIGN UP"
          onPress={SignUpAccount}
        />
      </View>

      <View style={{ flexDirection: 'row', justifyContent: "center", marginTop: 30 }}>
        <Text style={{ color: 'white' }}>Already Have an Account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={{ color: Colors.pink, marginHorizontal: 5 }}>Login</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default SignUp;
