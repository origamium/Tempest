import { Exportable, ExportableRoot } from "../HelperType/Exportable";
import { TabControl } from "./TabControl";
import { PageObject } from "../SavingData/StoredObject/UI/PageObject";

export class PageControl extends Exportable<PageObject> {
    private _tab: TabControl[];

    constructor() {
        super();
    }

    export(): PageObject {
        return {

        };
    }
}
