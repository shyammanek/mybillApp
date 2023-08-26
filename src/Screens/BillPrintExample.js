import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Alert} from 'react-native';
import {Printer, Printers,ThermalPrinterModule} from 'react-native-thermal-printer'; // This import might vary based on the actual library

const BillPrintExample = () => {
  const [printerConnected, setPrinterConnected] = useState(false);

  // Sample bill content
  const billContent = `
    Date: 2023-08-26
    ------------------------------
    Item        Qty    Price
    ------------------------------
    Item 1      2      $10
    Item 2      3      $15
    ------------------------------
    Total:             $55
    ------------------------------
  `;

  const connectToPrinter = async () => {
    try {
      // const printerStatus = await Printers.; // Connect to the printer


      setPrinterConnected(isConnected);
    } catch (error) {
      console.error('Error connecting to the printer:', error);
    }
  };

  const printBill = async () => {
    if (printerConnected) {
      try {
        await Printer.printText(billContent); // Print the bill content
      } catch (error) {
        console.error('Error printing bill:', error);
        Alert.alert('Error printing bill:', error);
      }
    } else {
      console.log('Printer not connected.');
      Alert.alert('Printer not connected.');
    }
  };

  return (
    <View>
      <TouchableOpacity 
        style={{backgroundColor: 'red',
        width: 300,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        margin: 10,
      }}
      onPress={connectToPrinter}>
        <Text
          style={{  color: 'white',
          fontSize: 16,
          fontWeight: 'bold',}}
        >Connect to Printer</Text>
      </TouchableOpacity>
      <TouchableOpacity 
       style={{backgroundColor: 'green',
       width: 300,
       height: 50,
       justifyContent: 'center',
       alignItems: 'center',
       borderRadius: 10,
       margin: 10,
     }}
      onPress={printBill}>
        <Text
          style={{  color: 'white',
          fontSize: 16,
          fontWeight: 'bold',}}

        >Print Bill</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BillPrintExample;
