import MenuItemModel from '../models/MenuItemModel';
import type {MenuItemModelTypeInterface} from '../models/MenuItemModel';
import UserModel, {UserModelTypeInterface} from '../models/UserModel';

export type UserActionInterface = {
  saveMenuItem: (UserResponse: UserModelTypeInterface) => Promise<UserModel>;
  getUser: () => UserModelTypeInterface[];
  deleteUser: (id: number) => boolean;
};

export default (realmInstance: any) => {
  return {
    /**
     *
     * @param {any} saveUserResponse from server
     * @returns {Promise<UserModelTypeInterface>} stored User
     */

    saveUser: async (saveUserResponse: any): Promise<UserModel> => {
      const {expiry, fullName, id} = saveUserResponse;
      const lastId = UserModel.getLastId(realmInstance);
      const newId = (lastId || 0) + 1;

      return new Promise((resolve, reject) => {
        try {
          const UserObject: UserModelTypeInterface = {
            expiry: expiry,
            fullName: fullName,
            id: id,
          };
          // resolve(UserObject)
          realmInstance.write(() => {
            const UserStored = realmInstance.create(
              UserModel.getUserModalName(),
              UserObject,
            );
            console.log('=========================UserStored ', UserStored);
            resolve(UserStored);
          });
        } catch (e) {
          console.log('====================================', e);
          reject(e);
        }
      });
    },
    /**
     *
     * @returns {UserModelTypeInterface}
     */
    getUser: (): UserModelTypeInterface[] | undefined => {
      try {
        const User = realmInstance.objects(UserModel.getUserModalName());
        console.log('====================================');
        // console.log('User Actionms fiel: ', User);
        return User;
      } catch (e) {
        return undefined;
      }
    },
    deleteUser: (id: number): boolean => {
      try {
        const User = realmInstance.objects(UserModel.getUserModalName());
        realmInstance.write(() => {
          realmInstance.delete(User.filtered(`id=${id}`));
        });
        return true;
      } catch (e) {
        return false;
      }
    },
  };
};
