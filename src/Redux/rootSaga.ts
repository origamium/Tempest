import { takeLatest, takeEvery } from "redux-saga/effects";
import { dataStoreActionsIdentifier } from "./Slices/dataStore";
import { requestRestoreSaga } from "./Slices/dataStore/requestRestore";
import { requestInitializeSaga } from "./Slices/dataStore/requestInitialize";
import { authorizationActionsIdentifier } from "./Slices/authorization";
import { requestAuthorizationSequenceSaga } from "./Slices/authorization/requestAuthorizationSequence";
import { requestActivateCodeSaga } from "./Slices/authorization/requestActivateCode";
import { requestSaveDataStoreSaga } from "./Slices/dataStore/requestSaveDataStore";
import { requestActionIdentifier } from "./Slices/requests";
import { requestRESTRSaga } from "./Slices/requests/REST";

export function* rootSaga() {
    yield takeLatest(dataStoreActionsIdentifier.REQUEST_RESTORE, requestRestoreSaga);
    yield takeLatest(dataStoreActionsIdentifier.REQUEST_INITIALIZE, requestInitializeSaga);
    yield takeLatest(dataStoreActionsIdentifier.REQUEST_SAVE_DATA_STORE, requestSaveDataStoreSaga);
    yield takeLatest(authorizationActionsIdentifier.REQUEST_AUTHORIZATION_SEQUENCE, requestAuthorizationSequenceSaga);
    yield takeLatest(authorizationActionsIdentifier.REQUEST_CODE_ACTIVATE, requestActivateCodeSaga);
    yield takeEvery(requestActionIdentifier.REQUEST_REST, requestRESTRSaga);
}
