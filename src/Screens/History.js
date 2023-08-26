import {useEffect, useState} from 'react';
import {TextInput, FlatList, View, Text} from 'react-native';

import * as Databse from '../Storage/Database.js';
import BillPrintExample from './BillPrintExample.js';


export default function HistoryScreen() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {}, []);

  const getOrders = () => {
    const orders = Databse.getOrders();
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
      {orders.length > 0 && (
        <FlatList
          data={orders}
          renderItem={renderOrder}
          keyExtractor={item => item.id.toString()}
        />
      )}

      <View>
        <Text>HistoryScreen</Text>
        <Text>cdkmclmlksdmkdsmklcmklsdmlckdsm</Text>
        <BillPrintExample />
      </View>
    </>
  );
}
