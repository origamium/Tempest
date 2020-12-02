import { PairOfObject, UndefinedablePairOfObject } from "../../HelperType/PairOfObject";
import { AuthorizationDataObject } from "../Authorization/Authorization";
import { Exportable } from "../../HelperType/Exportable";
import { nanoid } from "nanoid";
import arrayMove from "array-move";
import { TokenType } from "../Types/APIKeyType";

export type AccountObjectWithoutKey = {
    service: string;
    provider: string;
    authData: AuthorizationDataObject;
};

export type AccountObject = AccountObjectWithoutKey & {
    key: string;
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
            .reduce((accm, [key, value]) => ({ ...accm, [key]: { key, ...value } }), {});
        this._lineup = source.lineup;
    }

    get accountKeys() {
        return this._lineup;
    }

    get accountList(): AccountObject[] {
        return this._lineup.reduce((accm: AccountObject[], curr) => {
            const account = this.getAccount(curr);
            return account ? [...accm, account] : accm;
        }, []);
    }

    public getAccount(key: string): AccountObject | undefined {
        return this._accounts[key];
    }

    public getAccountToken(key: string): TokenType | undefined {
        const account = this._accounts[key];
        if (account) {
            return { Token: account.authData.token, TokenSecret: account.authData.tokenSecret };
        }
        return undefined;
    }

    public addAccount(source: AccountObjectWithoutKey): AccountControl {
        const newKey = nanoid();
        return new AccountControl({
            account: { ...this._accounts, [newKey]: { key: newKey, ...source } },
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
