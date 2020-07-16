import { put } from "redux-saga/effects";
import { inDevelopmentAction } from "../debug/debug";

export function* RCPSaga() {
    yield put(inDevelopmentAction({ target: "RCPSaga" }));
}
