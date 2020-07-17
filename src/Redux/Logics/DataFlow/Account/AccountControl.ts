import { IUser } from "../../../../datatype/Contents/User";
import { PairOfObject } from "../../HelperType/PairOfObject";
import { AuthorizationDataObject } from "../Authorization/Authorization";

export type AccountObject = {
    id: string;
    service: string;
    provider: string;
    authData: AuthorizationDataObject;
    latestAccountInfo?: IUser;
};

// keyは [provider.domain + id] です。idの重複を避けるためにprovider.domainがかぶせてあります。
export type Accounts = PairOfObject<AccountObject>;
