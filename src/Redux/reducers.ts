import { combineReducers } from "redux";
import { dataStoreReducer } from "./Gears/dataStore/reducer";

export const reducers = combineReducers<any>({
    dataStore: dataStoreReducer,
});
