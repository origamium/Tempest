import { TokenType } from "../Types/APIKeyType";
import { AuthInfoType } from "../Types/AuthInfoType";
import { CombinedParameterDataType } from "../Types/CombinedParameterDataType";
import { AuthorizeMethod } from "../Types/Authorization/AuthorizeMethod";
import { APIPayloadType } from "../Types/APIPayloadType";
import { ApiUnitObject } from "../Service/ApiSet/ApiUnitObject";

export type optionObject = {
    scope?: string[];
    authToken: TokenType;
};

export default interface IOAuth {
    // optional: step 0
    requestAuthToken?(
        baseUri: string,
        apiData: ApiUnitObject,
        authInfo: AuthInfoType
    ): CombinedParameterDataType & { requiredPayload?: object };

    // required: step 1. Generate Authorization url
    authorizeUri(
        baseUri: string,
        apiData: ApiUnitObject,
        authInfo: AuthInfoType,
        method: AuthorizeMethod,
        option?: optionObject
    ): { uri: string; method: AuthorizeMethod };

    // required: step 2
    // "verifier" is also known as "PIN"
    requestToken(
        baseUri: string,

        apiData: ApiUnitObject,
        authInfo: AuthInfoType,
        verifier: string,
        option?: optionObject
    ): CombinedParameterDataType;

    // optional: step 3
    refreshToken?(
        baseUri: string,
        apiData: ApiUnitObject,
        authInfo: AuthInfoType,
        token: TokenType
    ): CombinedParameterDataType;

    // required: autohorized data
    getAuthorizationData(
        baseUri: string,
        apiData: ApiUnitObject,
        authInfo: AuthInfoType,
        token: TokenType,
        payload: APIPayloadType
    ): CombinedParameterDataType;
}
