import RESTElement from "./RESTElement";
import { PairOfObject } from "../../../HelperType/PairOfObject";
import { APISetObject } from "../../Service/ApiSet/ApiUnitObject";

export default class REST {
    private readonly _apis: PairOfObject<RESTElement>;

    constructor(source: APISetObject) {
        this._apis = {};
        Object.keys(source).forEach((key) => {
            this._apis[key] = new RESTElement(source[key]!);
        });
    }
}
