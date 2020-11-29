import type { PairOfObject, UndefinedablePairOfObject } from "../../HelperType/PairOfObject";
import { Exportable } from "../../HelperType/Exportable";

export type ContentsStruct = {
    account: string;
    maxListLength: number; //default: 1000
    contentsKey: string;
    isList: boolean;
    content?: any;
};

export type DataPoolObject = UndefinedablePairOfObject<ContentsStruct>;

export class DataPool implements Exportable<ContentsStruct> {
    private _account: string;
    private _contentsKey: string;
    private _contents: any;
    private _isList: boolean;
    private _maxListLength: number;

    constructor(source: ContentsStruct, renew?: { content: any }) {
        this._account = source.account;
        this._maxListLength = source.maxListLength;
        this._contentsKey = source.contentsKey;
        this._isList = source.isList;
        if (source.content) {
            this._contents = source.content;
        }
    }

    get contentsKey() {
        return this._contentsKey;
    }

    get contents() {
        return this._contents;
    }

    public updateContent(update: { data: any | any[] }): DataPool {
        if (this._isList) {
            return new DataPool(this.export(), { content: [...this._contents, ...update.data] });
        } else {
            return new DataPool(this.export(), { content: update.data });
        }
    }

    public clearCache(): DataPool {
        return new DataPool(this.export());
    }

    public adjustCache(): DataPool {
        if (this._isList) {
            return new DataPool(this.export(), { content: this.contents.splice(0, this._maxListLength) });
        }
        return new DataPool(this.export(), { content: this.contents });
    }

    public renew(): DataPool {
        return new DataPool(this.export(), { content: this.contents });
    }

    export(): ContentsStruct {
        return {
            account: this._account,
            maxListLength: this._maxListLength,
            contentsKey: this._contentsKey,
            isList: this._isList,
        };
    }
}

export class DataPoolControl implements Exportable<DataPoolObject> {
    private contents: PairOfObject<DataPool>;

    constructor(source: DataPoolObject, exists?: PairOfObject<DataPool>) {
        if (exists) {
            this.contents = { ...exists };
        } else {
            this.contents = Object.entries(source)
                .filter(([, value]) => value)
                .reduce(
                    (accm, [, curr]) => ({
                        ...accm,
                        [curr!.contentsKey]: curr!,
                    }),
                    {}
                );
        }
    }

    public updateContent(key: string, content: any): DataPoolControl {
        return new DataPoolControl(
            {},
            Object.entries(this.contents).reduce(
                (accm, [currKey, currValue]) => ({
                    ...accm,
                    [currKey]: currKey === key ? currValue.updateContent({ content }) : currValue.renew(),
                }),
                {}
            )
        );
    }

    export(): DataPoolObject {
        return Object.entries(this.contents).reduce(
            (accm, [, curr]) => ({ ...accm, [curr.contentsKey]: curr.export() }),
            {}
        );
    }
}
