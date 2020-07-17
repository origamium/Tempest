import { dbKeys } from "../../Store/indexedDB";
import { UIObject } from "../../Logics/DataFlow/UI/UIObject";
import { Accounts } from "../../Logics/DataFlow/Account/AccountControl";
import { Providers } from "../../Logics/DataFlow/Provider/ProviderControl";
import { Services } from "../../Logics/DataFlow/Service/ServiceControl";

export type RootObject = {
    [dbKeys.account]: Accounts;
    [dbKeys.service]: Services;
    [dbKeys.provider]: Providers;
    [dbKeys.ui]: UIObject;
};

export type PartialRootObject = Partial<RootObject>;
