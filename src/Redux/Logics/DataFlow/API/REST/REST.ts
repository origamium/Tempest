import RESTElement from "./RESTElement";
import { UndefinedablePairOfObject } from "../../../HelperType/PairOfObject";
import { APIUnitsObject } from "../../Service/ApiSet/ApiUnitObject";

export default class REST {
    private readonly _apis: UndefinedablePairOfObject<RESTElement>;

    constructor(source: APIUnitsObject) {
        this._apis = {};
        Object.keys(source).forEach((key) => {
            this._apis[key] = new RESTElement(source[key]!);
        });
    }
}
