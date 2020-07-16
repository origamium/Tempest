import { Exportable } from "../HelperType/Exportable";
import { ColumnControl } from "./ColumnControl";
import { TabObject } from "../SavingData/StoredObject/UI/TabObject";
import { ColumnObject } from "../SavingData/StoredObject/UI/ColumnObject";
import { MuteObject } from "../SavingData/StoredObject/UI/MuteObject";

export class TabControl implements Exportable<TabObject> {
    private _id: string;
    private _name: string;
    private _columns: ColumnControl[];

    constructor({ id, name, columnId }: TabObject, columns: ColumnObject[], mutes: MuteObject) {
        this._id = id;
        this._name = name;
        let filteredColumns = columnId.map((v) => columns.find((column) => column.id === v));
        if (filteredColumns.includes(undefined)) {
            console.error("filtered columns contaminated undefined.");
        }
        this._columns = (filteredColumns.filter(Boolean) as ColumnObject[]).map((v) => new ColumnControl(v, mutes));
    }

    set name(v: string) {
        this._name = v;
    }

    get name() {
        return this._name;
    }

    get columns() {
        return this._columns;
    }

    export(): TabObject {
        return {
            id: this._id,
            name: this._name,
            columnId: this._columns.map((v) => v.id()),
        };
    }
}
