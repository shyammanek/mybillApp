import React, {useEffect, useState} from 'react';
import {TextInput, Button, StyleSheet, View} from 'react-native';
import * as Databse from '../Storage/Database';

function AddMenuItemScreen() {


  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');

  const CreateMenuItem = () => {
    if (name === '' || category === '' || price === '') {
      // return alert('Please fill all fields');
      Databse.MenuItemActions.saveMenuItem({
        name: "name",
        price: 125,
        description: 'A lla',
        category: "category",
        quantity: 0,
      });
    } else {
      Databse.MenuItemActions.saveMenuItem({
        name: name,
        price: parseFloat(price),
        description: 'A lla',
        category: category,
        quantity: 0,
      });
    }
  };

  useEffect(() => {}, []);

  const handleAddMenuItem = () => {
    if (name === '' || category === '' || price === '') {
      return alert('Please fill all fields');
    } else {
      console.log('====================================');
      console.log('Name: ', name);
      console.log('====================================');
    }
  };

  return (
    <>
      <View style={{backgroundColor: '#fff', flex: 1, paddingHorizontal: 20}}>
        <TextInput
          style={styles.input}
          placeholder="Name"
          onChangeText={setName}
          value={name}
        />
        <TextInput
          style={styles.input}
          placeholder="Category"
          onChangeText={setCategory}
          value={category}
        />
        <TextInput
          style={styles.input}
          placeholder="Price"
          onChangeText={setPrice}
          value={price}
          keyboardType='numeric'
        />
        <Button
          style={{
            padding: 10,
            margin: 10,
            borderRadius: 12,
          }}
          onPress={CreateMenuItem}
          title="Add Menu"
        />
      </View>
    </>
  );
}

export default AddMenuItemScreen;

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    margin: 10,
    borderRadius: 5,
  },
});
