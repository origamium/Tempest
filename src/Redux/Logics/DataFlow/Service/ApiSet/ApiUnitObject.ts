import { APIParameterDefTypes } from "./APIParameterDefTypes";
import { HttpMethods } from "../../Types/HttpMethods";
import { UndefinedablePairOfObject } from "../../../HelperType/PairOfObject";
import { Protocol } from "../../Types/Protocol";

export type ApiUnitObject = {
    path: string;
    protocol: Protocol;
    httpMethod: HttpMethods;
    parameterDef: APIParameterDefTypes;
    returnedDataKey: string; // related SchemaObject.
    errorKey?: string; // use SchemaObject
};

export type APIUnitsObject = UndefinedablePairOfObject<ApiUnitObject>;
