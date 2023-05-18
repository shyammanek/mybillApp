import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {TextInput, Button} from 'react-native-paper';

const Profile = () => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [email, setEmail] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    loadProfileData();
  }, []);

  const loadProfileData = async () => {
    try {
      const profileData = await AsyncStorage.getItem('profileData');
      if (profileData) {
        const {name, address, businessName, mobileNo, email} =
          JSON.parse(profileData);
        setName(name);
        setAddress(address);
        setBusinessName(businessName);
        setMobileNo(mobileNo);
        setEmail(email);
      }
    } catch (error) {
      console.log('Error loading profile data:', error);
    }
  };

  const saveProfileData = async () => {
    const profileData = {
      name,
      address,
      businessName,
      mobileNo,
      email,
    };

    try {
      await AsyncStorage.setItem('profileData', JSON.stringify(profileData));
      setIsEditing(false);
      console.log('Profile data saved successfully!');
    } catch (error) {
      console.log('Error saving profile data:', error);
    }
  };

  const renderProfileDetails = () => {
    return (
      <View style={styles.detailsContainer}>
        <Text
          style={[
            styles.label,
            {
              fontSize: 20,
            },
          ]}>
          Profile Details
        </Text>
        <View style={styles.data}>
          <Text style={styles.label}>Name:</Text>
          <Text style={styles.value}>{name}</Text>
        </View>

        <View style={styles.data}>
          <Text style={styles.label}>Address:</Text>
          <Text style={styles.value}>{address}</Text>
        </View>

        <View style={styles.data}>
          <Text style={styles.label}>Business Name:</Text>
          <Text style={styles.value}>{businessName}</Text>
        </View>
        <View style={styles.data}>
          <Text style={styles.label}>Mobile No:</Text>
          <Text style={styles.value}>{mobileNo}</Text>
        </View>
        <View style={styles.data}>
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.value}>{email}</Text>
        </View>
        <Button
          mode="contained"
          title="Edit"
          style={{
            margin: 10,
            padding: 10,
            backgroundColor: '#00aaff',
            borderRadius: 15,
          }}
          onPress={() => setIsEditing(true)}>
          Edit Profile
        </Button>
      </View>
    );
  };

  const renderEditForm = () => {
    return (
      <ScrollView showsHorizontalScrollIndicator={false}>
        <View style={styles.formContainer}>
          <KeyboardAvoidingView behavior="padding">
            <TextInput
              label={'Name'}
              // activeOutlineColor="orange"
              mode="outlined"
              style={styles.input}
              placeholder="Name"
              value={name}
              onChangeText={setName}
            />
            <TextInput
              mode="outlined"
              label={'Address'}
              multiline={true}
              numberOfLines={5}
              style={styles.input}
              placeholder="Address"
              value={address}
              onChangeText={setAddress}
            />
            <TextInput
              mode="outlined"
              label={'Business Name'}
              multiline={true}
              numberOfLines={3}
              style={styles.input}
              placeholder="Business Name"
              value={businessName}
              onChangeText={setBusinessName}
            />
            <TextInput
              mode="outlined"
              label={'Mobile No'}
              style={styles.input}
              placeholder="Mobile No"
              value={mobileNo}
              onChangeText={setMobileNo}
            />
            <TextInput
              mode="outlined"
              label={'Email'}
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
            />

            <Button
              mode="contained"
              style={{
                marginTop: 18,
                padding: 10,
                backgroundColor: '#00aaff',
                borderRadius: 15,
              }}
              onPress={saveProfileData}>
              Save
            </Button>

            <Button
              mode="contained"
              style={{
                // marginVerticle: 15,
                padding: 10,
                backgroundColor: 'red',
                borderRadius: 15,
                marginTop: 18,
              }}
              onPress={() => setIsEditing(false)}>
              Cancel
            </Button>
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
    );
  };

  return (
    <View style={styles.container}>
      {isEditing ? renderEditForm() : renderProfileDetails()}
    </View>
  );
};

export default Profile;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  detailsContainer: {
    marginBottom: 20,
    // flexDirection: 'row',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  value: {
    fontSize: 16,
    marginBottom: 15,
  },
  formContainer: {
    marginBottom: 20,
  },
  input: {
    marginBottom: 12,
    paddingHorizontal: 15,
    fontSize: 20,
  },
  data: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    marginHorizontal: 10,
  },
});
