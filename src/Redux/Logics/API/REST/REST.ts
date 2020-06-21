import RESTElement from "./RESTElement";
import { PairOfObject } from "../../HelperType/PairOfObject";
import { RestApiUnits } from "../../Types/StoredObject/Service/ApiSet/RestApiUnitObject";

export default class REST {
    private readonly _apis: PairOfObject<RESTElement>;

    constructor(source: RestApiUnits) {
        this._apis = {};
        Object.keys(source).forEach((key) => {
            this._apis[key] = new RESTElement(source[key]);
        });
    }
}
