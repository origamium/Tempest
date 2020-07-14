import { createStore, applyMiddleware, Store } from "redux";
import createSagaMiddleware from "redux-saga";
import { createLogger } from "redux-logger";
import { reducers } from "../Reducers/reducers";
import { StoreType } from "./StoreType";
import { RegisteredActions } from "../Actions";

const logger = createLogger({
    collapsed: true,
    duration: true,
});

export const sagaMiddleware = createSagaMiddleware();

export const configureStore = (): Store<StoreType, RegisteredActions> => {
    return createStore<StoreType, RegisteredActions, any, any>(reducers, {}, applyMiddleware(sagaMiddleware, logger));
};
