import { requestActionIdentifier } from "./index";
import { call, put, select } from "redux-saga/effects";
import { UIActionElement } from "../../Logics/DataFlow/UIActions/UIActions";
import { StoreType } from "../../Store/StoreType";
import { ServiceControl } from "../../Logics/DataFlow/Service/ServiceControl";
import { ProviderControl } from "../../Logics/DataFlow/Provider/ProviderControl";
import { AccountControl } from "../../Logics/DataFlow/Account/AccountControl";
import { ContentsControl } from "../../Logics/DataFlow/Contents/ContentsControl";
import { Action } from "redux";

export interface RequestRESTActions extends Action {
    type: requestActionIdentifier.REQUEST_REST;
    payload: {
        accountKey: string;
        serviceKey: string;
        providerKey: string;
        uiaction: UIActionElement;
        parameters: any;
    };
}

export const requestRESTAction = (
    accountKey: string,
    serviceKey: string,
    providerKey: string,
    uiaction: UIActionElement,
    parameters: any
): RequestRESTActions => ({
    type: requestActionIdentifier.REQUEST_REST,
    payload: {
        accountKey,
        serviceKey,
        providerKey,
        uiaction,
        parameters,
    },
});

export interface SuccessRESTAction extends Action {
    type: requestActionIdentifier.SUCCESS_REST;
    payload: {
        targetContentKey: string;
        data: any;
    };
}
export const successRESTAction = (targetContentKey: string, data: any): SuccessRESTAction => ({
    type: requestActionIdentifier.SUCCESS_REST,
    payload: {
        targetContentKey,
        data,
    },
});

export function* RESTRequestSaga(action: RequestRESTActions) {
    try {
        const { accountKey, serviceKey, providerKey, uiaction, parameters } = action.payload;

        const [services, providers, accounts]: [
            ServiceControl | undefined,
            ProviderControl | undefined,
            AccountControl | undefined,
            ContentsControl | undefined
        ] = yield select((state: StoreType) =>
            state.dataStore
                ? [state.dataStore.service, state.dataStore.provider, state.dataStore.account, state.dataStore.content]
                : [undefined, undefined, undefined, undefined]
        );

        const service = services?.getService(serviceKey);
        const provider = providers?.getProvider(providerKey);
        const account = accounts?.getAccount(accountKey);

        if (!provider || !service || !account) {
            throw new Error("");
        }

        const api = service.getApiSet(uiaction.targetApiKey);
        const targetContentKey = uiaction.targetContentKey;

        if (!api) {
            throw new Error(`API key ${uiaction.targetApiKey} is undefined`);
        }

        const [requestInfo, requestInit] = api.createRequest(provider.baseUri, parameters);
        const response = yield call(fetch, requestInfo, requestInit);
        const data = service.parseResponse(api, response);

        yield put(successRESTAction(targetContentKey, data));
    } catch (e) {
        // TODO;
        console.error(e);
    }
}
