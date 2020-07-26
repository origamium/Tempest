import { IUser } from "../../../../datatype/Contents/User";
import { PairOfObject, UndefinedablePairOfObject } from "../../HelperType/PairOfObject";
import { AuthorizationDataObject } from "../Authorization/Authorization";
import { Exportable } from "../../HelperType/Exportable";
import arrayMove from "array-move";

export type AccountObject = {
    id: string;
    service: string;
    provider: string;
    authData: AuthorizationDataObject;
    latestAccountInfo?: IUser;
};

// keyは [provider.domain + id] です。idの重複を避けるためにprovider.domainがかぶせてあります。
export type Accounts = {
    account: UndefinedablePairOfObject<AccountObject>;
    lineup: string[];
};

export class AccountControl implements Exportable<Accounts> {
    private _accounts: PairOfObject<AccountObject>;
    private _lineup: string[];

    constructor(source: Accounts) {
        this._accounts = Object.entries(source.account)
            .filter(([, value]) => value)
            .reduce((accm, [, curr]) => ({ ...accm, [curr!.id]: curr }), {});
        this._lineup = source.lineup;
    }

    get accountKeys() {
        return Object.keys(this._accounts);
    }

    get accountList(): AccountObject[] {
        return this._lineup.map((v) => this._accounts[v]).filter(Boolean);
    }

    public getAccount(key: string): AccountObject | undefined {
        return this._accounts[key];
    }

    public addAccount(source: AccountObject): AccountControl {
        return new AccountControl({
            account: { ...this._accounts, [source.id]: source },
            lineup: [...this._lineup, source.id],
        });
    }

    public accountPositionChange(key: string, pos: number): AccountControl | never {
        const oldPos = this._lineup.findIndex((v) => v === key);
        if (oldPos !== -1) {
            return new AccountControl({
                account: { ...this._accounts },
                lineup: arrayMove(this._lineup, oldPos, pos),
            });
        }

        // TODO: error

        return this;
    }

    public updateAccountInfo(key: string, accountInfo: IUser): AccountControl | never {
        const baseAccount = this.getAccount(key);
        if (baseAccount) {
            return new AccountControl({
                account: { ...this._accounts, [key]: { ...baseAccount, latestAccountInfo: accountInfo } },
                lineup: [...this._lineup],
            });
        }
        // TODO: error
        return this;
    }

    export(): Accounts {
        // TODO: ゴミ掃除method

        return {
            account: this._accounts,
            lineup: this._lineup,
        };
    }
}
