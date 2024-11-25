import { StyleSheet, TextInput, View } from 'react-native'
import React from 'react'
import { Icon } from 'react-native-elements'; // Import Icon from react-native-elements

const CustomTextInput = ({ iconName, iconType, placeholder, value, onChangeText }) => {
  return (
    <View style={styles.inputContainer}>
        <Icon 
          name={iconName} 
          type={iconType} 
          size={24} 
          color="white" 
          iconStyle={styles.icon} 
        />
        <TextInput 
        placeholder={placeholder}
        placeholderTextColor="white"
        style={styles.textInput}
        value={value}
        onChangeText={onChangeText}
        />
      </View>
  )
}

export default CustomTextInput

const styles = StyleSheet.create({
  inputContainer: {
    backgroundColor: '#5d5b5b',
    flexDirection: 'row',
    margin:10,
    alignItems: 'center',
    padding: 5,
    borderRadius: 15,
  },
  icon: {
    marginHorizontal: 10,
  },
  textInput: {
    flex: 1,
    color: 'white', // Text color set to white
    marginHorizontal: 10,
    fontSize: 16,
  },
})
