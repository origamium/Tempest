import { Action } from "redux";
import { dataStoreActionsIdentifier } from "./index";
import { AccountControl } from "../../Logics/DataFlow/Account/AccountControl";
import { DataPoolControl } from "../../Logics/DataFlow/Contents/DataPoolControl";
import { ServiceControl } from "../../Logics/DataFlow/Service/ServiceControl";
import { ProviderControl } from "../../Logics/DataFlow/Provider/ProviderControl";
import { put } from "redux-saga/effects";
import { finishRestoreAction } from "./finishRestore";
import { MuteControl } from "../../Logics/DataFlow/UI/MuteControl";

import mastodon from "../../Logics/DataFlow/DefaultSupport/Mastodon";
import { TabControl } from "../../Logics/DataFlow/UI/TabControl";
import { nanoid } from "nanoid";

export interface RequestInitializeActionType extends Action {
    type: dataStoreActionsIdentifier.REQUEST_INITIALIZE;
}

export const requestInitializeAction = (): RequestInitializeActionType => ({
    type: dataStoreActionsIdentifier.REQUEST_INITIALIZE,
});

export function* requestInitializeSaga() {
    try {
        // initialization
        const service = new ServiceControl({ mastodon: mastodon.Service });
        const provider = new ProviderControl({ mastodon: mastodon.Provider });
        const account = new AccountControl({ account: {}, lineup: [] });
        const datapool = new DataPoolControl({});
        const tabs = new TabControl([{ id: nanoid(), name: "default", columns: [] }]);
        const columns = [];
        const mutes = new MuteControl({});
        yield put(finishRestoreAction({ tabs, columns, mutes, account, datapool, service, provider }));
    } catch (e) {
        console.error(e);
    }
}
