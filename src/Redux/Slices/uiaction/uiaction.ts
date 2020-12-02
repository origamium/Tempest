import { Action } from "redux";
import { UIActionElement } from "../../Logics/DataFlow/UIActions/UIActionControl";
import { put } from "redux-saga/effects";
import { requestRESTAction } from "../requests/REST";

export enum uiactionsActionIdentifier {
    REQUEST_DISPATCH_UIACTION = "REQUEST_DISPATCH_UIACTION",
    FAILED_DISPATCH_UIACTION = "FAILED_DISPATCH_UIACTION",
}

export interface RequestDispatchUIAction extends Action {
    type: uiactionsActionIdentifier.REQUEST_DISPATCH_UIACTION;
    payload: {
        account: string;
        service: string;
        provider: string;
        uiElement: UIActionElement;
        parameter: any;
    };
}

export const requestDispatchUIAction = (
    uiElement: UIActionElement,
    keys: { account: string; service: string; provider: string },
    parameter: any
): RequestDispatchUIAction => ({
    type: uiactionsActionIdentifier.REQUEST_DISPATCH_UIACTION,
    payload: {
        uiElement,
        ...keys,
        parameter,
    },
});

export interface FailedDispatchUIAction extends Action {
    type: uiactionsActionIdentifier.FAILED_DISPATCH_UIACTION;
}

export const failedDispatchAction = (): FailedDispatchUIAction => ({
    type: uiactionsActionIdentifier.FAILED_DISPATCH_UIACTION,
});

export function* requestDispatchUIActionSaga(action: RequestDispatchUIAction) {
    try {
        const { account, service, provider, uiElement, parameter } = action.payload;
        // TODO: switch rest, websocket...
        yield put(requestRESTAction(account, service, provider, uiElement, parameter));
    } catch (e) {
        console.error(e);
        yield put(failedDispatchAction());
    }
}
