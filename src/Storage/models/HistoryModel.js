import Realm from 'realm';

export default class HistoryModel extends Realm.Object {
  static schema = {
    name: 'History',
    primaryKey: 'id',
    properties: {
      id: 'int',
      items: 'MenuItem[]',
      total: 'int',
      createdAt: 'string',
    },
  };

  static getLastId(realmInstance) {
    const lastId = realmInstance.objects('History').sorted('id', true)[0];
    return lastId ? lastId.id : 0;
  }

  static primaryKey() {
    return HistoryModel.schema.primaryKey;
  }

  static getHistoryModalName() {
    return HistoryModel.schema.name;
  }
}

export type HistoryModelTypeInterface = {
  id: number,
  items: string,
  total: number,
  createdAt: string,
};
