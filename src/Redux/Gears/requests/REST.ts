import { put } from "redux-saga/effects";
import { inDevelopmentAction } from "../debug/debug";

export function* RESTRequestSaga() {
    yield put(inDevelopmentAction({ target: "RESTRequestSaga" }));
}
