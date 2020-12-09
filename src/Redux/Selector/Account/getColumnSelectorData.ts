import { StoreType } from "../../Store/StoreType";
import { createSelector } from "reselect";
import { useSelector } from "react-redux";

const service = (state: StoreType) => state.dataStore?.service;
const provider = (state: StoreType) => state.dataStore?.provider;
const accountList = (state: StoreType) => state.dataStore?.account;
const contentsPool = (state: StoreType) => state.dataStore?.datapool;

const getColumnSelectorData = createSelector(
    service,
    provider,
    accountList,
    contentsPool,
    (services, providers, accounts, contents) => {
        return accounts?.accountList.reduce(
            (accm, curr) => ({
                ...accm,
                [curr.key]: {
                    account: curr,
                    provider: providers?.getProvider(curr.provider),
                    sources: services?.getService(curr.service)?.uiActions.sources,
                },
            }),
            {}
        );
    }
);

export const useGetColumnSelectorData = () => {
    return useSelector(getColumnSelectorData);
};
