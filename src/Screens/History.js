import React,{useEffect, useState} from 'react';
import {TextInput, FlatList, View, Text} from 'react-native';

import * as DataBase from '../Storage/Database';
import BillPrintExample from './BillPrintExample.js';


export default function HistoryScreen() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getOrders();
  }, []);

  const getOrders = async () => {
    const orders = DataBase.OrderActions.getAllOrders();
    console.log("🚀 ~ file: History.js:18 ~ getOrders ~ orders:", orders)
    setOrders(orders);
  };

  const renderOrder = ({item}) => (
    <View>
      <Text>{item}</Text>
      <Text>{'temcdkm'}</Text>
    </View>
  );

  return (
    <>
      {/* {orders && (
        <FlatList
          data={orders}
          renderItem={renderOrder}
          keyExtractor={item => item.id.toString()}
        />
      )} */}

      <View>
        <Text>HistoryScreen</Text>
        {/* <BillPrintExample /> */}
      </View>
    </>
  );
}
