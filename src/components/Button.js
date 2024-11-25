import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient'; // Correct import for LinearGradient

const Button = ({ title, onPress }) => {
  return (
    <TouchableOpacity style={styles.buttonContainer} onPress={onPress}>
      <LinearGradient
        colors={['#a9016d', '#740182']} // Light pink to dark pink gradient
        start={{ x: 0, y: 0 }} // Starting from the left
        end={{ x: 1, y: 0 }}   // Ending at the right (90-degree gradient)
        style={styles.gradient} // Apply the gradient style
      >
        <Text style={styles.buttonText}>{title}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 15,
    overflow: 'hidden', // To ensure the gradient doesn't overflow the button  
  },
  gradient: {
    paddingVertical: 15,
    paddingHorizontal: 100,
    alignItems: 'center',
    borderRadius: 15,
  },
  buttonText: {
    color: 'white',
    fontSize: 15,
  },
});

export default Button;
