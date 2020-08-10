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
import { AccountControl, Accounts } from "../../Logics/DataFlow/Account/AccountControl";
import { ServiceControl, Services } from "../../Logics/DataFlow/Service/ServiceControl";
import { ProviderControl, Providers } from "../../Logics/DataFlow/Provider/ProviderControl";
import { ContentsControl, ContentsControlObject } from "../../Logics/DataFlow/Contents/ContentsControl";

export interface RequestRestoreActionType extends Action {
    type: dataStoreActionsIdentifier.REQUEST_RESTORE;
}

export const requestRestoreAction = (): RequestRestoreActionType => ({
    type: dataStoreActionsIdentifier.REQUEST_RESTORE,
});

export function* requestRestoreSaga() {
    const keys = yield call(SettingStore.keys);

    if (keys.length > 0) {
        const uiObj: UIObject = yield call<(key: dbKeys.ui) => Promise<UIObject>>(SettingStore.getItem, dbKeys.ui);
        const accountObj = yield call<(key: dbKeys.account) => Promise<Accounts>>(SettingStore.getItem, dbKeys.account);
        const serviceObj = yield call<(key: dbKeys.service) => Promise<Services>>(SettingStore.getItem, dbKeys.service);
        const providerObj = yield call<(key: dbKeys.provider) => Promise<Providers>>(
            SettingStore.getItem,
            dbKeys.provider
        );
        const contentObj = yield call<(key: dbKeys.content) => Promise<ContentsControlObject>>(
            SettingStore.getItem,
            dbKeys.content
        );

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
