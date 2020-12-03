import { APIParameterDefTypes } from "./APIParameterDefTypes";
import { HttpMethods } from "../../Types/HttpMethods";
import { UndefinedablePairOfObject } from "../../../HelperType/PairOfObject";
import { Protocol } from "../../Types/Protocol";

export type APISetObject = {
    path: string;
    protocol: Protocol;
    httpMethod: HttpMethods;
    parameterDef?: APIParameterDefTypes;
    open?: boolean;
    returnedDataKey?: string; // related SchemaObject.
    sourceKey?: string;
    errorKey?: string; // use SchemaObject
};

export type APISetsObject = UndefinedablePairOfObject<APISetObject>;
