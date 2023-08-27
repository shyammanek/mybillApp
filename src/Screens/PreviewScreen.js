import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import * as DataBase from '../Storage/Database';

const PreviewScreen = () => {

    const [orderData, setOrderData] = useState();


  const getOrderData = async () => {
    const orderData = await DataBase.OrderActions.getLatestOrder();
    console.log('====================================', orderData);
    setOrderData(orderData);
  };

  useEffect(() => {
    getOrderData();
  }, []);

  return (
    <View>
      <Text>PreviewScreen</Text>

      {orderData && (
        <View>
            <Text>{orderData.id}</Text>
            <Text>{orderData.total}</Text>
            <Text>{orderData.date}</Text>
            <Text>{orderData.time}</Text>
            <Text>{orderData.items}</Text>
        </View>
      )}
    </View>
  );
};

export default PreviewScreen;

const styles = StyleSheet.create({});
