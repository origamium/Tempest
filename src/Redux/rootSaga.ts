import { takeLatest } from "redux-saga/effects";
import { dataStoreActionsIdentifier } from "./Slices/dataStore";
import { requestRestoreSaga } from "./Slices/dataStore/requestRestore";
import { requestInitializeSaga } from "./Slices/dataStore/requestInitialize";

export function* rootSaga() {
    yield takeLatest(dataStoreActionsIdentifier.REQUEST_RESTORE, requestRestoreSaga);
    yield takeLatest(dataStoreActionsIdentifier.REQUEST_INITIALIZE, requestInitializeSaga);
}
