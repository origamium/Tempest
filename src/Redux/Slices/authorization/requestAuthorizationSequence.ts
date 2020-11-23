import { select, put } from "redux-saga/effects";
import { Action } from "redux";
import { authorizationActionsIdentifier } from "./index";
import { StoreType } from "../../Store/StoreType";
import { ServiceControl } from "../../Logics/DataFlow/Service/ServiceControl";
import { ProviderControl } from "../../Logics/DataFlow/Provider/ProviderControl";
import { nextPageAction } from "../dialog";

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
    try {
        const [serviceKey, providerKey] = action.payload.key.split(",");
        if (!serviceKey || !providerKey) {
            return;
        }
        const [services, providers]: [
            ServiceControl | undefined,
            ProviderControl | undefined
        ] = yield select((state: StoreType) =>
            state.dataStore ? [state.dataStore.service, state.dataStore.provider] : [undefined, undefined]
        );

        const service = services?.getService(serviceKey);
        const provider = providers?.getProvider(providerKey);

        if (!service || !provider) {
            // TODO: エラー処理
            return;
        }

        /*
    ** TODO

    const requestAuthTokenKey = "requestAuthToken";
    const requestAuthTokenApi = service.getApiSet(requestAuthTokenKey);
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    let code, nonce;
    if (requestAuthTokenApi) {
        const requestAuthTokenApiPayloads = provider.authorization.getAuthToken(requestAuthTokenApi, provider.baseUri);
        const [info, init] = TRequest.createRequest(
            provider.baseUri,
            requestAuthTokenApi.export(),
            requestAuthTokenApiPayloads?.payload || {}
        );
        try {
            const response = yield call(() => fetch(info, init));
            const data = yield call(() => service.parseResponse(requestAuthTokenApi, response));
            console.log(data);
        } catch (e) {

        }
    }

    */

        const key = "authorizeUri";
        const getAuthorizeUriApi = service.getApiSet(key);
        if (!getAuthorizeUriApi) {
            throw new Error(`ApiSetControl.getApiSet(${key}) is undefined`);
        }

        const url = provider.authorization.getAuthorizeUri(getAuthorizeUriApi, provider.baseUri);
        window.open(url);
        yield put(nextPageAction());
    } catch (e) {
        console.error(e);
    }
}
