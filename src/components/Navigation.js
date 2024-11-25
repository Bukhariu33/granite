import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator, DrawerContentScrollView } from '@react-navigation/drawer';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import FirstScreen from '../Screens/FirstScreen';
import Login from '../Screens/Login';
import SignUp from '../Screens/SignUp';
import MainHome from '../Screens/MainHome';
import Button from './Button';
import CreateInvoice from '../Screens/CreateInvoice';
import Invoice from '../Screens/Invoice';
import About from '../Screens/About';
import Terms from '../Screens/Terms';
import Policy from '../Screens/Policy';
import { Colors } from '../Colors';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

// Custom drawer content component
const CustomDrawerContent = (props) => (
  <DrawerContentScrollView {...props} style={{ backgroundColor: Colors.bgColor }}>
    {/* Profile Section */}
    <View style={{ alignItems: 'center', marginTop: 10 }}>
      <Image 
        source={require('../../assets/Images/profile.png')} 
        style={{ width: 80, height: 80, resizeMode: 'contain', borderRadius: 50 }} 
      />
      <Text style={{ color: 'white', marginTop: 10 }}>Name</Text>
      <Text style={{ color: 'white', textDecorationLine: 'underline', marginTop: 5 }}>Edit Profile</Text>
    </View>

    <View style={{ borderBottomWidth: 1, borderBottomColor: 'white', marginVertical: 20, width: '80%', alignSelf: 'center' }} />

    <View style={{ marginLeft: 80, marginTop: 50 }}>
      <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 15 }}>
        <Feather name="phone" size={24} color="white" />
        <Text style={{ color: 'white', marginLeft: 20, fontWeight: '700' }}>Catch Us</Text>
      </TouchableOpacity>

      <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 15 }} onPress={() => props.navigation.navigate('About')}>
        <AntDesign name="exclamationcircleo" size={24} color="white" />
        <Text style={{ color: 'white', marginLeft: 20, fontWeight: '700' }}>About Us</Text>
      </TouchableOpacity>

      <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 15 }} onPress={() => props.navigation.navigate('Terms')}>
        <Feather name="file-text" size={24} color="white" />
        <Text style={{ color: 'white', marginLeft: 20, fontWeight: '700' }}>Terms</Text>
      </TouchableOpacity>

      <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 15 }} onPress={() => props.navigation.navigate('Policy')}>
        <MaterialIcons name="policy" size={24} color="white" />
        <Text style={{ color: 'white', marginLeft: 20, fontWeight: '700' }}>Privacy Policy</Text>
      </TouchableOpacity>
    </View>

    <View style={{ alignItems: 'center', marginTop: 100 }}>
      <Button title="LOG OUT" onPress={() => props.navigation.navigate('Login')} />
    </View>

    <View style={{ alignItems: 'center', marginTop: 100 }}>
      <Text style={{ color: 'white' }}>Version 1.1.0</Text>
    </View>
  </DrawerContentScrollView>
);

// Drawer Navigation setup
const DrawerNavigation = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerStyle: { width: 290 },
        drawerLabelStyle: { color: 'white' },
        headerTintColor: 'white',
        headerStyle: { backgroundColor: Colors.bgColor },
      }}
    >
      <Drawer.Screen 
        name="MainHomeDrawer" 
        component={MainHome} 
        options={{ 
          headerShown: false,
          drawerLabel: 'Home', 
          drawerIcon: ({ color, size }) => <Feather name="home" size={size} color={color} /> 
        }} 
      />
    </Drawer.Navigator>
  );
};

// Stack and Drawer combined
const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="Home" 
          component={FirstScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Login" 
          component={Login} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="SignUp" 
          component={SignUp} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="CreateInvoice" 
          component={CreateInvoice} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Invoice" 
          component={Invoice} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="About" 
          component={About} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Terms" 
          component={Terms} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Policy" 
          component={Policy} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen
          name="MainHome" 
          component={DrawerNavigation} // Use DrawerNavigation inside MainHome stack screen
          options={{ headerShown: false }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
