import Realm from 'realm';
import type {HistoryActionInterface} from './actions/HistoryAcitons';
import createHistoryAction from './actions/HistoryAcitons';
import HistoryModel from './models/HistoryModel';
import OrderModel from './models/OderModel';
// import type {OrderActionInterface} from './actions/OrderActions';
import createOrderAction from './actions/OderActions';
import {OrderActionInterface} from './actions/OderActions';

import type {MenuItemActionInterface} from './actions/MenuItemActions';
import createMenuItemAction from './actions/MenuItemActions';
import MenuItemModel from './models/MenuItemModel';

const realmInstance = new Realm({
  path: 'realmDb.realm',
  schema: [HistoryModel, MenuItemModel, OrderModel],
  schemaVersion: 1,
});

/**
 * get singleton instance
 * @returns {Realm}
 */

export const getRealmInstance = () => realmInstance;

/**
 *
 * @returns {HistoryActionInterface}
 */
export const HistoryActions: HistoryActionInterface =
  createHistoryAction(realmInstance);

export const MenuItemActions: MenuItemActionInterface =
  createMenuItemAction(realmInstance);

export const OrderActions: OrderActionInterface = createOrderAction(realmInstance);
