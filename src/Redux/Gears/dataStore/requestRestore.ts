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

export interface RequestRestoreActionType extends Action {
    type: dataStoreActionsIdentifier.REQUEST_RESTORE;
}

export const requestRestoreAction = (): RequestRestoreActionType => ({
    type: dataStoreActionsIdentifier.REQUEST_RESTORE,
});

export function* requestRestoreSaga() {
    const keys = yield call(SettingStore.keys);

    if (keys.length > 0) {
        const ui: UIObject = yield call<(key: dbKeys.ui) => Promise<UIObject>>(SettingStore.getItem, dbKeys.ui);
        const page = new PageControl(ui.page, ui.columns, ui.mutes);
        const tabs = ui.tabs.map((v) => new TabControl(v, ui.columns, ui.mutes));
        const columns = ui.columns.map((v) => new ColumnControl(v, ui.mutes));
        const mutes = new MuteControl(ui.mutes);

        /*
        const accounts = yield call(SettingStore.getItem, dbKeys.account);
        const services = yield call(SettingStore.getItem, dbKeys.service);
        const providers = yield call(SettingStore.getItem, dbKeys.service);
        */

        yield put(finishRestoreAction({ page, tabs, columns, mutes }));
    } else {
        // initialization
        yield put(requestInitializeAction());
    }
}
