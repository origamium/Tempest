import { put } from "redux-saga/effects";
import { inDevelopmentAction } from "../debug/debug";

export function* WebhookSaga() {
    yield put(inDevelopmentAction({ target: "WebhookSaga" }));
}
