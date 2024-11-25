import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Colors } from '../Colors';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Tags from '../components/Tags';
import Button from '../components/Button';
import { db } from '../components/Configuration';
import { collection, getDocs } from 'firebase/firestore';
import CardDetail from '../components/CardDetail';

const MainHome = ({ navigation }) => {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');
  const [sendTotal, setSendTotal] = useState(0);
  const [receiveTotal, setReceiveTotal] = useState(0);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const usersCollection = collection(db, "users");
        const userSnapshot = await getDocs(usersCollection);
        const usersList = await Promise.all(
          userSnapshot.docs.map(async (doc) => {
            const userData = { id: doc.id, ...doc.data() };

            const sendCollection = collection(db, `users/${doc.id}/send`);
            const receiveCollection = collection(db, `users/${doc.id}/receive`);

            const sendSnapshot = await getDocs(sendCollection);
            userData.send = sendSnapshot.docs
              .map((sendDoc) => sendDoc.data())
              .filter((sendItem) => sendItem.description === "Made for saving purpose");

            const receiveSnapshot = await getDocs(receiveCollection);
            userData.receive = receiveSnapshot.docs
              .map((receiveDoc) => receiveDoc.data())
              .filter((receiveItem) => receiveItem.description === "Made for saving purpose");

            return userData;
          })
        );

        setUserData(usersList);

        // Calculate total send and receive amounts, ensuring the `cost` values are numbers
        const sendAmount = usersList[0]?.send.reduce((total, item) => total + Number(item.cost), 0) || 0;
        const receiveAmount = usersList[0]?.receive.reduce((total, item) => total + Number(item.cost), 0) || 0;
        setSendTotal(sendAmount);
        setReceiveTotal(receiveAmount);
      } catch (error) {
        console.error("Error fetching users: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Get the first user's name (as an example)
  const userName = userData.length > 0 ? userData[0].name : "Name";

  // Filtered data based on selected filter
  const filteredData = userData.length > 0 ? (
    filter === 'All'
      ? [
          ...userData[0].send.map((item) => ({ ...item, type: 'send' })),
          ...userData[0].receive.map((item) => ({ ...item, type: 'receive' })),
        ]
      : filter === 'Send'
      ? userData[0].send.map((item) => ({ ...item, type: 'send' }))
      : userData[0].receive.map((item) => ({ ...item, type: 'receive' }))
  ) : [];

  return (
    <View style={styles.container}>
      {/* Profile Section */}
      <View style={styles.profileSection}>
        <TouchableOpacity onPress={() => { navigation.openDrawer() }}>
          <Image 
            source={require('../../assets/Images/profile.png')} 
            style={styles.profileImage} 
          />
        </TouchableOpacity>
        <View style={styles.profileDetails}>
          <Text style={styles.profileName}>{userName}</Text>
          <Text style={styles.profileSubtitle}>Invoice Summary</Text>
        </View>
      </View>

      {/* Invoice Summary Section */}
      <View style={styles.invoiceContainer}>
        <View style={styles.invoiceRow}>
          <View style={{ flexDirection: 'row' }}>
            <Feather name="send" size={24} color="white" />
            <Text style={styles.invoiceText}>Sent Invoice</Text>
          </View>
          <Text style={styles.invoiceAmount}>$ {sendTotal}</Text>
        </View>
        <View style={[styles.invoiceRow, { marginTop: 20 }]}>
          <View style={{ flexDirection: 'row' }}>
            <AntDesign name="back" size={24} color="white" />
            <Text style={styles.invoiceText}>Receive Invoice</Text>
          </View>
          <Text style={styles.invoiceAmount}>$ {receiveTotal}</Text>
        </View>
      </View>

      {/* History Section */}
      <View style={styles.historySection}>
        <Text style={styles.historyTitle}>History</Text>
      </View>

      {/* Filter Buttons - Tags with Filter Functionality */}
      <View style={styles.filterButtonsContainer}>
        <Tags title="All" onPress={() => setFilter('All')} style={styles.tagItem} />
        <Tags title="Send" onPress={() => setFilter('Send')} style={styles.tagItem} />
        <Tags title="Receive" onPress={() => setFilter('Receive')} style={styles.tagItem} />
      </View>

      {/* Loader or FlatList */}
      <View style={styles.listContainer}>
        {loading ? (
          <ActivityIndicator size="large" color={Colors.primary} />
        ) : (
          <FlatList
            data={filteredData}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <CardDetail 
                title={item.title}
                amount={item.cost} 
                status={item.type === 'send' ? 'Sent' : 'Received'} 
              />
            )}
            contentContainerStyle={styles.invoiceDetailContainer}
          />
        )}
      </View>

      {/* Create Invoice Button */}
      <View style={styles.createInvoiceButton}>
        <Button title="CREATE INVOICE" onPress={() => navigation.navigate('CreateInvoice')} />
      </View>
    </View>
  );
};

export default MainHome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bgColor,
    padding: 20,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
  },
  profileImage: {
    borderRadius: 50,
    width: 70,
    height: 70,
  },
  profileDetails: {
    marginHorizontal: 20,
  },
  profileName: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
  profileSubtitle: {
    color: 'white',
    fontSize: 15,
  },
  invoiceContainer: {
    backgroundColor: 'grey',
    margin: 10,
    borderRadius: 15,
    padding: 10,
    marginTop: 10,
  },
  invoiceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
    marginTop: 5,
  },
  invoiceText: {
    color: 'white',
    fontSize: 15,
    marginHorizontal: 30,
  },
  invoiceAmount: {
    color: 'white',
    fontSize: 15,
  },
  historySection: {
    marginHorizontal: 10,
    marginTop: 10,
  },
  historyTitle: {
    color: Colors.pink,
    fontSize: 30,
  },
  filterButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  tagItem: {
    flex: 1,
    marginHorizontal: 5,
  },
  listContainer: {
    flex: 1,
    paddingBottom: 70, // Add space to avoid overlap with the button
  },
  invoiceDetailContainer: {
    paddingVertical: 10,
  },
  createInvoiceButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
});
