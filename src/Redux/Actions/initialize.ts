import { RootObject } from "../Logics/SavingData/StoredObject/RootObject";
import { Action } from "redux";

export enum initializeActionIdentifier {
    REQUEST_INITIALIZE = "REQUEST_INITIALIZE",
    END_INITIALIZE = "END_INITIALIZE",
}

export interface requestInitializeActionType extends Action {
    type: initializeActionIdentifier.REQUEST_INITIALIZE;
}

export const requestInitializeAction = (): requestInitializeActionType => ({
    type: initializeActionIdentifier.REQUEST_INITIALIZE,
});

export interface finishInitializeActionType extends Action {
    type: initializeActionIdentifier.END_INITIALIZE;
    payload: {
        storedObject?: RootObject;
    };
}

export const finishInitializeAction = (storedObject?: RootObject): finishInitializeActionType => ({
    type: initializeActionIdentifier.END_INITIALIZE,
    payload: {
        storedObject,
    },
});

export type initializeActions = requestInitializeActionType | finishInitializeActionType;
