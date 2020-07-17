import { Accounts } from "../../Logics/SavingData/StoredObject/Account/AccountObject";
import { Services } from "../../Logics/SavingData/StoredObject/Service/ServiceObject";
import { Providers } from "../../Logics/SavingData/StoredObject/Provider/ProviderObject";
import { dbKeys } from "../../Store/indexedDB";
import { UIObject } from "../../Logics/DataFlow/UI/UIObject";

export type RootObject = {
    [dbKeys.account]: Accounts;
    [dbKeys.service]: Services;
    [dbKeys.provider]: Providers;
    [dbKeys.ui]: UIObject;
};

export type PartialRootObject = Partial<RootObject>;
