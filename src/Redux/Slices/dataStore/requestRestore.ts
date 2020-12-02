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
import { DataPoolControl } from "../../Logics/DataFlow/Contents/DataPoolControl";
import mastodon from "../../Logics/DataFlow/DefaultSupport/Mastodon";

export interface RequestRestoreActionType extends Action {
    type: dataStoreActionsIdentifier.REQUEST_RESTORE;
}

export const requestRestoreAction = (): RequestRestoreActionType => ({
    type: dataStoreActionsIdentifier.REQUEST_RESTORE,
});

export function* requestRestoreSaga() {
    try {
        const keys = yield call(SettingStore.keys);

        if (keys.length > 0) {
            const uiObj: UIObject = yield call([SettingStore, SettingStore.getItem], dbKeys.ui);
            const accountObj = yield call([SettingStore, SettingStore.getItem], dbKeys.account);

            // in development mode
            // const serviceObj = yield call([SettingStore, SettingStore.getItem], dbKeys.service);
            // const providerObj = yield call([SettingStore, SettingStore.getItem], dbKeys.provider);

            const service = new ServiceControl({ mastodon: mastodon.Service });
            const provider = new ProviderControl({ mastodon: mastodon.Provider });

            const contentObj = yield call([SettingStore, SettingStore.getItem], dbKeys.content);

            const page = new PageControl(uiObj.page, uiObj.columns, uiObj.mutes);
            const tabs = uiObj.tabs.map((v) => new TabControl(v, uiObj.columns, uiObj.mutes));
            const columns = uiObj.columns.map((v) => new ColumnControl(v, uiObj.mutes));
            const mutes = new MuteControl(uiObj.mutes);

            const account = new AccountControl(accountObj);
            const content = new DataPoolControl(contentObj);

            yield put(
                finishRestoreAction({ page, tabs, columns, mutes, account, datapool: content, service, provider })
            );
        } else {
            // initialization
            yield put(requestInitializeAction());
        }
    } catch (e) {
        console.error(e);
    }
}
