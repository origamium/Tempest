import oauth1a, { Header } from "oauth-1.0a";
import crypto from "crypto-js";
import OAuth, { optionObject } from "./OAuth";
import { AuthInfoType } from "../Types/AuthInfoType";
import { TokenType } from "../Types/APIKeyType";
import { APIPayloadType } from "../Types/APIPayloadType";
import { SignSpace } from "../Types/Authorization/SignSpace";
import { ApiParameterMethods } from "../Types/ApiParameterMethods";
import { UnknownOAuthSignatureSpace } from "../../../Exceptions";
import { CombinedParameterDataType } from "../Types/CombinedParameterDataType";
import { AuthorizeMethod } from "../Types/Authorization/AuthorizeMethod";
import { ApiUnitObject } from "../Service/ApiSet/ApiUnitObject";
import { APIParameterDefTypes } from "../Service/ApiSet/APIParameterDefTypes";
import { SignMethod } from "../Types/Authorization/SignMethod";

export default class OAuth1 implements OAuth {
    private static _signature(
        baseUri: string,
        authInfo: AuthInfoType,
        token: TokenType | undefined,
        apiData: ApiUnitObject,
        payload: APIPayloadType
    ): Header {
        const oauth = new oauth1a({
            consumer: {
                key: authInfo.apiKey.ApiKey,
                secret: authInfo.apiKey.ApiSecretKey ?? "",
            },
            signature_method: authInfo.signMethod,
            hash_function(base_string, key) {
                switch (authInfo.signMethod) {
                    case SignMethod.hmac:
                        return crypto
                            .HmacSHA1(
                                base_string,
                                `${encodeURIComponent(authInfo.apiKey.ApiSecretKey ?? "")}&${encodeURIComponent(
                                    token?.TokenSecret ?? ""
                                )}`
                            )
                            .toString(crypto.enc.Base64);
                    case SignMethod.plain:
                        console.warn("このサービス使うのやめちまえ");
                        return `${base_string}$`;
                    default:
                        return "";
                }
            },
        });

        // WARN: やばいかも
        return oauth.toHeader(
            oauth.authorize(
                {
                    url: `${baseUri}${apiData.path}`,
                    method: apiData.httpMethod,
                    data: payload,
                },
                token && {
                    key: token.Token,
                    secret: token.TokenSecret ?? "",
                }
            )
        );
    }

    // TODO: backup nonce and timestamp
    private static _authorization(
        baseUri: string,
        authInfo: AuthInfoType,
        token: TokenType | undefined,
        apiData: ApiUnitObject,
        payload: APIPayloadType
    ): CombinedParameterDataType {
        const oauth_data = OAuth1._signature(baseUri, authInfo, token, apiData, payload);

        switch (authInfo.signSpace) {
            case SignSpace.Header:
                return {
                    definition: {
                        Authorization: { required: true, type: ApiParameterMethods.Header },
                    },
                    payload: {
                        Authorization: oauth_data.Authorization,
                    },
                };

            case SignSpace.Query:
                // eslint-disable-next-line no-case-declarations
                const required = { required: true, type: ApiParameterMethods.Query };
                // eslint-disable-next-line no-case-declarations
                const definition = {
                    oauth_consumer_key: required,
                    oauth_token: { required: false, type: ApiParameterMethods.Query },
                    oauth_signature_method: required,
                    oauth_timestamp: required,
                    oauth_nonce: required,
                    oauth_version: required,
                    oauth_signature: required,
                };

                return {
                    definition: { ...definition, ...apiData.parameterDef },
                    payload: {
                        ...Object.entries(oauth_data).reduce(
                            (accm, [key, value]) => ({ ...accm, [key]: value.toString() }),
                            {}
                        ),
                        ...payload,
                    },
                };

            default:
                throw UnknownOAuthSignatureSpace;
        }
    }

    public requestAuthToken(
        baseUri: string,
        apiData: ApiUnitObject,
        authInfo: AuthInfoType
    ): CombinedParameterDataType {
        const template: APIParameterDefTypes = apiData.parameterDef;
        const value: APIPayloadType = {};

        const callbackKey = "oauth_callback";
        if (authInfo.callback) {
            value[callbackKey] = authInfo.callback;
        }

        const authorizationData = OAuth1._authorization(baseUri, authInfo, undefined, apiData, value);

        return {
            definition: { ...authorizationData.definition, ...template },
            payload: { ...authorizationData.payload, ...value },
        };
    }

    public authorizeUri(
        baseUri: string,
        apiData: ApiUnitObject,
        authInfo: AuthInfoType,
        method: AuthorizeMethod,
        optional?: optionObject
    ): { uri: string; method: AuthorizeMethod } {
        const uri: string = baseUri + apiData.path;
        const parameters: string[] = [];

        if (!optional?.authToken?.Token) {
            throw new Error("OAuth1 required optional.authToken.Token");
        }

        parameters.push(`oauth_token=${optional.authToken.Token}`);

        return {
            uri: uri + "?" + parameters.reduce((accm, curr) => accm + "&" + curr, ""),
            method,
        };
    }

    public requestToken(
        baseUri: string,
        apiData: ApiUnitObject,
        authInfo: AuthInfoType,
        verifier: string,
        option?: optionObject
    ): CombinedParameterDataType {
        const template: APIParameterDefTypes = apiData.parameterDef;
        const value: APIPayloadType = {
            oauth_verifier: verifier,
        };

        const authorizationData = OAuth1._authorization(baseUri, authInfo, undefined, apiData, value);

        return {
            definition: { ...authorizationData.definition, ...template },
            payload: { ...authorizationData.payload, ...value },
        };
    }

    // TODO: refreshToken

    public getAuthorizationData(
        baseUri: string,
        apiData: ApiUnitObject,
        authInfo: AuthInfoType,
        token: TokenType,
        payload: APIPayloadType
    ): CombinedParameterDataType {
        const authorizationData = OAuth1._authorization(baseUri, authInfo, token, apiData, payload);

        return {
            definition: { ...authorizationData.definition, ...apiData.parameterDef },
            payload: { ...authorizationData.payload, ...payload },
        };
    }
}
