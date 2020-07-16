import { Exportable } from "../HelperType/Exportable";
import { TabControl } from "./TabControl";
import { PageObject } from "../SavingData/StoredObject/UI/PageObject";
import { ColumnObject } from "../SavingData/StoredObject/UI/ColumnObject";

export class PageControl implements Exportable<PageObject> {
    private _tab: TabControl[];

    constructor({ tabs }: PageObject, columns: ColumnObject[]) {
        this._tab = tabs.map((v) => new TabControl(v, columns));
    }

    export(): PageObject {
        return {
            tabs: this._tab.map((v) => v.export()),
        };
    }
}
