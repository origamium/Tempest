import { APIPayloadType } from "./APIPayloadType";
import { APIParameterDefTypes } from "../Service/ApiSet/APIParameterDefTypes";

export interface CombinedParameterDataType {
    definition: APIParameterDefTypes;
    payload: APIPayloadType;
}
