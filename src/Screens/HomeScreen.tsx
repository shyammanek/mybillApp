import {Text, View,Button, StyleSheet, TouchableOpacity} from 'react-native';
import React, {Component, useEffect, useState} from 'react';
import MatIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import FetherIcon from 'react-native-vector-icons/Feather'
import Ionicon from 'react-native-vector-icons/Ionicons'
import { SCREEN_WIDTH } from '../Utils/Constants';
import CustText from './common/CustText';
import CustButton from './common/CustButton';
import CreateOrderScreen from './CreateOrderScreen';
import * as DataBase from '../Storage/Database';
import { FlatList } from 'react-native-gesture-handler';
import { Card, Paragraph, Title } from 'react-native-paper';
import { MenuItemType } from '../types/Common';
import { MenuItemModelTypeInterface } from '../Storage/models/MenuItemModel';
import { NavigationProp } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type Props = {
  navigation: NavigationProp<any>
}

const HomeScreen = ({navigation}: Props) => {
  const [selectedItems, setSelectedItems] = useState<MenuItemModelTypeInterface[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItemModelTypeInterface[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const isSubmitDisabled = selectedItems.length === 0;

  useEffect(() => {
    fetchMenuItems();

    const unsubscribe = navigation.addListener('focus', () => {
      fetchMenuItems();
    });
  }, []);

  const deleteMenuItem = (id: number) => {
    DataBase.MenuItemActions.deleteMenuItem(id);
    fetchMenuItems();
  };


  const fetchMenuItems = () => {
    const items = DataBase.MenuItemActions.getMenuItem();
    if(items.length > 0) {
      setMenuItems(items.filter(val => !val.isOrder));
    }
  };

  const handleItemSelection = (item: MenuItemModelTypeInterface) => {
    let newItems = [...selectedItems]
    const isSelected = selectedItems.some(
      selectedItem => selectedItem.id === item.id,
    );
    if (isSelected) {
      newItems = selectedItems.filter(
        selectedItem => selectedItem.id !== item.id,
      );
      setSelectedItems(newItems);
    } else {
      newItems.push(item)
      if (!item?.quantity || item?.quantity == 0) {
        let newMenuItems = [...menuItems]
        let mIndex = newMenuItems.findIndex(val => val.id == item.id)
        newMenuItems[mIndex].quantity = 1
        setMenuItems(newMenuItems)
        newItems[newItems.length - 1].quantity = 1
      }
      setSelectedItems([...newItems]);
    }
    const total = newItems.reduce((sum, val) => 
      sum + (val.price * (val.quantity || 0)), 0
    );
    setTotalPrice(total);
  };

  
  const handleQuantity = (index: number, value: number) => {
    let newItems = [...menuItems]
    let newValue = (newItems[index]?.quantity || 0) + value
    if(newValue >= 0) {
      newItems[index].quantity = newValue
      setMenuItems([...newItems])
      const total = newItems.reduce((sum, item) => {
        const isSelected = selectedItems.some(val => val.id == item.id)
        if (isSelected) return sum + (item.price * (item.quantity || 0))
        else return sum
      }, 0);
      setTotalPrice(total);
      if (newValue == 0) {
        setSelectedItems(selectedItems.filter(val => val.id !== newItems[index].id))
      }
    }
  }
  
  const handleCreateOrder = () => {
    if (selectedItems.length === 0) {
      return;
    }
    const orderItems = selectedItems.map(item => ({
      name: item.name,
      price: item.price,
      description: item.description,
      category: item.category,
      id: item.id,
      quantity: item.quantity
    }));

    DataBase.OrderActions.createOrder(orderItems);

    setSelectedItems([]);

    navigation.navigate('PreviewScreen')
  };

  const _renderHeader = () => {
    return (
      <View>
        <View style={styles.navLinkWrap}>
          <View style={styles.navLink}>
            <TouchableOpacity 
              style={styles.navLinkItem}
              onPress={() => {
                navigation.navigate('HistoryScreen')
              }}
            >
              <View style={styles.iconStyle}>
                <MatIcon name="history" size={40} color={'green'} />
              </View>
              <CustText bold style={styles.linkText} fontSize={14} paddingTop={4}>History</CustText>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.navLinkItem}
              onPress={() => {
                navigation.navigate('Profile')
              }}
            >
              <View style={styles.iconStyle}>
                <FetherIcon name="user" size={40} color={'green'} />
              </View>
              <CustText bold style={styles.linkText} fontSize={14} paddingTop={4}>Profile</CustText>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.navLinkItem}
              onPress={() => {
                navigation.navigate('AddMenuItemScreen')
              }}
            >
              <View style={styles.iconStyle}>
                <Ionicon name="add-circle-outline" size={40} color={'green'} />
              </View>
              <CustText bold style={styles.linkText} fontSize={14} paddingTop={4}>Add New Item</CustText>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.orderHead}>
          <CustText fontSize={18} bold>Orders</CustText>
        </View>
      </View>
    )
  }

