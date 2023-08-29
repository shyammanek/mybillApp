import React, {useEffect, useState} from 'react';
import {TextInput, FlatList, View, StyleSheet, Text} from 'react-native';

import * as DataBase from '../Storage/Database';
import BillPrintExample from './BillPrintExample.js';
import moment from 'moment';
import { SCREEN_WIDTH } from '../Utils/Constants';

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

  const _renderHeader = () => {
    return (
      <View style={{...styles.tableCell, marginTop: 16, backgroundColor: 'lightgray'}}>
        <Text style={styles.tableText}>Name</Text>
        <Text style={styles.tableText}>Price</Text>
        <Text style={styles.tableText}>Date</Text>
      </View>
    )
  }

  const renderOrder = ({item}) => {
    console.log(item, "-----")
    return <View>
      <View
        style={styles.tableCell}>
          <Text style={styles.tableText}>{item.items[0]?.name}</Text>
          <Text style={styles.tableText}>{item.total}</Text>
          <View>
            <Text style={{...styles.tableText, textAlign: 'right'}}>{moment(item.createdAt).format("HH:MM a")}</Text>
            <Text style={{...styles.tableText, textAlign: 'right'}}>{moment(item.createdAt).format("DD/MM/YYYY")}</Text>
          </View>
      </View>
    </View>
  };

  return (
    <>
      {orders && (
        <FlatList
          data={orders}
          ListHeaderComponent={_renderHeader()}
          renderItem={renderOrder}
          keyExtractor={item => item.id.toString()}
        />
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
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 10,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: 'green',
    justifyContent: 'space-between',
    marginHorizontal: 24,
    marginBottom: 16,
    borderRadius: 12,
    alignItems: 'center'
  },
  tableText: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    width: (SCREEN_WIDTH - 48) * 0.25
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
