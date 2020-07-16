import { createStore, applyMiddleware, Store } from "redux";
import createSagaMiddleware from "redux-saga";
import { createLogger } from "redux-logger";
import { reducers } from "../reducers";
import { StoreType } from "./StoreType";
import { RegisteredActions } from "../index";

const logger = createLogger({
    collapsed: true,
    duration: true,
});

export const sagaMiddleware = createSagaMiddleware();

export const configureStore = (): Store<StoreType, RegisteredActions> => {
    return createStore<StoreType, RegisteredActions, any, any>(reducers, {}, applyMiddleware(sagaMiddleware, logger));
};
