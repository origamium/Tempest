import { ApiParameterMethods } from "../../../../DataFlow/Types/ApiParameterMethods";
import { PairOfObject } from "../../../../HelperType/PairOfObject";

export type ParameterDefinitionObject = {
    required: boolean;
    type: ApiParameterMethods;
};

export type ParameterDefinitionsObject = PairOfObject<ParameterDefinitionObject>;