const connectToPrinter = () => {
  console.log('connectToPrinter')
  navigation.navigate('BillPrintExample')
}


  const _renderButtons = () => {
    return (
      <View style={styles.buttonStyle}>
        <CustButton style={styles.bMargin} onPress={connectToPrinter}>Connect To Printer</CustButton>
        <CustButton>Add Item</CustButton>
      </View>
    )
  }

  const _renderContent = () => {
    return (
      <FlatList
        data={menuItems}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.menuItemsContainer}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={_renderHeader}
        renderItem={({item, index}) => {
          const isSelected = selectedItems.some(
            selectedItem => selectedItem.id === item.id,
          );
          return (
            <Card
              style={[styles.menuItemCard, isSelected && styles.selectedCard]}
              onPress={() => handleItemSelection(item)}>
              <Card.Content>
                <View style={styles.orderItem}>

             

                <View style={{
                    flexDirection: 'row',

                }}>
                <TouchableOpacity 
                style={{
                  alignSelf: 'flex-start',
                  marginTop: 10,
                  marginRight: 10,
                  // marginLeft: 10
                }}
                onPress={() => deleteMenuItem(item.id)}>
                <MatIcon name="delete" size={25} color={'red'} />
                <Text>Delete</Text>
              </TouchableOpacity>

              <View> 
                    <Title>{item.name}</Title>
                    <View style={styles.orderButtons}>
                      <CustText paddingRight={6}>{item.category}</CustText>
                      <CustText>{item.id}</CustText>
                    </View>
                    </View>
                  </View>

                  <View style={styles.orderRtContent}>
                    <Title>Rs: {item.price}</Title>
                    <View style={styles.orderButtons}>
                      <TouchableOpacity style={styles.quantButton} onPress={() => handleQuantity(index, -1)}>
                        <MatIcon name="minus" size={25} color={'green'} />
                      </TouchableOpacity>
                      <CustText paddingHorizontal={8} fontSize={18} bold>{item?.quantity || 0}</CustText>
                      <TouchableOpacity style={styles.quantButton} onPress={() => handleQuantity(index, 1)}>
                        <MatIcon name="plus" size={25} color={'green'} />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </Card.Content>
            </Card>
          );
        }}
      />
    )
  }

  const _renderFooter = () => {
    return (
      <View style={styles.totalPriceContainer}>
        <Text style={styles.totalPriceText}>
          Total:- <Text style={styles.totalPriceValue}>{totalPrice}</Text>
        </Text>
        <Button
          title="Create Order"
          onPress={handleCreateOrder}
          disabled={isSubmitDisabled}
        />
      </View>
    )
  }

  return (
    <View style={styles.main}>
      <View style={styles.header}>
        <CustText fontSize={20} bold>MyBill</CustText>
        <CustButton style={styles.connect} onPress={connectToPrinter} >Connect To Printer</CustButton>
      </View>
      {_renderContent()}
      {_renderFooter()}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#fff'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  connect: {
  },
  navLink: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  linkText: {
    maxWidth: '80%'
  },
  navLinkItem: {
    paddingVertical: 10, 
    width: SCREEN_WIDTH * 0.28,
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  navLinkWrap: {
    backgroundColor: '#e8faf9',
    paddingVertical: 14
  },
  buttonStyle: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    flexDirection: 'row'
  },
  bMargin: {
    marginRight: 14
  },
  container: {
    flex: 1,
    padding: 20,
  },
  menuItemCard: {
   marginHorizontal: 16,
   borderWidth: 1,
   borderRadius: 10,
   borderColor: 'lightgreen',
   marginBottom: 16
  },
  selectedCard: {
    backgroundColor: '#e0e0e0',
  },
  menuItemsContainer: {
    flexGrow: 1,
  },
  totalPriceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderColor: 'lightgray'
  },
  totalPriceText: {
    fontSize: 18,
    // marginBottom: 10,
    alignSelf: 'center',
  },
  totalPriceValue: {
    fontSize: 18,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  orderHead: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 14
  },
  orderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  orderButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingTop: 6
  },
  quantButton: {
    borderWidth: 1,
    padding: 2,
    borderRadius: 99,
    borderColor: 'lightgray',
  },
  orderRtContent: {
    alignItems: 'flex-end',
  },
  iconStyle: {
    height: 45
  }
})
