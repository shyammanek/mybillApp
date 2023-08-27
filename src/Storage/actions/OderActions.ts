// import Realm from 'realm';
// import { MenuItemModelTypeInterface } from '../models/MenuItemModel';

// export const createOrderAction = (realmInstance: Realm): OrderActionInterface => {
//   return {
//     createOrder: (
//       items: MenuItemModelTypeInterface[],
//       total: number,
//       createdAt: string
//     ) => {
//       realmInstance.write(() => {
//         const lastId = realmInstance.objects('Order').sorted('id', true)[0];
//         const newId = lastId ? lastId.id + 1 : 1;

//         const newOrder = realmInstance.create('Order', {
//           id: newId,
//           items: items,
//           total: total,
//           createdAt: createdAt,
//         });

//         // Perform any additional operations or validations on the newOrder if needed

//         console.log('Created Order:', newOrder);
//       });
//     },

//     getAllOrders: () => {
//       return realmInstance.objects('Order');
//     },

//     getOrderById: (orderId: number) => {
//       return realmInstance.objectForPrimaryKey('Order', orderId);
//     },

//     updateOrder: (orderId: number, updatedOrder: OrderModelTypeInterface) => {
//       const order = realmInstance.objectForPrimaryKey('Order', orderId);
//       if (order) {
//         realmInstance.write(() => {
//           Object.assign(order, updatedOrder);
//           console.log('Updated Order:', order);
//         });
//       }
//     },

//     deleteOrder: (orderId: number) => {
//       const order = realmInstance.objectForPrimaryKey('Order', orderId);
//       if (order) {
//         realmInstance.write(() => {
//           realmInstance.delete(order);
//           console.log('Deleted Order:', order);
//         });
//       }
//     },
//   };
// };

// export default createOrderAction;

import OrderModel from '../models/OderModel';
import type { OrderModelTypeInterface } from '../models/OderModel';

export type OrderActionInterface = {
  createOrder: (
    menuItems: MenuItemModelTypeInterface[]
  ) => Promise<OrderModel>,
};

export default (realmInstance: any): OrderModelTypeInterface => {
  return {
    /**
     *
     * @param {MenuItemModelTypeInterface[]} menuItems
     * @returns {Promise<OrderModel>}
     */
    createOrder: async (menuItems: MenuItemModelTypeInterface[]): Promise<OrderModel> => {
      // Validate menuItems
      if (!menuItems || menuItems.length === 0) {
        throw new Error('Please select at least one menu item for the order.');
      }

      // Get the total price by summing up the prices of selected menu items
      const totalPrice = menuItems.reduce((sum, item) => sum + (parseFloat(item.price) * item.quantity), 0);

      return new Promise((resolve, reject) => {
        try {
          realmInstance.write(() => {
            const orderObject = {
              items: menuItems,
              total: totalPrice,
              createdAt: new Date().toISOString(),
            };

            const order = realmInstance.create(OrderModel.getHistoryModalName(), orderObject);
            resolve(order);
          });
        } catch (error) {
          reject(error);
        }
      });
    },
  };
};
