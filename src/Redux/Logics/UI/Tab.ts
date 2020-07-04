import { Exportable } from "../HelperType/Exportable";
import { Column } from "./Column/Column";

export class Tab implements Exportable {
    private _columns: Column[];

    constructor() {
        this._columns = [];
    }

    get columns() {
        return this._columns;
    }

    export(): string {
        return "";
    }
}
