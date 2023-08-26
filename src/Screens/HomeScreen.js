import {Text, View,Button} from 'react-native';
import React, {Component, useEffect, useState} from 'react';
import {
  USBPrinter,
  NetPrinter,
  BLEPrinter,
} from 'react-native-thermal-receipt-printer';

const HomeScreen = () => {
  const [printers, setPrinters] = useState([]);
  const [currentPrinter, setCurrentPrinter] = useState();

  const printBill = () => {
    if (!currentPrinter) {
      return;
    }

    const bill = `
      Customer Name: John Doe
      Order Number: 12345
      Date: 2023-08-26

      Product Name | Quantity | Price
      --------- | -------- | --------
      Coffee | 2 | \$5.00
      Sandwich | 1 | \$10.00
      Total | \$15.00
    `;

    currentPrinter.printBill(bill);
  };

  useEffect(() => {
    USBPrinter.init().then(() => {
      // List all available printers
      USBPrinter.getDeviceList().then(setPrinters);
    });
  }, []);

  return (
    <View>
      <Text>HomeScreen</Text>

      <View>
        {printers.map(printer => (
          <TouchableOpacity
            key={printer.device_id}
            onPress={() => setCurrentPrinter(printer)}>
            {`device_name: ${printer.device_name}`}
          </TouchableOpacity>
        ))}
        <Button title="Print Bill" onPress={printBill} />
        
      </View>
    </View>
  );
};

export default HomeScreen;
