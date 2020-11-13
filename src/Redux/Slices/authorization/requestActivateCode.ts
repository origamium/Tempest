import { authorizationActionsIdentifier } from "./index";
import { Action } from "redux";
import { ServiceControl } from "../../Logics/DataFlow/Service/ServiceControl";
import { ProviderControl } from "../../Logics/DataFlow/Provider/ProviderControl";
import { select, call } from "redux-saga/effects";
import { StoreType } from "../../Store/StoreType";

export interface RequestActivateCode extends Action {
    type: authorizationActionsIdentifier.REQUEST_CODE_ACTIVATE;
    payload: {
        key: string;
        code: string;
    };
}

export const requestActivateCode = (payload: { key: string; code: string }): RequestActivateCode => ({
    type: authorizationActionsIdentifier.REQUEST_CODE_ACTIVATE,
    payload,
});

export interface SuccessActivateCode extends Action {
    type: authorizationActionsIdentifier.SUCCESS_REQUEST_CODE_ACTIVATE;
}

export const successActivateCode = (): SuccessActivateCode => ({
    type: authorizationActionsIdentifier.SUCCESS_REQUEST_CODE_ACTIVATE,
});

export interface FailedActivateCode extends Action {
    type: authorizationActionsIdentifier.FAILED_REQUEST_CODE_ACTIVATE;
}

export const failedActivateCode = (): FailedActivateCode => ({
    type: authorizationActionsIdentifier.FAILED_REQUEST_CODE_ACTIVATE,
});

export function* requestActivateCodeSaga(action: RequestActivateCode) {
    const { key, code } = action.payload;

    const [serviceKey, providerKey] = key.split(",");

    const [services, providers]: [
        ServiceControl | undefined,
        ProviderControl | undefined
    ] = yield select((state: StoreType) =>
        state.dataStore ? [state.dataStore.service, state.dataStore.provider] : [undefined, undefined]
    );

    const service = services?.getService(serviceKey);
    const provider = providers?.getProvider(providerKey);

    if (!provider || !service) {
        // TODO: error
        return;
    }

    const apiKey = "requestToken";
    const getToken = service?.getApiSet(apiKey);

    if (!getToken) {
        throw new Error(`ApiSetControl.getApiSet(${apiKey}) is undefined`);
    }

    const [info, init] = provider.authorization.requestToken(getToken, code, providerKey);

    const res = yield call(fetch, provider.authorization.authorizeLambda.requestAuthorizeTokenLambda ?? info, init);
    const parsedResponse = yield call([service, service.parseResponse], getToken, res);
    console.log(parsedResponse);
}
