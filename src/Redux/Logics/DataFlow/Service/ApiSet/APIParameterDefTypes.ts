import { ApiParameterMethods } from "../../Types/ApiParameterMethods";
import { UndefinedablePairOfObject } from "../../../HelperType/PairOfObject";

export type APIParameterDefType = {
    required: boolean;
    type?: ApiParameterMethods;
    default?: string;
};

export type APIParameterDefTypes = UndefinedablePairOfObject<APIParameterDefType>;
