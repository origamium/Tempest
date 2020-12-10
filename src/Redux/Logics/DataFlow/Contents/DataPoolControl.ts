import type { PairOfObject, UndefinedablePairOfObject } from "../../HelperType/PairOfObject";
import { Exportable } from "../../HelperType/Exportable";
import { UIActionElement } from "../UIActions/UIActionControl";

export type DataPoolStruct = {
    accountKey: string;
    maxListLength: number; //default: 1000
    poolKey: string;
    dataPoolSourceKey?: string;
    content?: any;
};

export type DataPoolObject = UndefinedablePairOfObject<DataPoolStruct>;

export class DataPool implements Exportable<DataPoolStruct> {
    private _accountKey: string;
    private _poolKey: string;
    private _dataPoolSourceKey: string | undefined;
    private _contents: any;
    private _maxListLength: number;

    constructor(source: DataPoolStruct, renew?: { content: any }) {
        this._accountKey = source.accountKey;
        this._maxListLength = source.maxListLength;
        this._poolKey = source.poolKey;
        this._dataPoolSourceKey = source.dataPoolSourceKey;

        if (renew) {
            this._contents = renew.content;
        } else if (source.content) {
            this._contents = source.content;
        }
    }

    get poolKey() {
        return this._poolKey;
    }

    get contents() {
        return this._contents;
    }

    public updateContent(update: { data: any | any[] }): DataPool {
        const updateDataIsList = Array.isArray(update.data);
        const sourceDataIsList = Array.isArray(this._contents);
        if (updateDataIsList && sourceDataIsList) {
            return new DataPool(this.export(), { content: [...this._contents, ...update.data] });
        } else if (!updateDataIsList && sourceDataIsList) {
            return new DataPool(this.export(), { content: [...this.contents, update.data] });
        } else {
            return new DataPool(this.export(), { content: update.data });
        }
    }

    public clearCache(): DataPool {
        return new DataPool(this.export());
    }

    public adjustCache(): DataPool {
        if (Array.isArray(this._contents)) {
            return new DataPool(this.export(), { content: this._contents.splice(0, this._maxListLength) });
        }
        return new DataPool(this.export(), { content: this._contents });
    }

    public renew(): DataPool {
        return new DataPool(this.export(), { content: this._contents });
    }

    export(): DataPoolStruct {
        return {
            accountKey: this._accountKey,
            maxListLength: this._maxListLength,
            poolKey: this._poolKey,
            dataPoolSourceKey: this._dataPoolSourceKey,
            content: this._contents,
        };
    }

    exportAll(): DataPoolStruct {
        return {
            accountKey: this._accountKey,
            maxListLength: this._maxListLength, //default: 1000
            poolKey: this._poolKey,
            dataPoolSourceKey: this._dataPoolSourceKey,
            content: this._contents,
        };
    }
}

export class DataPoolControl implements Exportable<DataPoolObject> {
    private _pools: PairOfObject<DataPool>;

    constructor(source: DataPoolObject, exists?: PairOfObject<DataPool>) {
        if (exists) {
            this._pools = { ...exists };
        } else {
            this._pools = Object.entries(source)
                .filter(([, value]) => value)
                .reduce(
                    (accm, [, curr]) => ({
                        ...accm,
                        [`${curr!.poolKey},${curr!.dataPoolSourceKey ?? ""},${curr!.accountKey}`]: new DataPool(curr!),
                    }),
                    {}
                );
        }
    }

    public static generateKeyFromUIElement(uiElement: UIActionElement, account: string) {
        return `${uiElement.dataPoolKey},${uiElement.dataPoolSourceKey ?? ""},${account}`;
    }
    public static generateKey(account: string, datapoolKey: string, datapoolSourceKey?: string) {
        return `${datapoolKey},${datapoolSourceKey ?? ""},${account}`;
    }

    public static parseKey(
        key: string
    ): { dataPoolKey: string; dataPoolSourceKey: string | undefined; account: string } {
        const keys = key.split(",");
        return { dataPoolKey: keys[0]!, dataPoolSourceKey: keys[1]! === "" ? undefined : keys[1]!, account: keys[2]! };
    }

    public addContent(
        key: string,
        account: string,
        option: { isList: boolean; maxListLength: number },
        data?: any
    ): DataPoolControl {
        return new DataPoolControl(
            {},
            {
                ...this._pools,
                [key]: new DataPool({
                    poolKey: key,
                    accountKey: account,
                    maxListLength: option.maxListLength,
                    content: data,
                }),
            }
        );
    }

    public updateContent(uiElement: UIActionElement, keys: { account: string }, data: any): DataPoolControl {
        const key = DataPoolControl.generateKeyFromUIElement(uiElement, keys.account);
        const pool = this._pools[key];

        if (pool) {
            return new DataPoolControl(
                {},
                Object.entries(this._pools).reduce(
                    (accm, [currKey, currValue]) => ({
                        ...accm,
                        [currKey]: currKey === key ? currValue.updateContent({ data }) : currValue.renew(),
                    }),
                    {}
                )
            );
        } else {
            return new DataPoolControl(
                {},
                {
                    ...this.exportDataPools(),
                    [key]: new DataPool({
                        accountKey: keys.account,
                        content: data,
                        maxListLength: 1000,
                        poolKey: uiElement.dataPoolKey,
                        dataPoolSourceKey: uiElement.dataPoolSourceKey,
                    }),
                }
            );
        }
    }

    public getContent(key: string): any | undefined {
        return this._pools[key]?.contents;
    }

    export(): DataPoolObject {
        return Object.entries(this._pools).reduce((accm, [key, curr]) => ({ ...accm, [key]: curr.export() }), {});
    }

    exportDataPools(): PairOfObject<DataPool> {
        return this._pools;
    }
}
