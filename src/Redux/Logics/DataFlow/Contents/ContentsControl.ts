import type { PairOfObject, UndefinedablePairOfObject } from "../../HelperType/PairOfObject";
import { Exportable } from "../../HelperType/Exportable";

export type ContentsStruct = {
    account: string;
    maxListLength: number; //default: 1000
    contentsKey: string;
};

export type ContentsControlObject = UndefinedablePairOfObject<ContentsStruct>;

export class Contents implements Exportable<ContentsStruct> {
    private _account: string;
    private _contentsKey: string;
    private _contents: unknown[];
    private _maxListLength: number;

    constructor(source: ContentsStruct, contentList?: { content: unknown[] }) {
        this._account = source.account;
        this._maxListLength = source.maxListLength;
        this._contentsKey = source.contentsKey;
        if (contentList) {
            this._contents = contentList.content;
        } else {
            this._contents = [];
        }
    }

    get contentsKey() {
        return this._contentsKey;
    }

    get contents() {
        return this._contents;
    }

    public updateContent(update: { content: unknown[] }): Contents {
        return new Contents(this.export(), { content: [...this._contents, ...update.content] });
    }

    export(): ContentsStruct {
        return {
            account: this._account,
            maxListLength: this._maxListLength,
            contentsKey: this._contentsKey,
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
                        [curr!.contentsKey]: new Contents(curr!),
                    }),
                    {}
                );
        }
    }

    export(): ContentsControlObject {
        return Object.entries(this.contents).reduce(
            (accm, [, curr]) => ({ ...accm, [curr.contentsKey]: curr.export() }),
            {}
        );
    }
}
