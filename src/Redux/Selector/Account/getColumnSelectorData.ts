import { StoreType } from "../../Store/StoreType";
import { createSelector } from "reselect";
import { useSelector } from "react-redux";
import { DataPoolControl } from "../../Logics/DataFlow/Contents/DataPoolControl";
import { IUser } from "../../../datatype/Contents/User";

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
        return (accounts?.accountList ?? []).map((v) => ({
            account: v,
            accountData: contents?.getContent(DataPoolControl.generateKey(v.key, "self.account")) as IUser,
            provider: providers?.getProvider(v.provider),
            sources: services?.getService(v.service)?.uiActions.sources,
        }));
    }
);

export const useGetColumnSelectorData = () => {
    return useSelector(getColumnSelectorData);
};
