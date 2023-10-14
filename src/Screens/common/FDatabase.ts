import {firebase} from '@react-native-firebase/database';

export const databaseFB = firebase
  .app()
  .database(
    'https://mybill-dd8cc-default-rtdb.asia-southeast1.firebasedatabase.app/',
  );
