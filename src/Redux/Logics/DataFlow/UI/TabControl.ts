import { Exportable } from "../../HelperType/Exportable";
import arrayMove from "array-move";
import { nanoid } from "nanoid";
import { removeArrayItem } from "../../../../Utility/removeArrayItem";

export type TabControlObject = {
    tabs: TabObject[];
    selected: number;
};

export type TabObject = {
    id: string;
    name: string;
    columns: string[];
};

export class TabControl implements Exportable<TabControlObject> {
    private _tabs: TabObject[];
    private _selected: number;

    constructor(tabObject: TabControlObject) {
        this._tabs = tabObject.tabs;
        this._selected = tabObject.selected;
    }

    get selected(): number {
        return this._selected;
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

    public getIndexById(id: string): number {
        return this._tabs.findIndex((v) => v.id === id);
    }

    public setIndex(i: number): TabControl {
        return new TabControl({ ...this.export(), selected: i });
    }

    public moveTab(from: number, to: number): TabControl {
        return new TabControl({ ...this.export(), tabs: arrayMove<TabObject>(this._tabs, from, to) });
    }

    public appendTab(name: string, column?: string[]): TabControl {
        return new TabControl({
            ...this.export(),
            tabs: [...this._tabs, { id: nanoid(), name, columns: column ?? [] }],
        });
    }

    public deleteTab(index: number): TabControl {
        return new TabControl({ ...this.export(), tabs: removeArrayItem(this._tabs, index) });
    }

    export(): TabControlObject {
        return { tabs: this._tabs, selected: this._selected };
    }
}
