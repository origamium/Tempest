import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { StoreType } from "../../Store/StoreType";

const service = (state: StoreType) => state.dataStore?.service;
const provider = (state: StoreType) => state.dataStore?.provider;
const account = (state: StoreType) => state.dataStore?.account;
