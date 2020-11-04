import OAuth1 from "./OAuth1";
import OAuth2 from "./OAuth2";
import { AuthInfoType } from "../Types/AuthInfoType";
import { AuthorizationUnitObject } from "../Service/ApiSet/AuthorizationUnitObject";
import { APIKeyType, TokenType } from "../Types/APIKeyType";
import { OAuthVersion } from "../Types/Authorization/OAuthVersion";
import { UnknownAuthorizationMethod } from "../../../Exceptions";
import { APIPayloadType } from "../Types/APIPayloadType";
import { CombinedParameterDataType } from "../Types/CombinedParameterDataType";
import { APISetObject } from "../Service/ApiSet/APISetObject";
import { Exportable } from "../../HelperType/Exportable";
import { APISet } from "../API/APISet";

export type AuthorizationDataObject = {
    token: string;
    tokenSecret?: string;
    refreshTokenObject?: RefreshTokenObject;
};

export type RefreshTokenObject = {
    refreshToken: string;
    tokenAcquisitionDate: number; // unix time
    tokenExpireDate: number; // unix time
};

export type AuthorizePaths = {
    requestAuthorizeTokenPath?: string;
    requestAuthorizePagePath: string; // required
    requestAccessTokenPath: string; // required
    requestTokenRefreshPath?: string;
};

export class Authorization implements Exportable<AuthorizationUnitObject> {
    private readonly _info: AuthInfoType;
    private readonly _scopeOriginal?: string[];
    private readonly _authorizePaths: AuthorizePaths;
    public auth: OAuth1 | OAuth2;

    constructor(source: AuthorizationUnitObject, optional: { apiKey: APIKeyType }) {
        this._info = {
            apiKey: optional.apiKey,
            oauthVersion: source.oauthVersion,
            authMethod: source.authMethod,
            signMethod: source.signMethod,
            signSpace: source.signSpace,
            scope: source.scope ? source.scope.reduce((p, c): string => p + " " + c, "") : undefined,
            callback: source.callback,
        };

        this._authorizePaths = {
            requestAuthorizeTokenPath: source.requestAccessTokenPath,
            requestAuthorizePagePath: source.requestAuthorizePagePath,
            requestAccessTokenPath: source.requestAccessTokenPath,
            requestTokenRefreshPath: source.requestTokenRefreshPath,
        };

        switch (this._info.oauthVersion) {
            case OAuthVersion.OAuth1:
                this.auth = new OAuth1();
                break;
            case OAuthVersion.OAuth2:
                this.auth = new OAuth2();
                break;
            default:
                throw UnknownAuthorizationMethod;
        }
    }

    get apiKey(): APIKeyType {
        return this._info.apiKey;
    }

    private getBaseUri(uri?: string) {
        const url = this._info.apiUrl ?? uri;
        if (!url) {
            throw new Error("undefined baseurl");
        }
        return url;
    }

    public getAuthorizationData(
        baseUri: string,
        api: APISetObject,
        token: TokenType,
        payload: APIPayloadType
    ): CombinedParameterDataType {
        return this.auth.getAuthorizationData(baseUri, api, this._info, token, payload);
    }

    public getAuthToken(api: APISet, baseUri?: string): CombinedParameterDataType | undefined {
        if (this.auth instanceof OAuth1) {
            return this.auth.requestAuthToken(this.getBaseUri(baseUri), api.export(), this._info);
        }
        return;
    }

    public getAuthorizeUri(api: APISet, baseUri?: string): string{
        return this.auth.authorizeUri(this.getBaseUri(baseUri), api, this._info, this._info.authMethod);
    }

    export(): AuthorizationUnitObject {
        return {
            apiUrl: this._info.apiUrl,
            oauthVersion: this._info.oauthVersion,
            authMethod: this._info.authMethod,
            signMethod: this._info.signMethod,
            signSpace: this._info.signSpace,
            scope: this._scopeOriginal,
            callback: this._info.callback,
            ...this._authorizePaths,
        };
    }
}
