import {View, Text} from 'react-native';
import React from 'react';
import BluetoothPrinter from 'tp-react-native-bluetooth-printer';
import {
  PrinterCommands,
  PrinterStyles,
} from 'tp-react-native-bluetooth-printer';
import {TouchableOpacity} from 'react-native-gesture-handler';

const PrintBill = () => {
  const [orders, setOrders] = useState([]);

  const printOrder = async order => {
    try {
      await BluetoothPrinter.init();
      await BluetoothPrinter.printText(
        'Order Details',
        PrinterStyles.BOLD,
        PrinterCommands.CENTER,
      );

      // Print order information
      await BluetoothPrinter.printText(`Order ID: ${order.id}`);
      await BluetoothPrinter.printText(`Total: $${order.total}`);
      await BluetoothPrinter.printText(`Created At: ${order.createdAt}`);

      // Print menu items
      await BluetoothPrinter.printText(
        'Menu Items',
        PrinterStyles.BOLD,
        PrinterCommands.CENTER,
      );
      order.items.forEach(item => {
        BluetoothPrinter.printText(`- ${item.name}: $${item.price}`);
      });

      await BluetoothPrinter.printText(PrinterCommands.LF);
      await BluetoothPrinter.printText('Thank you for your order!');
      await BluetoothPrinter.printText(PrinterCommands.LF);
      await BluetoothPrinter.printText(PrinterCommands.LF);
      await BluetoothPrinter.printText(PrinterCommands.LF);

      await BluetoothPrinter.printAndFlush();
    } catch (error) {
      console.log('Error printing:', error);
    }
  };

  return (
    <View>
      <Text>PrintBill</Text>

      <TouchableOpacity
        style={{backgroundColor: 'red', padding: 10, margin: 10}}
        onPress={printOrder}>
        <Text>Print</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PrintBill;
