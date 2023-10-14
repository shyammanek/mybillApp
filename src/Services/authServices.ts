import moment from 'moment';
import {databaseFB} from '../Screens/common/FDatabase';
import {UserActions} from '../Storage/Database';

export type UserType = {
  fullName: string;
  expiry: string;
  password?: string;
  id: string;
};
export type loginUserType = (value: {
  username: string;
  password: string;
}) => Promise<UserType | undefined>;

export const loginUser: loginUserType = async ({username, password}) => {
  try {
    const result = await databaseFB.ref('users/' + username).once('value');
    const data: UserType = result.val();
    if (data && data.password == password) {
      if (moment().diff(moment(data.expiry, 'YYYY-MM-DD'), 'days') >= 0) {
        await UserActions.saveUser({
          expiry: data.expiry,
          fullName: data.fullName,
          id: data.id,
        });
        return {...data, password: undefined};
      } else {
        throw new Error('Access Expired');
      }
    }
  } catch (err) {
    console.log('🚀 ~ file: authServices.ts:11 ~ loginUser ~ err:', err);
  }
};
