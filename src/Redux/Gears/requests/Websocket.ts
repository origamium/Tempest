import { put } from "redux-saga/effects";
import { inDevelopmentAction } from "../debug/debug";

export function* WebsocketSaga() {
    yield put(inDevelopmentAction({ target: "WebsocketSaga" }));
}
