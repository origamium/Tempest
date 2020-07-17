import OAuth from "./OAuth";
import { AuthorizeMethod } from "../../Types/Authorization/AuthorizeMethod";
import { APIDataType } from "../../Types/APIDataType";
import { AuthInfoType } from "../../Types/AuthInfoType";
import { optionObject } from "./OAuth";
import { CombinedParameterDataType } from "../../Types/CombinedParameterDataType";
import { APIParameterDefType } from "../../Types/APIParameterDefType";
import { APIPayloadType } from "../../Types/APIPayloadType";
import { TokenType } from "../../Types/APIKeyType";
import { SignSpace } from "../../Types/Authorization/SignSpace";
import { ApiParameterMethods } from "../../Types/ApiParameterMethods";
import { UnknownOAuthSignatureSpace } from "../../../../Exceptions";

export default class OAuth2 implements OAuth {
    private static scopeToString(scope: string[]): string {
        return "scope=" + scope.reduce((accm, curr) => accm + "+" + curr, "");
    }

    public authorizeUri(
        apiData: APIDataType,
        authInfo: AuthInfoType,
        method: AuthorizeMethod,
        option?: optionObject
    ): { uri: string; method: AuthorizeMethod } {
        const uri = apiData.baseUri + apiData.path;
        const parameters: string[] = [];
        if (option?.scope) {
            parameters.push(OAuth2.scopeToString(option.scope));
        }

        return {
            uri: uri + "?" + encodeURIComponent(parameters.reduce((accm, curr) => accm + "&" + curr, "")),
            method,
        };
    }

    public requestToken(
        apiData: APIDataType,
        authInfo: AuthInfoType,
        verifier: string,
        option?: optionObject
    ): CombinedParameterDataType {
        const template: APIParameterDefType = apiData.parameter;
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
        apiData: APIDataType,
        authInfo: AuthInfoType,
        token: TokenType,
        payload:APIPayloadType
    ): CombinedParameterDataType {
        const template: APIParameterDefType = {};
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
