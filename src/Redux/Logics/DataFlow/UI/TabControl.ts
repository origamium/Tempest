import { Exportable } from "../../HelperType/Exportable";
import arrayMove from "array-move";
import { nanoid } from "nanoid";
import { removeArrayItem } from "../../../../Utility/removeArrayItem";

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

    constructor(tabObject: TabControlObject) {
        this._tabs = tabObject.tabs;
    }

    get tabArray(): TabObject[] {
        return this._tabs;
    }

    get tabKeys(): string[] {
        return this._tabs.map((v) => v.id);
    }

    get tabLength(): number {
        return this._tabs.length;
    }

    public getTabById(id: string): TabObject | undefined {
        return this._tabs.find((v) => v.id === id);
    }

    public getTabByIndex(index: number): TabObject {
        return this._tabs[index];
    }

    public getIndex(id: string): number {
        return this._tabs.findIndex((v) => v.id === id);
    }

    public moveTab(from: number, to: number): TabControl {
        return new TabControl({ tabs: arrayMove<TabObject>(this._tabs, from, to) });
    }

    public appendTab(name: string, column?: string[]): TabControl {
        return new TabControl({ tabs: [...this._tabs, { id: nanoid(), name, columns: column ?? [] }] });
    }

    public deleteTab(index: number): TabControl {
        return new TabControl({ tabs: removeArrayItem(this._tabs, index) });
    }

    export(): TabControlObject {
        return { tabs: this._tabs };
    }
}
