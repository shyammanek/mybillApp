import Realm from 'realm';
import { MenuItemModelTypeInterface } from './MenuItemModel';

export default class OrderModel extends Realm.Object {
  static schema = {
    name: 'Order',
    primaryKey: 'id',
    properties: {
      id: 'int',
      items: { type: 'list', objectType: 'MenuItem' },
      total: 'double',
      createdAt: 'date',
    },
  };

  static getLastId(realmInstance) {
    const lastId = realmInstance.objects('Order').sorted('id', true)[0];
    return lastId ? lastId.id : 0;
  }

  static getSchema() {
    return OrderModel.schema;
  }

  static getOrderModelName() {
    return OrderModel.schema.name;
  }
}

export type OrderModelTypeInterface = {
  id: number,
  items: MenuItemModelTypeInterface[],
  total: number,
  createdAt: string,
};