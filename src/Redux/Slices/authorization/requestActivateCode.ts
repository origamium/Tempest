import { authorizationActionsIdentifier } from "./index";
import { Action } from "redux";

export interface RequestActivateCode extends Action {
    type: authorizationActionsIdentifier.REQUEST_CODE_ACTIVATE;
    payload: {
        providerKey: string;
        code: string;
    };
}

export const requestActivateCode = (payload: { providerKey: string; code: string }): RequestActivateCode => ({
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
