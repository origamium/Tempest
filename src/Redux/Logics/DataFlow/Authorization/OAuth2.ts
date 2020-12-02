import OAuth from "./OAuth";
import { AuthorizeMethod } from "../Types/Authorization/AuthorizeMethod";
import { AuthInfoType } from "../Types/AuthInfoType";
import { optionObject } from "./OAuth";
import { CombinedParameterDataType } from "../Types/CombinedParameterDataType";
import { APIPayloadType } from "../Types/APIPayloadType";
import { TokenType } from "../Types/APIKeyType";
import { SignSpace } from "../Types/Authorization/SignSpace";
import { ApiParameterMethods } from "../Types/ApiParameterMethods";
import { UnknownOAuthSignatureSpace } from "../../../Exceptions";
import { APIParameterDefTypes } from "../Service/ApiSet/APIParameterDefTypes";
import { APISet } from "../API/APISet";
import { AuthorizePaths } from "./Authorization";

export default class OAuth2 implements OAuth {
    public authorizeUri(
        baseUri: string,
        apiData: APISet,
        authInfo: AuthInfoType,
        method: AuthorizeMethod,
        option?: optionObject
    ): string {
        return apiData.createRequest(baseUri, {
            client_id: authInfo.apiKey.ApiKey,
            redirect_uri: authInfo.callback,
        })[0] as string;
    }

    public requestToken(
        baseUri: string,
        apiData: APISet,
        authInfo: AuthInfoType,
        lambda: AuthorizePaths,
        verifier: string,
        provider?: string,
        option?: optionObject
    ): [RequestInfo, RequestInit, boolean] {
        const value: APIPayloadType = {
            client_id: authInfo.apiKey.ApiKey,
            ...(authInfo.callback ? { redirect_uri: authInfo.callback } : {}),
            ...(provider ? { provider } : {}),
            code: verifier,
        };

        if (!lambda.requestAuthorizeTokenLambda && !authInfo.apiKey.ApiSecretKey) {
            throw new Error("api secret key is undefined");
        }

        return apiData.createRequest(baseUri, value);
    }

    // TODO: refreshToken

    public getAuthorizationData(
        baseUri: string,
        apiData: APISet,
        authInfo: AuthInfoType,
        token: TokenType,
        payload: APIPayloadType
    ): CombinedParameterDataType {
        const template: APIParameterDefTypes = {};
        const value: APIPayloadType = {};
        let key: string = "";
        if (token) {
            switch (authInfo.signSpace) {
                case SignSpace.Header:
                    key = "Authorization";
                    template[key] = { required: true, type: ApiParameterMethods.Header };
                    value[key] = "Bearer " + token.Token;
                    break;
                case SignSpace.Query:
                    key = "access_token";
                    template[key] = { required: true, type: ApiParameterMethods.Query };
                    value[key] = token.Token;
                    break;
                default:
                    throw UnknownOAuthSignatureSpace;
            }
        }

        return {
            definition: template,
            payload: value,
        };
    }
}
