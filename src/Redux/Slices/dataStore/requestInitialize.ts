import { Action } from "redux";
import { dataStoreActionsIdentifier } from "./index";
import { PageControl } from "../../Logics/DataFlow/UI/PageControl";
import { AccountControl } from "../../Logics/DataFlow/Account/AccountControl";
import { DataPoolControl } from "../../Logics/DataFlow/Contents/DataPoolControl";
import { ServiceControl } from "../../Logics/DataFlow/Service/ServiceControl";
import { ProviderControl } from "../../Logics/DataFlow/Provider/ProviderControl";
import { put } from "redux-saga/effects";
import { finishRestoreAction } from "./finishRestore";
import { MuteControl } from "../../Logics/DataFlow/UI/MuteControl";

import mastodon from "../../Logics/DataFlow/DefaultSupport/Mastodon";

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
        const content = new DataPoolControl({});
        const page = new PageControl({ tabs: [] }, [], {});
        const tabs = [];
        const columns = [];
        const mutes = new MuteControl({});
        yield put(finishRestoreAction({ page, tabs, columns, mutes, account, datapool: content, service, provider }));
    } catch (e) {
        console.error(e);
    }
}
