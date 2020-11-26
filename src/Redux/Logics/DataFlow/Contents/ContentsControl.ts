import type { PairOfObject, UndefinedablePairOfObject } from "../../HelperType/PairOfObject";
import { Exportable } from "../../HelperType/Exportable";

export type ContentsStruct = {
    account: string;
    maxListLength: number; //default: 1000
    contentsKey: string;
    isList: boolean;
    content?: any;
};

export type ContentsControlObject = UndefinedablePairOfObject<ContentsStruct>;

export class Contents implements Exportable<ContentsStruct> {
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

    public updateContent(update: { content: any | any[] }): Contents {
        if (this._isList) {
            return new Contents(this.export(), { content: [...this._contents, ...update.content] });
        } else {
            return new Contents(this.export(), { content: update.content });
        }
    }

    public renew(): Contents {
        return new Contents(this.export(), { content: this.contents });
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

export class ContentsControl implements Exportable<ContentsControlObject> {
    private contents: PairOfObject<Contents>;

    constructor(source: ContentsControlObject, exists?: PairOfObject<Contents>) {
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

    public updateContent(key: string, content: any): ContentsControl {
        return new ContentsControl(
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

    export(): ContentsControlObject {
        return Object.entries(this.contents).reduce(
            (accm, [, curr]) => ({ ...accm, [curr.contentsKey]: curr.export() }),
            {}
        );
    }
}
