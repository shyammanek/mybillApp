import MenuItemModel from '../models/MenuItemModel';
import type {MenuItemModelTypeInterface} from '../models/MenuItemModel';

export type MenuItemActionInterface = {
  saveMenuItem: (
    MenuItemResponse: MenuItemModelTypeInterface,
  ) => Promise<MenuItemModel>,
  getMenuItem: () => MenuItemModelTypeInterface,
};

export default (realmInstance: any): MenuItemModelTypeInterface => {
  return {
    /**
     *
     * @param {any} saveMenuItemResponse from server
     * @returns {Promise<MenuItemModelTypeInterface>} stored MenuItem
     */

    saveMenuItem: async (saveMenuItemResponse: any): Promise<MenuItemModel> => {
      const {name, price, description, category} = saveMenuItemResponse;
      const lastId = MenuItemModel.getLastId(realmInstance);
      const newId = lastId + 1;

      return new Promise((resolve, reject) => {
        try {
          console.log('Name: ', name, price, description, category);
          const MenuItemObject = (MenuItemModelTypeInterface = {
            id: newId,
            name: name,
            price: price,
            description: description,
            category: category,
          });
          // resolve(MenuItemObject)
          realmInstance.write(() => {
            const MenuItemStored = realmInstance.create(
              MenuItemModel.getMenuItemModalName(),
              MenuItemObject,
            );
            console.log('=========================MenuItemStored ', MenuItemStored);
            resolve(MenuItemStored);
          });
        } catch (e) {
            console.log('====================================',e);
          reject(e);
        }
      });
    },
    /**
     *
     * @returns {MenuItemModelTypeInterface}
     */
    getMenuItem: (): MenuItemModelTypeInterface => {
      try {
        const MenuItem = realmInstance.objects(
          MenuItemModel.getMenuItemModalName(),
        );
        // console.log('====================================');
        // console.log('MenuItem Actionms fiel: ', MenuItem);
        return MenuItem;
      } catch (e) {
        return undefined;
      }
    },
  };
};
