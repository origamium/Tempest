import { HttpMethods } from "../../Enums/HttpMethods";
import { APIParameterDefType } from "./APIParameterDefType";
import { ReturnedDatumInfoType } from "./ReturnedDatumInfoType";

export interface APIDataType {
    baseUri: string;
    path: string;
    parameter: APIParameterDefType;
    method: HttpMethods;
    return?: ReturnedDatumInfoType;
}
