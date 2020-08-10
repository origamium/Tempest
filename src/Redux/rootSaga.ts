import { takeLatest } from "redux-saga/effects";
import { dataStoreActionsIdentifier } from "./Gears/dataStore";
import { requestRestoreSaga } from "./Gears/dataStore/requestRestore";
import { requestInitializeSaga } from "./Gears/dataStore/requestInitialize";

export function* rootSaga() {
    yield takeLatest(dataStoreActionsIdentifier.REQUEST_RESTORE, requestRestoreSaga);
    yield takeLatest(dataStoreActionsIdentifier.REQUEST_INITIALIZE, requestInitializeSaga);
}
