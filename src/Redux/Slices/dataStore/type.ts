import { dbKeys } from "../../Store/indexedDB";
import { UIObject } from "../../Logics/DataFlow/UI/UIObject";
import { Accounts } from "../../Logics/DataFlow/Account/AccountControl";
import { Providers } from "../../Logics/DataFlow/Provider/ProviderControl";
import { Services } from "../../Logics/DataFlow/Service/ServiceControl";
import { DataPoolObject } from "../../Logics/DataFlow/Contents/DataPoolControl";

export type ControlObject = {
    [dbKeys.account]: Accounts;
    [dbKeys.service]: Services;
    [dbKeys.provider]: Providers;
    [dbKeys.ui]: UIObject;
    [dbKeys.content]: DataPoolObject;
    [dbKeys.setting]: unknown;
    [dbKeys.credentials]: unknown;
};

export type PartialRootObject = Partial<ControlObject>;
