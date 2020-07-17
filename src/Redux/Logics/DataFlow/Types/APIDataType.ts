import { HttpMethods } from "./HttpMethods";
import { APIParameterDefType } from "./APIParameterDefType";
import { ReturnedDatumInfoType } from "./ReturnedDatumInfoType";
import { Protocol } from "./Protocol";

export interface APIDataType {
    baseUri: string;
    path: string;
    protocol: Protocol;
    parameter: APIParameterDefType;
    method?: HttpMethods;
    return?: ReturnedDatumInfoType;
}
