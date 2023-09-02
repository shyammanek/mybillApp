import {StyleSheet, Text, View,TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import * as DataBase from '../Storage/Database';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  BluetoothManager,
  BluetoothEscposPrinter,
  BluetoothTscPrinter,
} from '@pipechela/tp-react-native-bluetooth-printer';
import moment from 'moment';


const GLOBAL = require('./common/Global');

const PreviewScreen = () => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [email, setEmail] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const [orderData, setOrderData] = useState();
  const [currentDate, setCurrentDate] = useState();

  const getOrderData = async () => {
    const orderData = DataBase.OrderActions.getLatestOrder();
    console.log(
      '====================================',
      JSON.stringify(orderData),
    );
    setOrderData(orderData);
  };

  const loadProfileData = async () => {
    try {
      const profileData = await AsyncStorage.getItem('profileData');
      if (profileData) {
        const {name, address, businessName, mobileNo, email} =
          JSON.parse(profileData);
        setName(name);
        setAddress(address);
        setBusinessName(businessName);
        setMobileNo(mobileNo);
        setEmail(email);
      }
    } catch (error) {
      console.log('Error loading profile data:', error);
    }
  };

  printText = async (height = 1, width = 0) => {
    console.log("🚀 ~ file: PreviewScreen.js:53 ~ printText= ~ 0:",)
    
const nameWidth = 12;
const quantityWidth = 4;
const priceWidth = 6;
const totalWidth = 8;

await BluetoothEscposPrinter.printerAlign(
  BluetoothEscposPrinter.ALIGN.CENTER,
);
await BluetoothEscposPrinter.setBlob(0);


await BluetoothEscposPrinter.printText(
  `${businessName}\n\r`,
  {
    encoding: 'GBK',
    codepage: 0,
    widthtimes: 1,
    heigthtimes: 0,
    fonttype: 0,
  },
);
BluetoothEscposPrinter.printText(`${address} \n\r`,{})
 BluetoothEscposPrinter.printerAlign(
  BluetoothEscposPrinter.ALIGN.LEFT,
);
BluetoothEscposPrinter.printText( `------------------------------\n\r`, {});


BluetoothEscposPrinter.printerAlign(BluetoothEscposPrinter.ALIGN.LEFT);
BluetoothEscposPrinter.printText("Name".padEnd(nameWidth) +' '+ "Qty.".padEnd(quantityWidth) +' '+ "Price".padEnd(priceWidth)+ ' ' + "Total".padEnd(totalWidth), {});
    BluetoothEscposPrinter.printText( `-------------------------- \n\r`, {});

// Print items with aligned columns
orderData.items.forEach((item, index) => {
  var name = item?.name.length > nameWidth ? item?.name.substring(0, nameWidth - 3) + '...' : item.name;
  
  // Calculate padding for quantity, price, and total columns
  const quantityPadding = quantityWidth - item?.quantity.toString().length;
  const pricePadding = priceWidth - item?.price.toString().length;
  const totalPadding = totalWidth - (item?.quantity * item?.price).toString().length;

  // Print the item row with aligned columns
  BluetoothEscposPrinter.printerAlign(BluetoothEscposPrinter.ALIGN.LEFT);
  BluetoothEscposPrinter.printText(`${name.padEnd(nameWidth)} ${item?.quantity.toString().padStart(quantityPadding)} ${item?.price.toString().padStart(pricePadding)} ${(item?.quantity * item?.price).toString().padStart(totalPadding)}\n\r`, {});

});

       // // BluetoothEscposPrinter.printText('Bill',{})
    BluetoothEscposPrinter.printText( `------------------------------ \n\r`, {});

    // BluetoothEscposPrinter.printText( `No    Name   Qunt   MRP   Total \n\r`, {});

   
    // orderData &&
    //   orderData.items.map((item, index) => {
    //      var name = item?.name.length > 12 ? item?.name+'   ' : item.name.substring(0,12)
    //      BluetoothEscposPrinter.printerAlign(
    //       BluetoothEscposPrinter.ALIGN.LEFT,
    //     );
    //     BluetoothEscposPrinter.printText(
    //       `${index+1} ${name}`,
    //       {},
    //     );
    //     BluetoothEscposPrinter.printerAlign(
    //       BluetoothEscposPrinter.ALIGN.RIGHT,
    //     );
    //     BluetoothEscposPrinter.printText(`${item?.quantity} ${item?.price}  ${item?.quantity*item?.price} \n\r`,{})
    //   });

    BluetoothEscposPrinter.printerAlign(
        BluetoothEscposPrinter.ALIGN.CENTER,
      );
    
    orderData &&
      BluetoothEscposPrinter.printText(
        `\n\r----Total----\n\rRs: ${orderData?.total}\n\r`,
        {
          encoding: 'GBK',
          codepage: 0,
          widthtimes: 1,
          heigthtimes: 0,
          fonttype: 0,
        },
      );

    await BluetoothEscposPrinter.printText(`Time : ${currentDate}\n\r`, {});

    await BluetoothEscposPrinter.setBlob(0);

     BluetoothEscposPrinter.printerAlign(
      BluetoothEscposPrinter.ALIGN.CENTER,
    );
     BluetoothEscposPrinter.printText(
      'Thanks You....\n\r\n\r\n\r',
      {},
    );
  };

  useEffect(() => {
    getOrderData();
    loadProfileData();
    var date = moment().format('DD/MMM/YY h:mm:ss a') //date + '/' + month + '/' + year + ' Time' + hours + ':' + min + ':'
    setCurrentDate(date)
    console.log("🚀 ~ file: PreviewScreen.js:134 ~ useEffect ~ date:", date)
  }, []);

  return (
    <View>
      <Text> Your Order</Text>
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
              fontSize: 20,
              padding: 10,
              fontWeight: 'bold',
            }}>
            {'Name'}
          </Text>
          <Text
            style={{
              textAlign: 'center',
              // textAlignVertical: 'center',
              marginRight: 10,
              fontSize: 20,
              padding: 10,
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
                <Text style={styles.tableCell}>{item.quantity}</Text>
                <Text style={styles.tableCell}>{item?.quantity*item?.price}</Text>
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
            width:'90%'
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
            {'Total Amount'}
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
        <Text style={{
              fontSize: 18,
              padding: 15,
              fontWeight: 'bold',
            }}> {currentDate}</Text>

        <TouchableOpacity
          style={{
            marginRight: 30,
            margin: 40,
            backgroundColor: 'green',
            width: 300,
            height: 50,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={()=>printText()}>
          <Text
            style={{
              fontSize: 18,
              color: '#FFF',
              fontWeight: 'bold',
            }}>
            Print
          </Text>
        </TouchableOpacity>
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
