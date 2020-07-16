import { put } from "redux-saga/effects";
import { inDevelopmentAction } from "../debug/inDevelopmentAction";

export function* RESTRequestSaga() {
    yield put(inDevelopmentAction({ target: "RESTRequestSaga" }));
}
