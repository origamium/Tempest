import { put } from "redux-saga/effects";
import { inDevelopmentAction } from "../Actions/debug";

export function* RESTRequestSaga() {
    yield put(inDevelopmentAction({ target: "RESTRequestSaga" }));
}
