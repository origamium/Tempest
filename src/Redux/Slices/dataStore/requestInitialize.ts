import { Action } from "redux";
import { dataStoreActionsIdentifier } from "./index";
import { PageControl } from "../../Logics/DataFlow/UI/PageControl";
import { AccountControl } from "../../Logics/DataFlow/Account/AccountControl";
import { ContentsControl } from "../../Logics/DataFlow/Contents/ContentsControl";
import { ServiceControl } from "../../Logics/DataFlow/Service/ServiceControl";
import { ProviderControl } from "../../Logics/DataFlow/Provider/ProviderControl";
import { put } from "redux-saga/effects";
import { finishRestoreAction } from "./finishRestore";
import { MuteControl } from "../../Logics/DataFlow/UI/MuteControl";

import twitter from "../../Logics/DataFlow/DefaultSupport/Twitter";

export interface RequestInitializeActionType extends Action {
    type: dataStoreActionsIdentifier.REQUEST_INITIALIZE;
}

export const requestInitializeAction = (): RequestInitializeActionType => ({
    type: dataStoreActionsIdentifier.REQUEST_INITIALIZE,
});

export function* requestInitializeSaga() {
    // initialization
    const service = new ServiceControl({ twitter: twitter.service });
    const provider = new ProviderControl({ twitter: twitter.provider });
    const account = new AccountControl({ account: {}, lineup: [] });
    const content = new ContentsControl({});
    const page = new PageControl({ tabs: [] }, [], {});
    const tabs = [];
    const columns = [];
    const mutes = new MuteControl({});
    yield put(finishRestoreAction({ page, tabs, columns, mutes, account, content, service, provider }));
}
