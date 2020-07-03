import { RootObject } from "../Logics/SavingData/StoredObject/RootObject";

export enum initializeActionIdentifier {
    REQUEST_INITIALIZE = "REQUEST_INITIALIZE",
    END_INITIALIZE = "END_INITIALIZE",
}

export interface requestInitialize {
    type: initializeActionIdentifier.REQUEST_INITIALIZE;
}

export interface endInitialize {
    type: initializeActionIdentifier.END_INITIALIZE;
    payload: {
        storedObject?: RootObject;
    };
}

export type initializeActions = requestInitialize | endInitialize;
