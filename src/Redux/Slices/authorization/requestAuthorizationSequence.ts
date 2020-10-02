import { Action } from "redux";
import { authorizationActionsIdentifier } from "./index";

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
    if(!serviceKey || !providerKey) {
        return;
    }
}
