import { Exportable } from "../../HelperType/Exportable";

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

    export(): TabControlObject {
        return { tabs: this._tabs };
    }
}
