import { put, call } from "redux-saga/effects";
import { Action } from "redux";
import { dataStoreActionsIdentifier } from "./index";
import { dbKeys, SettingStore } from "../../Store/indexedDB";
import { requestInitializeAction } from "./requestInitialize";
import { PageControl } from "../../Logics/DataFlow/UI/PageControl";
import { UIObject } from "../../Logics/DataFlow/UI/UIObject";
import { TabControl } from "../../Logics/DataFlow/UI/TabControl";
import { ColumnControl } from "../../Logics/DataFlow/UI/ColumnControl";
import { MuteControl } from "../../Logics/DataFlow/UI/MuteControl";
import { finishRestoreAction } from "./finishRestore";
import { AccountControl } from "../../Logics/DataFlow/Account/AccountControl";
import { ServiceControl } from "../../Logics/DataFlow/Service/ServiceControl";
import { ProviderControl } from "../../Logics/DataFlow/Provider/ProviderControl";
import { ContentsControl } from "../../Logics/DataFlow/Contents/ContentsControl";

export interface RequestRestoreActionType extends Action {
    type: dataStoreActionsIdentifier.REQUEST_RESTORE;
}

export const requestRestoreAction = (): RequestRestoreActionType => ({
    type: dataStoreActionsIdentifier.REQUEST_RESTORE,
});

export function* requestRestoreSaga() {
    const keys = yield call(SettingStore.keys);

    if (keys.length > 0) {
        const uiObj: UIObject = yield call([SettingStore, SettingStore.getItem], dbKeys.ui);
        const accountObj = yield call([SettingStore, SettingStore.getItem], dbKeys.account);
        const serviceObj = yield call([SettingStore, SettingStore.getItem], dbKeys.service);
        const providerObj = yield call([SettingStore, SettingStore.getItem], dbKeys.provider);
        const contentObj = yield call([SettingStore, SettingStore.getItem], dbKeys.content);

        const page = new PageControl(uiObj.page, uiObj.columns, uiObj.mutes);
        const tabs = uiObj.tabs.map((v) => new TabControl(v, uiObj.columns, uiObj.mutes));
        const columns = uiObj.columns.map((v) => new ColumnControl(v, uiObj.mutes));
        const mutes = new MuteControl(uiObj.mutes);

        const account = new AccountControl(accountObj);
        const content = new ContentsControl(contentObj);
        const service = new ServiceControl(serviceObj);
        const provider = new ProviderControl(providerObj);

        yield put(finishRestoreAction({ page, tabs, columns, mutes, account, content, service, provider }));
    } else {
        // initialization
        yield put(requestInitializeAction());
    }
}
