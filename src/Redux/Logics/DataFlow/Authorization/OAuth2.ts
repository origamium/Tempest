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
import { APISetObject } from "../Service/ApiSet/APISetObject";
import { APIParameterDefTypes } from "../Service/ApiSet/APIParameterDefTypes";
import { APISet } from "../API/APISet";

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
        verifier: string,
        option?: optionObject
    ): CombinedParameterDataType {
        const template: APIParameterDefTypes = apiData.parameterDef;
        if (!authInfo.apiKey.ApiSecretKey) {
            throw new Error("api secret key is undefined");
        }

        const value: APIPayloadType = {
            client_id: authInfo.apiKey.ApiKey,
            client_secret: authInfo.apiKey.ApiSecretKey,
            ...(authInfo.callback ? { redirect_uri: authInfo.callback } : {}),
            code: verifier,
        };

        return {
            definition: template,
            payload: value,
        };
    }

    // TODO: refreshToken

    public getAuthorizationData(
        baseUri: string,
        apiData: APISetObject,
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
