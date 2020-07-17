import { ParameterDefinitionsObject } from "./ParameterDefinitionsObject";
import { HttpMethods } from "../../../../DataFlow/Types/HttpMethods";
import { PairOfObject } from "../../../../HelperType/PairOfObject";
import { Protocol } from "../../../../DataFlow/Types/Protocol";

export type ApiUnitObject = {
    path: string;
    protocol: Protocol;
    httpMethod: HttpMethods;
    parameterDefinition: ParameterDefinitionsObject;
    returnedDataKey: string; // related SchemaObject.
    errorKey?: string; // use SchemaObject
};

export type Apis = PairOfObject<ApiUnitObject>;
