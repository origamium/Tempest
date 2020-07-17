import { APIParameterDefTypes } from "./APIParameterDefTypes";
import { HttpMethods } from "../../Types/HttpMethods";
import { PairOfObject } from "../../../HelperType/PairOfObject";
import { Protocol } from "../../Types/Protocol";

export type ApiUnitObject = {
    path: string;
    protocol: Protocol;
    httpMethod: HttpMethods;
    parameterDef: APIParameterDefTypes;
    returnedDataKey: string; // related SchemaObject.
    errorKey?: string; // use SchemaObject
};

export type APISetObject = PairOfObject<ApiUnitObject>;
