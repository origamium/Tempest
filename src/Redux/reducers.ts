import { combineReducers } from "redux";
import { dataStoreReducer } from "./Slices/dataStore/reducer";

export const reducers = combineReducers<any>({
    dataStore: dataStoreReducer,
});
