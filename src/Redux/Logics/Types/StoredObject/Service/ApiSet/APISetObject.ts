import { AuthorizationUnitObject } from "./AuthorizationUnitObject";
import { Apis } from "./ApiUnitObject";

export type APISetObject = {
    authorization: AuthorizationUnitObject;
    apis: Apis;
};
