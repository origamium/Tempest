import type { PairOfObject, UndefinedablePairOfObject } from "../../HelperType/PairOfObject";
import { Exportable } from "../../HelperType/Exportable";

export type DataPoolStruct = {
    accountKey: string;
    maxListLength: number; //default: 1000
    poolKey: string;
    content?: any;
};

export type DataPoolObject = UndefinedablePairOfObject<DataPoolStruct>;

export class DataPool implements Exportable<DataPoolStruct> {
    private _accountKey: string;
    private _poolKey: string;
    private _contents: any;
    private _maxListLength: number;

    constructor(source: DataPoolStruct, renew?: { content: any }) {
        this._accountKey = source.accountKey;
        this._maxListLength = source.maxListLength;
        this._poolKey = source.poolKey;

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
                        [curr!.poolKey + "," + curr!.accountKey]: curr!,
                    }),
                    {}
                );
        }
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

    public updateContent(key: string, data: any): DataPoolControl {
        console.log(key);
        console.log(data);
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
    }

    public getContent(key: string, account: string): any | undefined {
        return this._pools[key + "," + account]?.contents;
    }

    export(): DataPoolObject {
        return Object.entries(this._pools).reduce((accm, [, curr]) => ({ ...accm, [curr.poolKey]: curr.export() }), {});
    }
}
