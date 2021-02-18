import { Action } from "redux";
import { dataStoreActionsIdentifier } from "./index";
import { call, select } from "redux-saga/effects";
import { StoreType } from "../../Store/StoreType";
import { DataStoreType } from "./reducer";
import { dbKeys, SettingStore } from "../../Store/indexedDB";
import { UIObject } from "../../Logics/DataFlow/UI/UIObject";

export interface RequestSaveDataStoreActionType extends Action {
    type: dataStoreActionsIdentifier.REQUEST_SAVE_DATA_STORE;
}

export const requestSaveDataStore = (): RequestSaveDataStoreActionType => ({
    type: dataStoreActionsIdentifier.REQUEST_SAVE_DATA_STORE,
});

export function* requestSaveDataStoreSaga() {
    try {
        const data: DataStoreType | null = yield select((store: StoreType) => store.dataStore);
        if (data) {
            yield call([SettingStore, SettingStore.setItem], dbKeys.ui, {
                tabs: data.tabs.export(),
                columns: data.columns.map((v) => v.export()),
                mutes: data.mutes.export(),
            } as UIObject);
            yield call([SettingStore, SettingStore.setItem], dbKeys.account, data.account.export());
            yield call([SettingStore, SettingStore.setItem], dbKeys.service, data.service.export());
            yield call([SettingStore, SettingStore.setItem], dbKeys.provider, data.provider.export());
            yield call([SettingStore, SettingStore.setItem], dbKeys.content, data.datapool.export());
        }
    } catch (e) {
        console.error(e);
    }
}
