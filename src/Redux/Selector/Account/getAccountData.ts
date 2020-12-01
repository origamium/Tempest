import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { StoreType } from "../../Store/StoreType";

const accountList = (state: StoreType) => state.dataStore?.account;
const contentsObject = (state: StoreType) => state.dataStore?.datapool;

const getAccountList = createSelector(accountList, contentsObject, (accounts, contents) => {
    return (accounts?.accountKeys || []).map((v) => ({ key: v, userData: contents?.getContent("self.account", v) }));
});

export const useAccountListData = () => {
    return useSelector(getAccountList);
};
