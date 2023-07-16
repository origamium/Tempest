import { Exportable } from "../../HelperType/Exportable";
import { MuteEnumType } from "../Types/MuteEnumType";

export type MuteCommonObject = {
    type: MuteEnumType;
    id: string;
    name: string;
};

export type MuteWordControlObject = {
    type: MuteEnumType.word;
    isRegex: boolean;
    inverse: boolean;
    muteWord: string;
} & MuteCommonObject;

export type MuteUserControlObject = {
    type: MuteEnumType.user;
    inverse: boolean;
    targetId: string[];
} & MuteCommonObject;

export type MuteControlObject = {
    [id: string]: MuteWordControlObject | MuteUserControlObject;
};

export class MuteWord implements Exportable<MuteWordControlObject> {
    private _id: string;
    private _name: string;
    private _isRegex: boolean;
    private _inverse: boolean;
    private _muteWord: string;

    constructor({ id, name, muteWord, isRegex, inverse }: MuteWordControlObject) {
        this._id = id;
        this._name = name;
        this._muteWord = muteWord;
        this._isRegex = isRegex;
        this._inverse = inverse;
    }

    get id(): string {
        return this._id;
    }
    export(): MuteWordControlObject {
        return {
            type: MuteEnumType.word,
            id: this._id,
            name: this._name,
            isRegex: this._isRegex,
            inverse: this._inverse,
            muteWord: this._muteWord,
        };
    }
}

export class MuteUser implements Exportable<MuteUserControlObject> {
    private _id: string;
    private _name: string;
    private _inverse: boolean;
    private _targetId: string[];

    constructor({ id, name, inverse, targetId }: MuteUserControlObject) {
        this._id = id;
        this._name = name;
        this._inverse = inverse;
        this._targetId = targetId;
    }

    get id(): string {
        return this._id;
    }
    export(): MuteUserControlObject {
        return {
            type: MuteEnumType.user,
            id: this._id,
            name: this._name,
            inverse: this._inverse,
            targetId: this._targetId,
        };
    }
}

export class MuteControl implements Exportable<MuteControlObject> {
    private _mutes: {
        [key: string]: MuteWord | MuteUser;
    };

    public getMute(id: string): MuteWord | MuteUser | undefined {
        return this._mutes[id];
    }

    constructor(init: MuteControlObject) {
        this._mutes = Object.entries(init)
            .map(([, muteObject]) => {
                if (muteObject.type === MuteEnumType.word) {
                    return new MuteWord(muteObject);
                } else if (muteObject.type === MuteEnumType.user) {
                    return new MuteUser(muteObject);
                } else {
                    console.error(`can't initialized: JSON.stringify(muteObject)`);
                    return undefined;
                }
            })
            .filter(Boolean)
            .reduce((accm, curr) => ({ ...accm, [curr!.id]: curr }), {});
    }

    get idList(): string[] {
        return Object.entries(this._mutes).map(([v, body]) => body.id);
    }

    export(): MuteControlObject {
        return Object.entries(this._mutes).reduce(
            (accm, [, muteObject]) => ({ ...accm, [muteObject.id]: muteObject.export() }),
            {},
        );
    }
}
