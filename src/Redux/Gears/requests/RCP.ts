import { put } from "redux-saga/effects";
import { inDevelopmentAction } from "../debug/inDevelopmentAction";

export function* RCPSaga() {
    yield put(inDevelopmentAction({ target: "RCPSaga" }));
}
