// InvoiceDetail.js
import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const CardDetail = ({ title, amount, status}) => {
  return (
    <LinearGradient 
      colors={['#240f22', '#570850']}
      start={{ x: 0, y: 1 }}
      end={{ x: 1, y: 0 }}
      style={styles.invoiceDetail}
    >
      <View style={styles.detailRow}>
        <Image source={require('../../assets/Images/profile.png')} style={styles.detailImage} />
        <View style={styles.detailTextContainer}>
          <Text style={styles.detailTitle}>{title}</Text>
          <Text style={styles.detailAmount}>${amount}</Text>
        </View>
      </View>
      <View style={styles.detailInfo}>
        <Text style={styles.detailStatus}>{status}</Text>
        <Text style={styles.detailDate}>25 April, 2024</Text>
      </View>
    </LinearGradient>
  );
};

export default CardDetail;

const styles = StyleSheet.create({
  invoiceDetail: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
    margin: 10,
  },
  detailRow: {
    flexDirection: 'row',
  },
  detailImage: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
    borderRadius: 50,
  },
  detailTextContainer: {
    marginHorizontal: 15,
  },
  detailTitle: {
    color: 'white',
    fontSize: 15,
  },
  detailAmount: {
    color: 'white',
    fontSize: 15,
  },
  detailInfo: {
    marginHorizontal: 5,
  },
  detailStatus: {
    color: 'white',
    fontSize: 15,
  },
  detailDate: {
    color: 'white',
    fontSize: 15,
  },
});
