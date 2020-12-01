import { Exportable } from "../../HelperType/Exportable";
import { MuteControl, MuteControlObject } from "./MuteControl";

export type ColumnControlObject = {
    id: string;
    accountId: string[];
    muteId: string[];
    collapsed: boolean;
    contentCollapse: number;
};

export class ColumnControl implements Exportable<ColumnControlObject> {
    private _id: string;
    private _accountId: string[];
    private _mute: MuteControl;
    private _collapsed: boolean;
    private _contentCollapse: number; // 0: not collapse. 1,2,3...: line-clamp and other datapool collapsing

    constructor({ id, accountId, muteId, collapsed, contentCollapse }: ColumnControlObject, mutes: MuteControlObject) {
        const muteInstances = muteId.map((v) => mutes[v]);
        // エラー処理あとで書いて
        this._id = id;
        this._accountId = accountId;
        this._mute = new MuteControl(
            muteInstances.filter(Boolean).reduce((accm, curr) => ({ ...accm, [curr.id]: curr }), {})
        );
        this._collapsed = collapsed;
        this._contentCollapse = contentCollapse;
    }
    get accountId() {
        return this._accountId;
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
            accountId: this._accountId,
            muteId: this._mute.idList,
            collapsed: this._collapsed,
            contentCollapse: this._contentCollapse,
        };
    }
}
