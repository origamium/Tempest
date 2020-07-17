import { HttpMethods } from "../../Types/HttpMethods";
import { APIParameterDefType } from "../../Types/APIParameterDefType";
import { ApiUnitObject } from "../../../SavingData/StoredObject/Service/ApiSet/ApiUnitObject";

export default class RESTElement {
    private readonly _path: string;
    private readonly _HttpMethod: HttpMethods;
    private readonly _paramDefinition: APIParameterDefType;
    private readonly _returnDataKey: string | string[];
    private readonly _errorKey?: string; // extend error check.

    constructor(source: ApiUnitObject) {
        this._path = source.path;
        this._HttpMethod = source.httpMethod;
        this._paramDefinition = source.parameterDefinition;
        this._returnDataKey = source.returnedDataKey;
        this._errorKey = source.errorKey;
    }
}
