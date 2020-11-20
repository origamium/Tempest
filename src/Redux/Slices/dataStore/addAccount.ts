import { Action } from "redux";
import { AuthorizationDataObject } from "../../Logics/DataFlow/Authorization/Authorization";
import { IUser } from "../../../datatype/Contents/User";

export enum accountActionIdentifier {
    ADD_ACCOUNT = "ADD_ACCOUNT",
    DELETE_ACCOUNT = "DELETE_ACCOUNT",
    UPDATE_ACCOUNT_DATA = "UPDATE_ACCOUNT_DATA",
}

export interface AddAccountActionType extends Action {
    type: accountActionIdentifier.ADD_ACCOUNT;
    payload: {
        service: string;
        provider: string;
        authorizations: AuthorizationDataObject;
    };
}

export const addAccountAction = (
    serviceKey: string,
    providerKey: string,
    auth: AuthorizationDataObject
): AddAccountActionType => ({
    type: accountActionIdentifier.ADD_ACCOUNT,
    payload: {
        service: serviceKey,
        provider: providerKey,
        authorizations: auth,
    },
});

export interface UpdateAccountDataActionType extends Action {
    type: accountActionIdentifier.UPDATE_ACCOUNT_DATA;
    payload: IUser;
}

export const updateAccountDataAction = (user: IUser): UpdateAccountDataActionType => ({
    type: accountActionIdentifier.UPDATE_ACCOUNT_DATA,
    payload: user,
});
