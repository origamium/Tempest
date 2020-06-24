import { AuthorizationUnitObject } from "./AuthorizationUnitObject";
import { APIDataType } from "../../../API/APIDataType";

export type ApiSetObject = {
    authorization: AuthorizationUnitObject;
    apidata: APIDataType;
};
