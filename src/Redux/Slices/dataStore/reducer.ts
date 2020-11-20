import { PageControl } from "../../Logics/DataFlow/UI/PageControl";
import { TabControl } from "../../Logics/DataFlow/UI/TabControl";
import { ColumnControl } from "../../Logics/DataFlow/UI/ColumnControl";
import { MuteControl } from "../../Logics/DataFlow/UI/MuteControl";
import { dataStoreActions, dataStoreActionsIdentifier } from "./index";
import { AccountControl } from "../../Logics/DataFlow/Account/AccountControl";
import { ServiceControl } from "../../Logics/DataFlow/Service/ServiceControl";
import { ProviderControl } from "../../Logics/DataFlow/Provider/ProviderControl";
import { ContentsControl } from "../../Logics/DataFlow/Contents/ContentsControl";
import { accountActionIdentifier } from "./addAccount";

export type DataStoreType = {
    page: PageControl;
    tabs: TabControl[];
    columns: ColumnControl[];
    content: ContentsControl;
    mutes: MuteControl;
    account: AccountControl;
    service: ServiceControl;
    provider: ProviderControl;
};

export const dataStoreReducer = (
    state: DataStoreType | null = null,
    action: dataStoreActions
): DataStoreType | null => {
    switch (action.type) {
        case dataStoreActionsIdentifier.FINISH_RESTORE:
            return action.payload.dataStore;
        case accountActionIdentifier.ADD_ACCOUNT:
            const newAccountControl = state?.account.addAccount({
                service: action.payload.service,
                provider: action.payload.provider,
                authData: action.payload.authorizations,
            });
            if (newAccountControl && state) {
                return {
                    ...state,
                    account: newAccountControl,
                };
            }
            return state;
        default:
            return state;
    }
};
