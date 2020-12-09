import { requestActionIdentifier } from "./index";
import { call, put, select } from "redux-saga/effects";
import { UIActionElement } from "../../Logics/DataFlow/UIActions/UIActionControl";
import { StoreType } from "../../Store/StoreType";
import { ServiceControl } from "../../Logics/DataFlow/Service/ServiceControl";
import { ProviderControl } from "../../Logics/DataFlow/Provider/ProviderControl";
import { AccountControl } from "../../Logics/DataFlow/Account/AccountControl";
import { DataPoolControl } from "../../Logics/DataFlow/Contents/DataPoolControl";
import { Action } from "redux";
import { simplyTransformer } from "../../Logics/DataFlow/Data/Dynamizr/Functions/transformer";
import { requestSaveDataStore } from "../dataStore/requestSaveDataStore";

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
        uiActionElement: UIActionElement;
        keys: { account: string };
        data: any;
    };
}
export const successRESTAction = (
    uiActionElement: UIActionElement,
    keys: { account: string },
    data: any
): SuccessRESTAction => ({
    type: requestActionIdentifier.SUCCESS_REST,
    payload: {
        uiActionElement,
        keys,
        data,
    },
});

export function* requestRESTRSaga(action: RequestRESTActions) {
    try {
        const { accountKey, serviceKey, providerKey, uiaction, parameters } = action.payload;

        const [services, providers, accounts]: [
            ServiceControl | undefined,
            ProviderControl | undefined,
            AccountControl | undefined,
            DataPoolControl | undefined
        ] = yield select((state: StoreType) =>
            state.dataStore
                ? [state.dataStore.service, state.dataStore.provider, state.dataStore.account, state.dataStore.datapool]
                : [undefined, undefined, undefined, undefined]
        );

        const service = services?.getService(serviceKey);
        const provider = providers?.getProvider(providerKey);
        const account = accounts?.getAccount(accountKey);
        const token = accounts?.getAccountToken(accountKey);

        if (!provider || !service || !account) {
            throw new Error("");
        }

        const api = service.getApiSet(uiaction.targetApiKey);

        if (!api) {
            throw new Error(`API key ${uiaction.targetApiKey} is undefined`);
        }

        const transformedParameter = simplyTransformer(uiaction.schema, parameters);

        const authorization = token
            ? provider.authorization.getAuthorizationData(provider.baseUri, api, token, transformedParameter)
            : undefined;

        const [requestInfo, requestInit] = api.createRequest(provider.baseUri, transformedParameter, authorization);
        const response = yield call(fetch, requestInfo, requestInit);
        console.log(api);
        const data = yield call([service, service.parseResponse], api, response);

        yield put(successRESTAction(uiaction, { account: accountKey }, data));
        yield put(requestSaveDataStore());
    } catch (e) {
        // TODO;
        console.error(e);
    }
}
