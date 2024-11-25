import { StyleSheet, TouchableOpacity, Image} from 'react-native'
import React from 'react'

const BackArrowButton = ({onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}>
        <Image 
          source={require('../../assets/Images/back.png')} 
          style={styles.backButton} 
        />
      </TouchableOpacity>
  )
}

export default BackArrowButton

const styles = StyleSheet.create({
     backButton: {
    width: 100, 
    height: 100, 
  },
})