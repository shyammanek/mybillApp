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
          <Paragraph>{item.category}</Paragraph>
          <Paragraph>{item.id}</Paragraph>
          <Title style={{alignSelf:'flex-end'}}>Rs: {item.price}</Title>
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
