// @ts-ignore
import * as authSign from "oauth-sign";
import OAuth from "./OAuth";
import { AuthInfoType } from "../../Types/AuthInfoType";
import { TokenType } from "../../Types/APIKeyType";
import { APIDataType } from "../../Types/APIDataType";
import { APIPayloadType } from "../../Types/APIPayloadType";
import { SignSpace } from "../../Types/Authorization/SignSpace";
import { ApiParameterMethods } from "../../Types/ApiParameterMethods";
import { UnknownOAuthSignatureSpace } from "../../../../Exceptions";
import { CombinedParameterDataType } from "../../Types/CombinedParameterDataType";
import { APIParameterDefType } from "../../Types/APIParameterDefType";
import { AuthorizeMethod } from "../../Types/Authorization/AuthorizeMethod";

export default class OAuth1 implements OAuth {
    private static readonly nonce: string = "superdry";

    private static _now(): string {
        return Math.round(+new Date() / 1000).toString();
    }

    private static _signature(
        authInfo: AuthInfoType,
        token: TokenType | undefined,
        apiData: APIDataType,
        payload: APIPayloadType,
        timestamp: string
    ): string {
        const signParameter = {
            oauth_consumer_key: authInfo.apiKey.ApiKey,
            oauth_token: token ? token.Token : "",
            oauth_signature_method: authInfo.signMethod,
            oauth_timestamp: timestamp,
            oauth_nonce: OAuth1.nonce,
            oauth_version: authInfo.oauthVersion,
        };
        return authSign.sign(
            authInfo.signMethod,
            apiData.method,
            apiData.baseUri + apiData.path,
            { ...signParameter, ...payload },
            authInfo.apiKey.ApiSecretKey,
            token ? token.TokenSecret : ""
        );
    }

    private static _authorization(
        authInfo: AuthInfoType,
        token: TokenType | undefined,
        apiData: APIDataType,
        payload: APIPayloadType
    ): CombinedParameterDataType {
        const timestamp = OAuth1._now();

        const authSeed = {
            oauth_consumer_key: authInfo.apiKey.ApiKey,
            oauth_signature_method: authInfo.signMethod,
            oauth_timestamp: timestamp,
            oauth_nonce: OAuth1.nonce,
            oauth_version: authInfo.oauthVersion,
            ...(token ? { oauth_token: token.Token } : {}),
        };

        const oauth_signature = OAuth1._signature(authInfo, token, apiData, payload, timestamp);

        switch (authInfo.signSpace) {
            case SignSpace.Header:
                return {
                    definition: {
                        Authorization: { required: true, type: ApiParameterMethods.Header },
                    },
                    payload: {
                        Authorization:
                            `OAuth oauth_consumer_key="${authSeed.oauth_consumer_key}",` +
                            (token ? `oauth_token="${token.Token},` : ``) +
                            `oauth_signature_method="${authSeed.oauth_signature_method}",` +
                            `oauth_timestamp="${authSeed.oauth_timestamp}",` +
                            `oauth_nonce="${authSeed.oauth_nonce}",` +
                            `oauth_version="${authSeed.oauth_version}",` +
                            `oauth_signature="${encodeURIComponent(oauth_signature)}"`,
                    },
                };

            case SignSpace.Query:
                const required = { required: true, type: ApiParameterMethods.Query };
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
                    definition: { ...definition, ...apiData.parameter },
                    payload: { ...authSeed, ...payload, ...{ oauth_signature } },
                };

            default:
                throw UnknownOAuthSignatureSpace;
        }
    }

    public requestAuthToken(
        apiData: APIDataType,
        authInfo: AuthInfoType
    ): CombinedParameterDataType & { requiredPayload?: object } {
        const template: APIParameterDefType = apiData.parameter;
        const value: APIPayloadType = {};

        const callbackKey = "oauth_callback";
        if (authInfo.callback) {
            value[callbackKey] = authInfo.callback;
        }

        const authorizationData = OAuth1._authorization(authInfo, undefined, apiData, value);

        return {
            definition: { ...authorizationData.definition, ...template },
            payload: { ...authorizationData.payload, ...value },
        };
    }

    public authorizeUri(
        apiData: APIDataType,
        authInfo: AuthInfoType,
        method: AuthorizeMethod,
        optional?: { scope?: string[]; authToken?: TokenType }
    ): { uri: string; method: AuthorizeMethod } {
        const uri: string = apiData.baseUri + apiData.path;
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
        apiData: APIDataType,
        authInfo: AuthInfoType,
        verifier: string,
        optional?: { scope?: string[]; authToken?: TokenType }
    ): CombinedParameterDataType {
        const template: APIParameterDefType = apiData.parameter;
        const value: APIPayloadType = {
            oauth_verifier: verifier,
        };

        const authorizationData = OAuth1._authorization(authInfo, undefined, apiData, value);

        return {
            definition: { ...authorizationData.definition, ...template },
            payload: { ...authorizationData.payload, ...value },
        };
    }

    // TODO: refreshToken

    public getAuthorizationData(
        apiData: APIDataType,
        authInfo: AuthInfoType,
        token: TokenType,
        payload: APIPayloadType
    ): CombinedParameterDataType {
        const authorizationData = OAuth1._authorization(authInfo, token, apiData, payload);

        return {
            definition: { ...authorizationData.definition, ...apiData.parameter },
            payload: { ...authorizationData.payload, ...payload },
        };
    }
}
