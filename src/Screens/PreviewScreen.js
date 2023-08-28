import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import * as DataBase from '../Storage/Database';

const PreviewScreen = () => {
  const [orderData, setOrderData] = useState();

  const getOrderData = async () => {
    const orderData = DataBase.OrderActions.getLatestOrder();
    console.log(
      '====================================',
      JSON.stringify(orderData),
    );
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
          {/* <Text>{orderData.createdAt}</Text> */}
        </View>
      )}
      <View style={{padding: 10, alignItems: 'center', borderWidth: 1}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            borderBottomWidth: 1,
            marginBottom: 10,
          }}>
          <Text
            style={{
              textAlign: 'center',
              // textAlignVertical: 'center',
              marginRight: 10,
              fontSize: 24,
              padding: 15,
              fontWeight: 'bold',
            }}>
            {'Name'}
          </Text>
          <Text
            style={{
              textAlign: 'center',
              // textAlignVertical: 'center',
              marginRight: 10,
              fontSize: 24,
              padding: 15,
              fontWeight: 'bold',
            }}>
            {'Quantity'}
          </Text>
          <Text
            style={{
              textAlign: 'center',
              // textAlignVertical: 'center',
              marginRight: 10,
              fontSize: 24,
              padding: 15,
              fontWeight: 'bold',
            }}>
            {'Price'}
          </Text>
        </View>
        {orderData &&
          orderData.items.map((item, index) => {
            return (
              <View
                style={{
                  flexDirection: 'row',
                  padding: 10,
                  // alignItems: 'center',
                }}
                key={index}>
                <Text style={styles.tableCell}>{item.name}</Text>
                <Text style={styles.tableCell}>{item.price}</Text>
                <Text style={styles.tableCell}>{item.price}</Text>

                <Text>{item.quantity}</Text>
              </View>
            );
          })}

        <View
          style={{
            marginTop: 30,
            borderBottomWidth: 1,
            borderTopWidth: 1,
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 10,
          }}>
          <Text
            style={{
              textAlign: 'center',
              textAlignVertical: 'center',
              marginRight: 10,
              fontSize: 24,
              padding: 15,
              fontWeight: 'bold',
            }}>
            {'Total'}
          </Text>
          <Text
            style={{
              height: 50,
              marginRight: 10,
              fontSize: 20,
              fontWeight: 'bold',
              textAlign: 'center',
              textAlignVertical: 'center',
              padding: 10,
            }}>
            {orderData && orderData.total}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default PreviewScreen;

const styles = StyleSheet.create({
  tableCell: {
    // height: 50,
    // backgroundColor: 'red',
    // textAlign: 'center',
    // textAlignVertical: 'center',
    // color: 'white',
    marginRight: 15,
    fontSize: 18,
    fontWeight: 'bold',
    // padding: 10,
    marginHorizontal: 30,
    width: 90,
  },
});
