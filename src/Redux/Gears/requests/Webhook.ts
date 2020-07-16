import { put } from "redux-saga/effects";
import { inDevelopmentAction } from "../debug/inDevelopmentAction";

export function* WebhookSaga() {
    yield put(inDevelopmentAction({ target: "WebhookSaga" }));
}
