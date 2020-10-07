import { select, call } from "redux-saga/effects";
import { Action } from "redux";
import { authorizationActionsIdentifier } from "./index";
import { StoreType } from "../../Store/StoreType";
import { ServiceControl } from "../../Logics/DataFlow/Service/ServiceControl";
import { ProviderControl } from "../../Logics/DataFlow/Provider/ProviderControl";
import { TRequest } from "../../Logics/DataFlow/API/Request/Request";

export interface RequestAuthorizationSequence extends Action {
    type: authorizationActionsIdentifier.REQUEST_AUTHORIZATION_SEQUENCE;
    payload: {
        key: string;
    };
}

export const requestAuthorizationSequenceAction = (key: string): RequestAuthorizationSequence => ({
    type: authorizationActionsIdentifier.REQUEST_AUTHORIZATION_SEQUENCE,
    payload: { key },
});

export interface SuccessRequestAuthorizationSequence extends Action {
    type: authorizationActionsIdentifier.SUCCESS_REQUEST_AUTHORIZATION_SEQUENCE;
}
export const successAuthorizationSequenceAction = (): SuccessRequestAuthorizationSequence => ({
    type: authorizationActionsIdentifier.SUCCESS_REQUEST_AUTHORIZATION_SEQUENCE,
});

export function* requestAuthorizationSequenceSaga(action: RequestAuthorizationSequence) {
    const [serviceKey, providerKey] = action.payload.key.split(",");
    if (!serviceKey || !providerKey) {
        return;
    }
    const [services, providers]: [ServiceControl | undefined, ProviderControl | undefined] = yield select(
        (state: StoreType) => state ?? [undefined, undefined]
    );

    const service = services?.getService(serviceKey);
    const provider = providers?.getProvider(providerKey);

    if (!service || !provider) {
        // TODO: エラー処理
        return;
    }

    const requestAuthTokenKey = "requestAuthToken";
    const requestAuthTokenApi = service.getApiSet(requestAuthTokenKey);
    if (requestAuthTokenApi) {
        let code;
        const requestAuthTokenApiPayloads = provider.authorization.getAuthToken(requestAuthTokenApi, provider.baseUri);
        const [info ,init] = TRequest.createRequest(provider.baseUri, requestAuthTokenApi.export(), requestAuthTokenApiPayloads?.payload || {})
        try {
            const response = yield call(() => fetch(info, init));
            const result = yield call(() => service.parseResponse(requestAuthTokenApi, response))
            // todo
        }

    }

    const key = "authorizeUri";
    const getAuthorizeUriApi = service.getApiSet(key);
    if (!getAuthorizeUriApi) {
        throw new Error(`ApiSetControl.getApiSet(${key}) is undefined`);
    }
    const url = provider.authorization.getAuthorizeUri(getAuthorizeUriApi, provider.baseUri);
}
