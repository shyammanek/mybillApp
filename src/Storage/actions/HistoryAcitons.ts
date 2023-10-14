import HistoryModel from "../models/HistoryModel";
import type { HistoryModelTypeInterface } from "../models/HistoryModel";


// export type HistoryActionInterface = {
//     saveHistory: (saveHistoryResponse: HistoryModelTypeInterface) :Promise<HistoryModel>,
//     getHistory: (): HistoryModelTypeInterface,
// };
export type HistoryActionInterface = {
    saveHistory: (saveHistoryResponse: HistoryModelTypeInterface) => Promise<HistoryModel>,
    getHistory: () => HistoryModelTypeInterface,
};

export default (realmInstance: any): HistoryModelTypeInterface => {
return {
    /**
     * 
     * @param {any} saveHistoryResponse from server
     * @returns {Promise<HistoryModel>}
     */

    saveHistory: async (saveHistoryResponse: any): Promise<HistoryModel> => {
        const { items, total, createdAt } = saveHistoryResponse;
        const lastId = HistoryModel.getLastId(realmInstance);
        const newId = lastId + 1;
        return new Promise((resolve, reject) => {
            try {
                const HistoryObject = (HistoryModelTypeInterface = {
                    id: newId,
                    items: items,
                    total: total,
                    createdAt: createdAt,
                });
                realmInstance.write(() => {
                    const HistoryStored = realmInstance.create(
                        HistoryModel.getHistoryModalName(),
                        HistoryObject,
                    );
                    console.log('=========================HistoryStored ', HistoryStored);
                    resolve(HistoryStored);
                });
            } catch (e) {
                console.log('====================================', e);
                reject(e);
            }
        });
    },
    /**
     * 
     * @returns {HistoryModelTypeInterface}
     */
    getHistory: (): HistoryModelTypeInterface => {
        try {
            const history = realmInstance.objects(HistoryModel.getHistoryModalName());
            return history;
        } catch (e) {
            return undefined;
        }
    },

}
};