import React, { useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, Alert, Platform } from 'react-native';
import { Colors } from '../Colors';
import BackArrowButton from '../components/BackArrowButton';
import CustomTextInput from '../components/CustomTextInput';
import CustomTitle from '../components/CustomTitle';
import Button from '../components/Button';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { launchImageLibrary } from 'react-native-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import Fontisto from 'react-native-vector-icons/Fontisto';

const CreateInvoice = ({ navigation }) => {
  const [selectedOption, setSelectedOption] = useState('Send'); // State for selected option
  const [dropdownOpen, setDropdownOpen] = useState(false); // State to manage dropdown visibility
  const [selectedImage, setSelectedImage] = useState(null);
  const [date, setDate] = useState(new Date()); // State for date
  const [showDatePicker, setShowDatePicker] = useState(false); // State to show/hide date picker
  const [title, setTitle] = useState(''); // State for title
  const [type, setType] = useState(''); // State for type
  const [cost, setCost] = useState(''); // State for cost

  const options = ['Send', 'Receive'];
  const photoOptions = {
    mediaType: 'photo',
    quality: 1,
  };

  const pickImageFromGallery = () => {
    launchImageLibrary(photoOptions, (response) => {
      if (response.didCancel) {
        Alert.alert('Canceled', 'Image selection canceled');
      } else if (response.errorCode) {
        Alert.alert('Error', response.errorMessage);
      } else {
        const uri = response.assets[0].uri;
        setSelectedImage(uri);
      }
    });
  };

  // Handle date change from the picker
  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === 'ios'); // Show picker for iOS until the user closes it
    setDate(currentDate); // Set selected date
  };

  // Handle dropdown selection
  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setDropdownOpen(false); // Close dropdown after selection
  };

  // Handle the update button press
  const handleUpdate = () => {
    const invoiceData = {
      title,
      type,
      cost,
      date: date.toDateString(),
      option: selectedOption,
      image: selectedImage,
    };

    navigation.navigate('Invoice', { invoiceData });
  };

  return (
    <View style={{ backgroundColor: Colors.bgColor, flex: 1 }}>
      <BackArrowButton onPress={() => navigation.goBack()} />
      <CustomTitle firstTitle="Create an" secondTitle="Invoice" />
      <ScrollView>
        <View style={{ alignItems: 'center' }}>
          <Image
            source={selectedImage ? { uri: selectedImage } : require('../../assets/Images/profile.png')}
            style={{ width: 60, height: 60, resizeMode: 'contain', borderRadius: 50 }}
          />
          <TouchableOpacity onPress={pickImageFromGallery}>
            <Text style={{ color: 'white', marginTop: 10 }}>Upload an Image</Text>
          </TouchableOpacity>
        </View>

        <View style={{ marginHorizontal: 20 }}>
          <Text style={{ color: 'white', fontWeight: '700', marginLeft: 10 }}>Title</Text>
          <CustomTextInput placeholder="Name" iconName="person" iconType="Feather" value={title} onChangeText={setTitle} />
        </View>

        <View style={{ marginHorizontal: 20 }}>
          <Text style={{ color: 'white', fontWeight: '700', marginLeft: 10 }}>Type</Text>
          <CustomTextInput placeholder="For" iconName="type-specimen" iconType="Feather" value={type} onChangeText={setType} />
        </View>

        <View style={{ marginHorizontal: 20 }}>
          <Text style={{ color: 'white', fontWeight: '700', marginLeft: 10 }}>Cost</Text>
          <CustomTextInput placeholder="Cost" iconName="currency-rupee" iconType="FontAwesome5" value={cost} onChangeText={setCost} />
        </View>

        <View style={{ marginHorizontal: 20 }}>
          <Text style={{ color: 'white', fontWeight: '700', marginLeft: 10 }}>Date</Text>
          {/* Touchable opacity to open date picker */}
          <TouchableOpacity
            style={{
              backgroundColor: '#5d5b5b',
              flexDirection: 'row',
              borderRadius: 8,
              padding: 15,
              marginTop: 10,
              marginHorizontal: 12,
              alignItems: "center",
            }}
            onPress={() => setShowDatePicker(true)}
          >
            <Fontisto name="date" size={24} color="white" />
            <Text style={{ color: 'white', marginLeft: 20 }}>{date.toDateString()}</Text>
          </TouchableOpacity>

          {showDatePicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display="default"
              onChange={onDateChange}
              minimumDate={new Date(2000, 0, 1)} // Optional: restricts minimum date
              maximumDate={new Date(2030, 11, 31)} // Optional: restricts maximum date
            />
          )}
        </View>

        <View style={{ marginHorizontal: 20, marginTop: 20 }}>
          <Text style={{ color: 'white', fontWeight: '700', marginLeft: 10 }}>Select Option</Text>
          <TouchableOpacity
            style={{
              borderWidth: 1,
              borderColor: 'white',
              borderRadius: 8,
              paddingHorizontal: 15,
              paddingVertical: 10,
              backgroundColor: Colors.inputBg,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 10,
            }}
            onPress={() => setDropdownOpen(!dropdownOpen)}
          >
            <Text style={{ color: 'white' }}>{selectedOption}</Text>
            <FontAwesome name={dropdownOpen ? 'chevron-up' : 'chevron-down'} size={16} color="white" />
          </TouchableOpacity>

          {dropdownOpen && (
            <View
              style={{
                borderWidth: 1,
                borderColor: 'white',
                borderRadius: 8,
                backgroundColor: Colors.inputBg,
                marginTop: 5,
                paddingHorizontal: 10,
              }}
            >
              {options.map((option, index) => (
                <TouchableOpacity
                  key={index}
                  style={{ paddingVertical: 10 }}
                  onPress={() => handleOptionSelect(option)}
                >
                  <Text style={{ color: 'white' }}>{option}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        <View style={{ marginHorizontal: 50, marginTop: 20 }}>
          <Button title="UPDATE" onPress={handleUpdate} />
        </View>
      </ScrollView>
    </View>
  );
};

export default CreateInvoice;
