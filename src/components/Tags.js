import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'

const Tags = ({title, style, onPress}) => {
  return (
    <TouchableOpacity style={[styles.filterButton, style]} onPress={onPress}>
          <Text style={styles.filterButtonText}>{title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    filterButton: {
    backgroundColor: 'grey',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginRight: 10,
    borderRadius: 10,
  },
  filterButtonText: {
      color: 'white',
      textAlign:"center"
  },
})

export default Tags