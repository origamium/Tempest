import { PairOfObject, UndefinedablePairOfObject } from "../../HelperType/PairOfObject";
import { AuthorizationDataObject } from "../Authorization/Authorization";
import { Exportable } from "../../HelperType/Exportable";
import { nanoid } from "nanoid";
import arrayMove from "array-move";

export type AccountObject = {
    service: string;
    provider: string;
    authData: AuthorizationDataObject;
};

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
            .reduce((accm, [key, value]) => ({ ...accm, [key]: value }), {});
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
        const newKey = nanoid();
        return new AccountControl({
            account: { ...this._accounts, [newKey]: source },
            lineup: [...this._lineup, newKey],
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

    export(): Accounts {
        // TODO: ゴミ掃除method

        return {
            account: this._accounts,
            lineup: this._lineup,
        };
    }
}
