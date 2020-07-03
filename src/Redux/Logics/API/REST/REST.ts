import RESTElement from "./RESTElement";
import { PairOfObject } from "../../HelperType/PairOfObject";
import { Apis } from "../../Types/StoredObject/Service/ApiSet/ApiUnitObject";

export default class REST {
    private readonly _apis: PairOfObject<RESTElement>;

    constructor(source: Apis) {
        this._apis = {};
        Object.keys(source).forEach((key) => {
            this._apis[key] = new RESTElement(source[key]!);
        });
    }
}
