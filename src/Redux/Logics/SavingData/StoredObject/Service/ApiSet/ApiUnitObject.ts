import { ParameterDefinitionsObject } from "./ParameterDefinitionsObject";
import { HttpMethods } from "../../../../DataFlow/Enums/HttpMethods";
import { PairOfObject } from "../../../../HelperType/PairOfObject";
import { Protocol } from "../../../../DataFlow/Enums/Protocol";

export type ApiUnitObject = {
    path: string;
    protocol: Protocol;
    httpMethod: HttpMethods;
    parameterDefinition: ParameterDefinitionsObject;
    returnedDataKey: string; // related SchemaObject.
    errorKey?: string; // use SchemaObject
};

export type Apis = PairOfObject<ApiUnitObject>;
