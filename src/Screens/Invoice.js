import { View, Text, Image, Alert, ActivityIndicator, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, collection, addDoc } from 'firebase/firestore';
import BackArrowButton from '../components/BackArrowButton';
import CustomTitle from '../components/CustomTitle';
import { Colors } from '../Colors';
import InvoiceCard from '../components/InvoiceCard';
import Button from '../components/Button';
import { auth, db, storage } from '../components/Configuration';

const Invoice = ({ navigation, route }) => {
    const invoice = route.params.invoiceData; // Access invoice data directly from params
    const [loading, setLoading] = useState(false); // Loader state

    const sendDetails = async () => {
        setLoading(true); // Show loader
        const user = auth.currentUser;

        if (!user) {
            Alert.alert('User not authenticated');
            setLoading(false);
            return;
        }

        const userId = user.uid;
        let imageUri = invoice.image;
        let downloadURL = '';

        // Upload image if imageUri is provided
        if (imageUri) {
            try {
                const response = await fetch(imageUri);
                const blob = await response.blob();
                const fileExtension = imageUri.split('.').pop();
                const filename = `images/${Date.now()}.${fileExtension}`;
                const storageRef = ref(storage, filename);
                await uploadBytes(storageRef, blob);
                downloadURL = await getDownloadURL(storageRef);
                Alert.alert('Image has been uploaded as well');
            } catch (error) {
                Alert.alert('Upload Failed', error.message);
                setLoading(false);
                return;
            }
        }

        const dataToSend = {
            title: invoice.title,
            type: invoice.type,
            cost: invoice.cost,
            option: invoice.option,
            description: invoice.description || 'Made for saving purpose',
            imageUri: downloadURL || ''
        };

        try {
            const collectionName = invoice.option === 'Send' ? 'send' : 'receive';
            const userDocRef = doc(db, 'users', userId);
            const collectionRef = collection(userDocRef, collectionName);
            const docRef = await addDoc(collectionRef, dataToSend);

            console.log("Data sent to Firestore successfully! with ID: ", docRef.id);
            Alert.alert('Success', 'Data sent to Firestore successfully!');
            navigation.navigate('MainHome');
        } catch (e) {
            console.error("Error adding document: ", e);
            Alert.alert('Error', 'Error sending data to Firestore. Please try again.');
        } finally {
            setLoading(false); // Hide loader
        }
    };

    return (
        <View style={{ backgroundColor: Colors.bgColor, flex: 1 }}>
            <BackArrowButton onPress={() => navigation.goBack()} />
            <CustomTitle firstTitle="Here Yours" secondTitle="Invoice" />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: "center", marginHorizontal: 30 }}>
                <Text style={{ color: 'white', fontSize: 25, fontWeight: '800' }}>Invoice Picture</Text>
                {invoice.image ? (
                    <Image 
                        source={{ uri: invoice.image }} // Display the selected image
                        style={{ width: 60, height: 60, resizeMode: 'contain', borderRadius: 50 }} 
                    />
                ) : (
                    <Image 
                        source={require('../../assets/Images/profile.png')} // Default placeholder image
                        style={{ width: 60, height: 60, resizeMode: 'contain', borderRadius: 50 }} 
                    />
                )}
            </View>
            <View style={{ backgroundColor: "white", height: 400, marginHorizontal: 30, borderRadius: 10, marginTop: 5, padding: 5 }}>
                <InvoiceCard heading={'Made By'} title={invoice.title} />
                <InvoiceCard heading={'For'} title={invoice.type} />
                <InvoiceCard heading={'Cost'} title={`$${invoice.cost}`} />
                <InvoiceCard heading={'Status'} title={invoice.option} />
                <InvoiceCard heading={'Description'} title={invoice.description || 'Made for saving purpose'} />
            </View>
            <View style={{ marginTop: 20, marginHorizontal: 15 }}>
                <Button title={'SAVE INVOICE'} onPress={sendDetails} />
            </View>
            {loading && (
                <View style={styles.loaderContainer}>
                    <ActivityIndicator size="large" color="#ffffff" />
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    loaderContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.6)', // Semi-transparent overlay
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
    },
});

export default Invoice;
