import React, {useEffect, useState} from 'react';
import {TextInput, FlatList, View, StyleSheet, Text} from 'react-native';

import * as DataBase from '../Storage/Database';
import BillPrintExample from './BillPrintExample.js';

export default function HistoryScreen() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getOrders();
  }, []);

  const getOrders = async () => {
    const orders = DataBase.OrderActions.getAllOrders();
    console.log('🚀 ~ file: History.js:18 ~ getOrders ~ orders:', orders);
    setOrders(orders);
  };

  const renderOrder = ({item}) => (
    <View>
      <View
        style={{
          padding: 10,
          alignItems: 'center',
          // borderWidth: 1,
          marginHorizontal: 24,
          backgroundColor: '#ddd',
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 10,
            borderWidth: 1,
            marginHorizontal: 24,
            width: 380,
            borderRadius: 12,
            
          }}>
          <Text style={styles.tableCell}>{item.items[0]?.name}</Text>
          <Text style={styles.tableCell}>{item.total}</Text>
          {/* <Text style={styles.tableCell}>{Date.toString(item.createdAt)}</Text> */}
        </View>
      </View>
    </View>
  );

  return (
    <>
      {orders && (
        <View style={{backgroundColor: '#f2f2f2',}}>
        <FlatList
          data={orders}
          renderItem={renderOrder}
          keyExtractor={item => item.id.toString()}
        />
        </View>
      )}

      <View>
        <Text>HistoryScreen</Text>
        {/* <BillPrintExample /> */}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  tableCell: {
    textAlign: 'center',
    // textAlignVertical: 'center',
    marginRight: 10,
    fontSize: 14,
    padding: 15,
    fontWeight: 'bold',
  },

  Header: {
    textAlign: 'center',
    // textAlignVertical: 'center',
    marginRight: 10,
    fontSize: 16,
    padding: 15,
    fontWeight: 'bold',
  },
});
