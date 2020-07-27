import { Exportable } from "../../HelperType/Exportable";
import { ColumnControl, ColumnControlObject } from "./ColumnControl";
import { MuteControlObject } from "./MuteControl";

export type TabControlObject = {
    id: string;
    name: string;
    columnId: string[];
};

export class TabControl implements Exportable<TabControlObject> {
    private _id: string;
    private _name: string;
    private _columns: ColumnControl[];

    constructor({ id, name, columnId }: TabControlObject, columns: ColumnControlObject[], mutes: MuteControlObject) {
        this._id = id;
        this._name = name;
        let filteredColumns = columnId.map((v) => columns.find((column) => column.id === v));
        if (filteredColumns.includes(undefined)) {
            console.error("filtered columns contaminated undefined.");
        }
        this._columns = (filteredColumns.filter(Boolean) as ColumnControlObject[]).map((v) => new ColumnControl(v, mutes));
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

    export(): TabControlObject {
        return {
            id: this._id,
            name: this._name,
            columnId: this._columns.map((v) => v.id),
        };
    }
}
