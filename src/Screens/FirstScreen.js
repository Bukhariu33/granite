import { View, Text, StyleSheet, Image, TouchableOpacity, ImageBackground } from 'react-native'
import React from 'react'
import { Colors } from '../Colors' // Assuming Colors file exists
import Button from '../components/Button'

const FirstScreen = ({ navigation }) => {
  return (
      <ImageBackground source={require('../../assets/Images/bg.png')} style={styles.container}>
      
      {/* Logo */}
      <View style={styles.logoContainer}>
        <Image 
          source={require('../../assets/Images/logo1.png')} 
          style={styles.logo} 
        />
      </View>

      {/* Title */}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Let's Get</Text>
        <Text style={styles.titleHighlight}>Started!</Text>
      </View>

      {/* Sign In Button */}
      <View style={{marginTop:150, marginHorizontal:20}}>
            <Button title={'SIGN IN'} onPress={()=>navigation.navigate('Login')}/>
      </View>

      {/* Sign In Options */}
      {/* <View style={styles.signInOptions}>
        <TouchableOpacity style={styles.iconButton}>
          <Image source={require('../../assets/Images/emailIcon.png')} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <Image source={require('../../assets/Images/phoneIcon.png')} style={styles.icon} />
        </TouchableOpacity>
      </View>

      {/* Sign Up */}
      <View style={styles.signUpContainer}>
        <Text style={styles.signUpText}>DIDN'T HAVE ACCOUNT?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.signUpLink}>SIGN UP NOW</Text>
        </TouchableOpacity>
      </View>

    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bgColor, // Use your defined background color
  },
  logoContainer: {
    alignItems: 'center',
  },
  logo: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
  },
  logoText: {
    fontSize: 24,
    color: 'white',
    marginTop: 10,
    fontWeight: 'bold',
  },
  titleContainer: {
    alignItems: 'center',
  },
  title: {
    fontSize: 50,
    color: 'white',
  },
  titleHighlight: {
    fontSize: 50,
    color: Colors.pink, // Gradient-like pink color
      fontWeight: 'bold',
  },
  signInButton: {
    backgroundColor: Colors.pink, // Gradient color from the design
    paddingVertical: 15,
    paddingHorizontal: 80,
    borderRadius: 30,
    alignSelf: 'center',
    marginTop: 150,
  },
  signInText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  orSignInWith: {
    textAlign: 'center',
    color: 'white',
    marginTop: 20,
    fontSize: 16,
  },
  signInOptions: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  iconButton: {
    marginHorizontal: 10,
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 50,
  },
  icon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 40,
  },
  signUpText: {
    color: 'white',
  },
  signUpLink: {
    color: '#FF00FF',
    marginLeft: 5,
  },
})

export default FirstScreen
