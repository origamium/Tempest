import { ApiParameterMethods } from "../../../../Enums/ApiParameterMethods";
import { PairOfObject } from "../../../../HelperType/PairOfObject";

export type ParameterDefinitionObject = {
    required: boolean;
    type: ApiParameterMethods;
};

export type ParameterDefinition = PairOfObject<ParameterDefinitionObject>;
