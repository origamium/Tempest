import { Action, combineReducers } from "redux";
import { dataStoreReducer } from "./Slices/dataStore/reducer";
import { StoreType } from "./Store/StoreType";

export const reducers = combineReducers<StoreType, Action>({
    dataStore: dataStoreReducer,
});
