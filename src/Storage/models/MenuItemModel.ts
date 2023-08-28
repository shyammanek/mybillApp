import Realm from 'realm';

export default class MenuItemModel extends Realm.Object {
  static schema = {
    name: 'MenuItem',
    primaryKey: 'id',
    properties: {
      id: { type: 'int', optional: false },
      name: 'string',
      price: 'int',
      description: 'string',
      category: 'string',
      isOrder: { type: 'bool', optional: true },
    },
  };

  static getLastId(realmInstance) {
    const lastId = realmInstance.objects('MenuItem').sorted('id', true)[0];
    return lastId ? lastId.id : 0;
  }

  static primaryKey() {
    return MenuItemModel.schema.primaryKey;
  }

  static getMenuItemModalName() {
    return MenuItemModel.schema.name;
  }
}

export type MenuItemModelTypeInterface = {
  id: number,
  name: string,
  price: number,
  description: string,
  category: string,
  quantity: number
  isOrder?: boolean
};
