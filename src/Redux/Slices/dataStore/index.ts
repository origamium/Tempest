import { RequestRestoreActionType } from "./requestRestore";
import { FinishRestoreActionType } from "./finishRestore";
import { RequestSaveDataStoreActionType } from "./requestSaveDataStore";
import { RequestInitializeActionType } from "./requestInitialize";
import { AddAccountActionType } from "./addAccount";
import { SuccessRESTAction } from "../requests/REST";
import { AddColumnActionType } from "./column";

export enum dataStoreActionsIdentifier {
    REQUEST_RESTORE = "REQUEST_RESTORE",
    REQUEST_INITIALIZE = "REQUEST_INITIALIZE",
    FINISH_RESTORE = "FINISH_RESTORE",
    REQUEST_SAVE_DATA_STORE = "REQUEST_SAVE_DATA_STORE",
}

export type dataStoreActions =
    | RequestRestoreActionType
    | FinishRestoreActionType
    | RequestSaveDataStoreActionType
    | AddColumnActionType
    | RequestInitializeActionType
    | AddAccountActionType
    | SuccessRESTAction;
