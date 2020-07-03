import { TokenType } from "../../APIType/APIKeyType";
import { APIDataType } from "../../APIType/APIDataType";
import { AuthInfoType } from "../../APIType/AuthInfoType";
import { CombinedParameterDataType } from "../../APIType/CombinedParameterDataType";
import { AuthorizeMethod } from "../../Enums/Authorization/AuthorizeMethod";
import { APIPayloadType } from "../../APIType/APIPayloadType";

export type optionObject = {
    scope?: string[];
    authToken: TokenType;
};

export default interface IOAuth {
    // optional: step 0
    requestAuthToken?(
        apiData: APIDataType,
        authInfo: AuthInfoType
    ): CombinedParameterDataType & { requiredPayload?: object };

    // required: step 1. Generate Authorization url
    authorizeUri(
        apiData: APIDataType,
        authInfo: AuthInfoType,
        method: AuthorizeMethod,
        option?: optionObject
    ): { uri: string; method: AuthorizeMethod };

    // required: step 2
    // "verifier" is also known as "PIN"
    requestToken(
        apiData: APIDataType,
        authInfo: AuthInfoType,
        verifier: string,
        option?: optionObject
    ): CombinedParameterDataType;

    // optional: step 3
    refreshToken?(apiData: APIDataType, authInfo: AuthInfoType, token: TokenType): CombinedParameterDataType;

    // required: autohorized data
    getAuthorizationData(
        apiData: APIDataType,
        authInfo: AuthInfoType,
        token: TokenType,
        payload: APIPayloadType
    ): CombinedParameterDataType;
}
