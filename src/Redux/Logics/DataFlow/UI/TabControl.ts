import { Exportable } from "../../HelperType/Exportable";
import arrayMove from "array-move";

export type TabControlObject = {
    tabs: TabObject[];
};

export type TabObject = {
    id: string;
    name: string;
    columns: string[];
};

export class TabControl implements Exportable<TabControlObject> {
    private _tabs: TabObject[];

    constructor(tabs: TabObject[]) {
        this._tabs = tabs;
    }

    public getTab(index: number) {
        return this._tabs[index];
    }

    public getIndex(id: string) {
        return this._tabs.findIndex((v) => v.id === id);
    }

    public moveTab(from: number, to: number) {
        return arrayMove(this._tabs, from, to);
    }

    export(): TabControlObject {
        return { tabs: this._tabs };
    }
}
