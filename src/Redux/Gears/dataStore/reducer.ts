import { PageControl } from "../../Logics/UI/PageControl";
import { TabControl } from "../../Logics/UI/TabControl";
import { ColumnControl } from "../../Logics/UI/ColumnControl";
import { MuteControl } from "../../Logics/UI/MuteControl";
import { dataStoreActions, dataStoreActionsIdentifier } from "./index";

export type DataStoreType = {
    page: PageControl;
    tabs: TabControl[];
    columns: ColumnControl[];
    mutes: MuteControl;
    // todo: Account, Provider, Account
};

export const dataStoreReducer = (
    state: DataStoreType | undefined = undefined,
    action: dataStoreActions
): DataStoreType | undefined => {
    switch (action.type) {
        case dataStoreActionsIdentifier.FINISH_RESTORE:
            return action.payload.dataStore;
        default:
            return state;
    }
};
