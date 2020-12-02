import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { StoreType } from "../../Store/StoreType";

const service = (state: StoreType) => state.dataStore?.service;
const provider = (state: StoreType) => state.dataStore?.provider;
const accountList = (state: StoreType) => state.dataStore?.account;
const contentsObject = (state: StoreType) => state.dataStore?.datapool;

const getAccountList = createSelector(
    service,
    provider,
    accountList,
    contentsObject,
    (services, providers, accounts, contents) => {
        return (accounts?.accountList || []).map((v) => ({
            key: v.key,
            userData: contents?.getContent("self.account", v.key),
            uiActions: services?.getService(v.service)?.uiActions.accountListUIActions,
        }));
    }
);

export const useAccountListData = () => {
    return useSelector(getAccountList);
};
