import React, {useState, useEffect} from 'react';
import {View, Button, FlatList, StyleSheet, Text} from 'react-native';
import {Card, Title, Paragraph} from 'react-native-paper';
import * as DataBase from '../Storage/Database';

const CreateOrderScreen = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const fetchMenuItems = () => {
    const items = DataBase.MenuItemActions.getMenuItem();
    setMenuItems(items);
  };

  const handleItemSelection = item => {
    const isSelected = selectedItems.some(
      selectedItem => selectedItem.id === item.id,
    );

    if (isSelected) {
      const updatedItems = selectedItems.filter(
        selectedItem => selectedItem.id !== item.id,
      );
      setSelectedItems(updatedItems);
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  useEffect(() => {
    const calculateTotalPrice = () => {
      const total = selectedItems.reduce((sum, item) => sum + item.price, 0);
      setTotalPrice(total);
    };

    calculateTotalPrice();
  }, [selectedItems]);

  const handleCreateOrder = () => {
    if (selectedItems.length === 0) {
      return;
    }

    const orderItems = selectedItems.map(item => ({
      name: item.name,
      price: item.price,
      description: item.description,
      category: item.category,
    }));

    DataBase.OrderActions.createOrder(orderItems);

    setSelectedItems([]);
  };

  const renderItem = ({item}) => {
    const isSelected = selectedItems.some(
      selectedItem => selectedItem.id === item.id,
    );

    return (
      <Card
        style={[styles.menuItemCard, isSelected && styles.selectedCard]}
        onPress={() => handleItemSelection(item)}>
        <Card.Content>
          <Title>{item.name}</Title>
          <Paragraph>{item.price}</Paragraph>
          <Paragraph>{item.description}</Paragraph>
          <Paragraph>{item.category}</Paragraph>
          <Paragraph>{item.id}</Paragraph>
        </Card.Content>
      </Card>
    );
  };

  const isSubmitDisabled = selectedItems.length === 0;

  return (
    <View style={styles.container}>
      <FlatList
        data={menuItems}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.menuItemsContainer}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      />
      <View style={styles.totalPriceContainer}>
        <Text style={styles.totalPriceText}>Total </Text>
        <Text style={styles.totalPriceValue}>{totalPrice}</Text>
      </View>

      <Button
        title="Create Order"
        onPress={handleCreateOrder}
        disabled={isSubmitDisabled}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  menuItemCard: {
    width: '48%',
    margin: '1%',
  },
  selectedCard: {
    backgroundColor: '#e0e0e0',
  },
  menuItemsContainer: {
    flexGrow: 1,
  },
  totalPriceContainer: {
    margin: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  totalPriceText: {
    fontSize: 22,
    fontWeight: 'bold',
    // marginBottom: 10,
    alignSelf: 'center',
  },
  totalPriceValue: {
    fontSize: 24,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
});

export default CreateOrderScreen;

// import React, {useState, useEffect} from 'react';
// import {View, TextInput, Button, FlatList, StyleSheet, Alert} from 'react-native';
// import {Card, Title, Paragraph} from 'react-native-paper';
// import * as DataBase from '../Storage/Database';

// const CreateOrderScreen = () => {
//   const [selectedItems, setSelectedItems] = useState([]);
//   const [total, setTotal] = useState('');
//   const [createdAt, setCreatedAt] = useState('');
//   const [menuItems, setMenuItems] = useState([]);

//   useEffect(() => {
//     fetchMenuItems();
//   }, []);

//   const fetchMenuItems = () => {
//     const items = DataBase.MenuItemActions.getMenuItem();
//     setMenuItems(items);
//   };

//   const handleItemSelection = item => {
//     const isSelected = selectedItems.some(
//       selectedItem => selectedItem.id === item.id,
//     );

//     if (isSelected) {
//       const updatedItems = selectedItems.filter(
//         selectedItem => selectedItem.id !== item.id,
//       );
//       setSelectedItems(updatedItems);
//     } else {
//       setSelectedItems([...selectedItems, item]);
//     }
//   };

//   const handleCreateOrder = () => {
//     if (selectedItems.length === 0 || total === '' || createdAt === '') {
//       return Alert.alert('Please Select  at leas one item');
//     }

//     const orderItems = selectedItems.map(item => ({
//       name: item.name,
//       price: item.price,
//       description: item.description,
//       category: item.category,
//     }));

//     DataBase.OrderActions.createOrder(orderItems, parseFloat(total), createdAt);

//     setSelectedItems([]);
//     setTotal('');
//     setCreatedAt('');
//   };

//   const renderItem = ({item}) => {
//     const isSelected = selectedItems.some(
//       selectedItem => selectedItem.id === item.id,
//     );

//     return (
//       <Card
//         style={[styles.menuItemCard, isSelected && styles.selectedCard]}
//         onPress={() => handleItemSelection(item)}>
//         <Card.Content>
//           <Title>{item.name}</Title>
//           <Paragraph>{item.price}</Paragraph>
//         </Card.Content>
//       </Card>
//     );
//   };

//   const isSubmitDisabled =
//     selectedItems.length === 0 || total === '' || createdAt === '';

//   return (
//     <View style={styles.container}>
//       <TextInput
//         style={styles.input}
//         placeholder="Total"
//         value={total}
//         onChangeText={setTotal}
//         keyboardType="numeric"
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Created At"
//         value={createdAt}
//         onChangeText={setCreatedAt}
//       />
//       <Button
//         title="Create Order"
//         onPress={handleCreateOrder}
//         disabled={isSubmitDisabled}
//       />
//       <FlatList
//         data={menuItems}
//         renderItem={renderItem}
//         keyExtractor={item => item.id.toString()}
//         numColumns={2}
//         contentContainerStyle={styles.menuItemsContainer}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//   },
//   input: {
//     height: 40,
//     borderColor: 'gray',
//     borderWidth: 1,
//     marginBottom: 10,
//     paddingHorizontal: 10,
//   },
//   menuItemCard: {
//     width: '48%',
//     margin: '1%',
//   },
//   selectedCard: {
//     backgroundColor: '#e0e0e0',
//   },
//   menuItemsContainer: {
//     flexGrow: 1,
//   },
// });

// export default CreateOrderScreen;

// import * as DataBase from '../Storage/Database';

// // CreateOrderScreen
// import React, { useState, useEffect } from 'react';
// import { View, TextInput, Button, FlatList, Text } from 'react-native';
// // import { OrderActions, MenuItemActions } from './your-database-file';

// const CreateOrderScreen = () => {
//   const [selectedItems, setSelectedItems] = useState([]);
//   const [total, setTotal] = useState(0);
//   const [createdAt, setCreatedAt] = useState('');
//   const [menuItems, setMenuItems] = useState([]);

//   useEffect(() => {
//     // Fetch menu items from the database
//     const items = DataBase.MenuItemActions.getMenuItem();
//     setMenuItems(items);
//   }, []);

//   const createOrder = () => {
//     const orderItems = selectedItems.map((item) => ({
//       name: item.name,
//       price: parseFloat(item.price),
//       description: item.description,
//       category: item.category,
//     }));

//     DataBase.OrderActions.createOrder(orderItems, total, createdAt);

//     // Clear the selected items or reset the state variables
//     setSelectedItems([]);
//     setTotal(0);
//     setCreatedAt('');
//   };

//   const handleItemSelection = (item) => {
//     setSelectedItems([...selectedItems, item]);
//   };

//   const renderItem = ({ item }) => (
//     <View>
//       <Text>{item.name}</Text>
//       <Text>{item.price}</Text>
//       <Button
//         title="Add to Order"
//         onPress={() => handleItemSelection(item)}
//       />
//     </View>
//   );

//   return (
//     <View>
//       <TextInput
//         placeholder="Total"
//         onChangeText={(text) => setTotal(parseFloat(text))}
//       />
//       <TextInput
//         placeholder="Created At"
//         onChangeText={setCreatedAt}
//       />
//       <Button
//         title="Create Order"
//         onPress={createOrder}
//         disabled={selectedItems.length === 0} // Disable the button if no items are selected
//       />
//       <FlatList
//         data={menuItems}
//         renderItem={renderItem}
//         keyExtractor={(item, index) => index.toString()}
//       />
//     </View>
//   );
// };

// export default CreateOrderScreen;
