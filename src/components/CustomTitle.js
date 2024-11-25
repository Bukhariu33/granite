import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Colors } from '../Colors'

const CustomTitle = ({ firstTitle, secondTitle }) => {
  return (
    <View style={styles.titleContainer}>
          <Text style={styles.title}>{ firstTitle}</Text>
          <Text style={styles.titleHighlight}>{secondTitle}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    titleContainer: {
    marginHorizontal: 30,
  },
  title: {
    fontSize: 45,
    color: 'white',
  },
  titleHighlight: {
    fontSize: 45,
    color: Colors.pink, // Pink color from your Colors file
    fontWeight: 'bold',
  },
    
})
export default CustomTitle