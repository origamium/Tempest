import { takeLatest } from "redux-saga/effects";
import { dataStoreActionsIdentifier } from "./Slices/dataStore";
import { requestRestoreSaga } from "./Slices/dataStore/requestRestore";
import { requestInitializeSaga } from "./Slices/dataStore/requestInitialize";
import { authorizationActionsIdentifier } from "./Slices/authorization";
import { requestAuthorizationSequenceSaga } from "./Slices/authorization/requestAuthorizationSequence";
import { requestActivateCodeSaga } from "./Slices/authorization/requestActivateCode";
import { reqeustSaveDataStoreSaga } from "./Slices/dataStore/requestSaveDataStore";

export function* rootSaga() {
    yield takeLatest(dataStoreActionsIdentifier.REQUEST_RESTORE, requestRestoreSaga);
    yield takeLatest(dataStoreActionsIdentifier.REQUEST_INITIALIZE, requestInitializeSaga);
    yield takeLatest(dataStoreActionsIdentifier.REQUEST_SAVE_DATA_STORE, reqeustSaveDataStoreSaga);
    yield takeLatest(authorizationActionsIdentifier.REQUEST_AUTHORIZATION_SEQUENCE, requestAuthorizationSequenceSaga);
    yield takeLatest(authorizationActionsIdentifier.REQUEST_CODE_ACTIVATE, requestActivateCodeSaga);
}
