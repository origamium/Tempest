import { put } from "redux-saga/effects";
import { inDevelopmentAction } from "../debug/inDevelopmentAction";

export function* WebsocketSaga() {
    yield put(inDevelopmentAction({ target: "WebsocketSaga" }));
}
