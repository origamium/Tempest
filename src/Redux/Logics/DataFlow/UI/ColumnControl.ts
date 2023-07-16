import { Exportable } from "../../HelperType/Exportable";
import { MuteControl, MuteControlObject } from "./MuteControl";
import { ColumnSourceElement } from "../../../Slices/dataStore/column";

export type ColumnControlObject = {
    id: string;
    name: string;
    accountId: string[];
    muteId: string[];
    sourceElement: ColumnSourceElement[];
    collapsed: boolean;
    contentCollapse: number;
};

export class ColumnControl implements Exportable<ColumnControlObject> {
    private _id: string;
    private _name: string;
    private _accountId: string[];
    private _sourceElement: ColumnSourceElement[];
    private _mute: MuteControl;
    private _collapsed: boolean;
    private _contentCollapse: number; // 0: not collapse. 1,2,3...: line-clamp and other datapool collapsing

    constructor(
        { id, name, accountId, sourceElement, muteId, collapsed, contentCollapse }: ColumnControlObject,
        mutes: MuteControlObject,
    ) {
        const muteInstances = muteId.map((v) => mutes[v]);
        // エラー処理あとで書いて
        this._id = id;
        this._name = name;
        this._accountId = accountId;
        this._sourceElement = sourceElement;
        this._mute = new MuteControl(
            muteInstances.filter(Boolean).reduce((accm, curr) => ({ ...accm, [curr.id]: curr }), {}),
        );
        this._collapsed = collapsed;
        this._contentCollapse = contentCollapse;
    }

    get name() {
        return this._name;
    }

    get accountId() {
        return this._accountId;
    }

    get sourceElement() {
        return this._sourceElement;
    }

    get mute() {
        return this._mute;
    }

    get id() {
        return this._id;
    }

    export(): ColumnControlObject {
        return {
            id: this._id,
            name: this._name,
            accountId: this._accountId,
            sourceElement: this._sourceElement,
            muteId: this._mute.idList,
            collapsed: this._collapsed,
            contentCollapse: this._contentCollapse,
        };
    }
}
