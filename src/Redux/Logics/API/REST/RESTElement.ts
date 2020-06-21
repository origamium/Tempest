import { HttpMethods } from "../../Enums/HttpMethods";
import { APIParameterDefType } from "../../Types/API/APIParameterDefType";
import { RestApiUnitObject } from "../../Types/StoredObject/Service/ApiSet/RestApiUnitObject";

export default class RESTElement {
    private readonly _path: string;
    private readonly _HttpMethod: HttpMethods;
    private readonly _paramDefinition: APIParameterDefType;
    private readonly _returnDataKey: string | string[];
    private readonly _errorKey?: string; // extend error check.

    constructor(source: RestApiUnitObject) {
        this._path = source.path;
        this._HttpMethod = source.httpMethod;
        this._paramDefinition = source.parameterDefinition;
        this._returnDataKey = source.returnedDataKey;
        this._errorKey = source.errorKey;
    }
}
