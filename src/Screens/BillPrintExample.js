import React, {useState} from 'react';
import {View, Text, TouchableOpacity,TextInput, Alert,PermissionsAndroid} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Printer,
  Printers,
  ThermalPrinterModule,
} from 'react-native-thermal-printer'; // This import might vary based on the actual library
import {
  BluetoothManager,
  BluetoothEscposPrinter,
  BluetoothTscPrinter,
} from '@pipechela/tp-react-native-bluetooth-printer';


export default class BillPrintExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      paired: [],
      loading: false,
      boundAddress: [],
      shopname: 'kc',
      phone: 'GLOABL.PHONE',
      address: 'GLOABL.ADDRESS',
      currentDate: '',
      profileData: {},
    };
  }

  loadProfileData = async () => {
    try {
      const profileData = await AsyncStorage.getItem('profileData');
      if (profileData) {
        const {name, address, businessName, mobileNo, email} =
          JSON.parse(profileData);
        this.setState({name: name, address: address, businessName: businessName, mobileNo: mobileNo, email: email})
        // setName(name);
        // setAddress(address);
        // setBusinessName(businessName);
        // setMobileNo(mobileNo);
        // setEmail(email);
        this.setState({profileData: JSON.parse(profileData)});

      }
    } catch (error) {
      console.log('Error loading profile data:', error);
    }
  };

  requestBluetoothPermission = async () => {
    try {
      const granted = await PermissionsAndroid.requestMultiple(
     [   PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
        ],
        {
          title: 'Bluetooth Scan Permission',
          message: 'Your app needs this permission to scan for Bluetooth devices.',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Bluetooth scan permission granted');
      } else {
        console.log('Bluetooth scan permission denied');
      }
    } catch (err) {
      console.warn(err);
    }  
  };

  printText = async (height = 1, width = 0) => {
    // console.log(this.state.profileData);
    // return await BluetoothEscposPrinter.printText(this.state.name, {
    //   fonttype: 0,
    //   widthtimes: width, // Text width times
    //   heigthtimes: height, // Text heigth time
    // });
  //   const columnWidths = [5, 10, 15];
  // // Define the column aligns.
  // const columnAligns = ["left", "center", "right"];
  // // Define the column texts.
  // const columnTexts = ["This is column 1", "This is column 2", "This is column 3"];
  // // Call the printColumn() function.
  // await BluetoothEscposPrinter.printColumn(columnWidths, columnAligns, columnTexts);
  };

  async componentDidMount() {
    
    await this.requestBluetoothPermission();
    this.loadProfileData();
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    this.setState({
      currentDate:
        date + '/' + month + '/' + year + ' Time' + hours + ':' + min + ':',
    });

    BluetoothManager.isBluetoothEnabled().then(
      enabled => {
        console.log(enabled);

        BluetoothManager.enableBluetooth().then(
          r => {
            var paired = [];
            if (r && r.length > 0) {
              for (var i = 0; i < r.length; i++) {
                try {
                  paired.push(JSON.parse(r[i])); // NEED TO PARSE THE DEVICE INFORMATION
                } catch (e) {
                  //ignore
                }
              }
            }
            this.setState({paired: paired});

            console.log(JSON.stringify(paired));
          },
          err => {
            Alert.alert(err);
          },
        );
      },
      err => {
        Alert.alert(err);
      },
    );
  }

  render() {
    return (
      <View>
        <Text>Printbill</Text>
        <Text>Connect Blutooth printer</Text>
        {this.state.paired.map((rowData, index) => {
          return (
            <TouchableOpacity
              onPress={() => {
                console.log(rowData.address);
                BluetoothManager.connect(rowData.address)
                  .then(
                    s => {
                      this.setState({
                        loading: false,
                        boundAddress: rowData.address,
                      });
                      Alert.alert('Connected');
                    },
                    e => {
                      this.setState({
                        loading: false,
                      });
                      Alert.alert(e);
                    },
                  );
              }}
              >
              <View
                style={{backgroundColor: '#FAFAFA', margin: 15, padding: 15}}
                key={index}>
                
                <Text>{rowData.name}</Text>
                <Text>{rowData.address}</Text>

                {this.state.boundAddress === rowData.address ? (
                  <Text style={{backgroundColor: 'lightgreen'}}>Connected</Text>
                ) : null}

              </View>
            </TouchableOpacity>
          );
        })}
        <TextInput
          label="Shop Name"
          value={this.state.shopname}
          style={{margin: 10, height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={text => this.setState({shopname: text})}
        />

        <TouchableOpacity
          style={{
            marginRight: 30,
            margin: 40,
            backgroundColor: '#F6f6f6',
            width: 100,
            height: 50,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => {
            // let data = {};
            // data.push(this.state.shopname);
            // data.push(JSON.stringify(this.state.profileData));
            this.printText();
          }}>
          <Text>Print</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

// const [printerConnected, setPrinterConnected] = useState(false);

//   const billContent = `
//     Date: 2023-08-26
//     ------------------------------
//     Item        Qty    Price
//     ------------------------------
//     Item 1      2      $10
//     Item 2      3      $15
//     ------------------------------
//     Total:             $55
//     ------------------------------
//   `;

//   const connectToPrinter = async () => {
//     try {
//       // const printerStatus = await Printers.; // Connect to the printer

//       setPrinterConnected(isConnected);
//     } catch (error) {
//       console.error('Error connecting to the printer:', error);
//     }
//   };

//   const printBill = async () => {
//     if (printerConnected) {
//       try {
//         await Printer.printText(billContent); // Print the bill content
//       } catch (error) {
//         console.error('Error printing bill:', error);
//         Alert.alert('Error printing bill:', error);
//       }
//     } else {
//       console.log('Printer not connected.');
//       Alert.alert('Printer not connected.');
//     }
//   };

//   return (
//     <View>
//       <TouchableOpacity
//         style={{backgroundColor: 'red',
//         width: 300,
//         height: 50,
//         justifyContent: 'center',
//         alignItems: 'center',
//         borderRadius: 10,
//         margin: 10,
//       }}
//       onPress={connectToPrinter}>
//         <Text
//           style={{  color: 'white',
//           fontSize: 16,
//           fontWeight: 'bold',}}
//         >Connect to Printer</Text>
//       </TouchableOpacity>
//       <TouchableOpacity
//        style={{backgroundColor: 'green',
//        width: 300,
//        height: 50,
//        justifyContent: 'center',
//        alignItems: 'center',
//        borderRadius: 10,
//        margin: 10,
//      }}
//       onPress={printBill}>
//         <Text
//           style={{  color: 'white',
//           fontSize: 16,
//           fontWeight: 'bold',}}

//         >Print Bill</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };
