import { Exportable } from "../HelperType/Exportable";
import { MuteObject, MuteUserElementObject, MuteWordElementObject } from "../SavingData/StoredObject/UI/MuteObject";
import { MuteEnumType } from "../DataFlow/Enums/MuteEnumType";

export class MuteWord implements Exportable<MuteWordElementObject> {
    private _id: string;
    private _name: string;
    private _isRegex: boolean;
    private _inverse: boolean;
    private _muteWord: string;

    constructor({ id, name, muteWord, isRegex, inverse }: MuteWordElementObject) {
        this._id = id;
        this._name = name;
        this._muteWord = muteWord;
        this._isRegex = isRegex;
        this._inverse = inverse;
    }

    get id(): string {
        return this._id;
    }
    export(): MuteWordElementObject {
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

export class MuteUser implements Exportable<MuteUserElementObject> {
    private _id: string;
    private _name: string;
    private _inverse: boolean;
    private _targetId: string[];

    constructor({ id, name, inverse, targetId }: MuteUserElementObject) {
        this._id = id;
        this._name = name;
        this._inverse = inverse;
        this._targetId = targetId;
    }

    get id(): string {
        return this._id;
    }
    export(): MuteUserElementObject {
        return {
            type: MuteEnumType.user,
            id: this._id,
            name: this._name,
            inverse: this._inverse,
            targetId: this._targetId,
        };
    }
}

export class MuteControl implements Exportable<MuteObject> {
    private _mutes: {
        [key: string]: MuteWord | MuteUser;
    };

    public getMute(id: string): MuteWord | MuteUser | undefined {
        return this._mutes[id];
    }

    constructor(init: MuteObject) {
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
        return Object.entries(this._mutes).map((([v, body]) => body.id))
    }

    export(): MuteObject {
        return Object.entries(this._mutes).reduce(
            (accm, [, muteObject]) => ({ ...accm, [muteObject.id]: muteObject.export() }),
            {}
        );
    }
}
