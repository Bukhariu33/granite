import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import BackArrowButton from '../components/BackArrowButton';
import { Colors } from '../Colors';

const Terms = ({ navigation }) => {
  return (
    <View style={{ backgroundColor: Colors.bgColor, flex: 1 }}>
      <BackArrowButton onPress={() => navigation.goBack()} />
      <Text style={styles.title}>Terms and Conditions!</Text>
      
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
        </Text>
        <Text style={styles.infoText}>
          It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages.
        </Text>
        <Text style={styles.infoText}>
          More recently, it has become ubiquitous in desktop publishing software like Aldus PageMaker, including various versions of Lorem Ipsum.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    color: Colors.pink,
    fontSize: 30,
    marginLeft: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  infoContainer: {
    backgroundColor: 'grey',
      marginVertical: 20,
      marginHorizontal:20,
    padding: 15,
    borderRadius: 10,
  },
  infoText: {
    color: 'white',
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 10,
  },
});

export default Terms;
