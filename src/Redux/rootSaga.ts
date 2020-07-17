import { takeLatest } from "redux-saga/effects";
import { dataStoreActionsIdentifier } from "./Gears/dataStore";
import { requestRestoreSaga } from "./Gears/dataStore/requestRestore";

export function* rootSaga(): any {
    yield takeLatest(dataStoreActionsIdentifier.REQUEST_RESTORE, requestRestoreSaga);
}
