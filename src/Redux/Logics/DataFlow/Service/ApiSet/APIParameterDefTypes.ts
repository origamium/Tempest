import { ApiParameterMethods } from "../../Types/ApiParameterMethods";
import { PairOfObject } from "../../../HelperType/PairOfObject";

export type APIParameterDefType = {
    required: boolean;
    type: ApiParameterMethods;
};

export type APIParameterDefTypes = PairOfObject<APIParameterDefType>;
