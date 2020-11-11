import { Action, combineReducers } from "redux";
import { dataStoreReducer } from "./Slices/dataStore/reducer";
import { StoreType } from "./Store/StoreType";
import { dialogReducer } from "./Slices/dialog/reducer";

export const reducers = combineReducers<StoreType, Action>({
    dataStore: dataStoreReducer,
    dialog: dialogReducer,
});
