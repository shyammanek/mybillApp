import Realm from 'realm';

export default class UserModel extends Realm.Object {
  static schema = {
    name: 'UserModel',
    primaryKey: 'id',
    properties: {
      id: {type: 'int', optional: false},
      expiry: 'string',
      fullName: 'string',
    },
  };

  static getLastId(realmInstance: any) {
    const lastId = realmInstance.objects('UserModel').sorted('id', true)[0];
    return lastId ? lastId.id : 0;
  }

  static primaryKey() {
    return UserModel.schema.primaryKey;
  }

  static getUserModalName() {
    return UserModel.schema.name;
  }
}

export type UserModelTypeInterface = {
  id: number;
  expiry: string;
  fullName: number;
};
