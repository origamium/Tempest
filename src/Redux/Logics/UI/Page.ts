import { Exportable } from "../HelperType/Exportable";
import { Tab } from "./Tab";

export class Page extends Exportable{
    private tab: Tab[];

    constructor() {
        super();
    }

    export(): string {
        return "";
    }
}
