import { Exportable } from "../../HelperType/Exportable";
import { TabControl, TabControlObject } from "./TabControl";
import { ColumnControlObject } from "./ColumnControl";
import { MuteControlObject } from "./MuteControl";

export type PageControlObject = {
    tabs: TabControlObject[];
};

export class PageControl implements Exportable<PageControlObject> {
    private _tab: TabControl[];

    constructor({ tabs }: PageControlObject, columns: ColumnControlObject[], mutes: MuteControlObject) {
        this._tab = tabs.map((v) => new TabControl(v, columns, mutes));
    }

    export(): PageControlObject {
        return {
            tabs: this._tab.map((v) => v.export()),
        };
    }
}
