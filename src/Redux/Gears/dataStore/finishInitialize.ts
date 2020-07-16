import { Action } from "redux";
import { RootObject } from "../../Logics/SavingData/StoredObject/RootObject";
import { dataStoreActionsIdentifier } from "./index";

export interface FinishInitializeActionType extends Action {
    type: dataStoreActionsIdentifier.END_INITIALIZE;
    payload: {
        storedObject?: RootObject;
    };
}

export const finishInitializeAction = (storedObject?: RootObject): FinishInitializeActionType => ({
    type: dataStoreActionsIdentifier.END_INITIALIZE,
    payload: {
        storedObject,
    },
});
