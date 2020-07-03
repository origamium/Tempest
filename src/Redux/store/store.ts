import { createStore, applyMiddleware, Store } from "redux";
import createSagaMiddleware from "redux-saga";
import { createLogger } from "redux-logger";
import { reducers } from "../Reducers/reducers";

const logger = createLogger({
    collapsed: true,
    duration: true,
});

export const sagaMiddleware = createSagaMiddleware();

export const configureStore = (): Store<any, any> => {
    return createStore(reducers, {}, applyMiddleware(sagaMiddleware, logger));
};
