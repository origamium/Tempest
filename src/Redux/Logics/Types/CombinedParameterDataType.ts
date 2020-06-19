import { APIParameterDefType } from "./APIParameterDefType";
import { APIPayloadType } from "./APIPayloadType";

export interface CombinedParameterDataType {
    definition: APIParameterDefType;
    payload: APIPayloadType;
}
