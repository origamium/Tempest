import { Exportable } from "../../HelperType/Exportable";
import { TabControl, TabObject } from "./TabControl";
import { ColumnObject } from "./ColumnControl";
import { MuteObject } from "./MuteControl";

export type PageObject = {
    tabs: TabObject[];
};

export class PageControl implements Exportable<PageObject> {
    private _tab: TabControl[];

    constructor({ tabs }: PageObject, columns: ColumnObject[], mutes: MuteObject) {
        this._tab = tabs.map((v) => new TabControl(v, columns, mutes));
    }

    export(): PageObject {
        return {
            tabs: this._tab.map((v) => v.export()),
        };
    }
}
