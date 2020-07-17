import OAuth1 from "./OAuth1";
import OAuth2 from "./OAuth2";
import { AuthInfoType } from "../Types/AuthInfoType";
import { AuthorizationUnitObject } from "../Service/ApiSet/AuthorizationUnitObject";
import { APIKeyType, TokenType } from "../Types/APIKeyType";
import { OAuthVersion } from "../Types/Authorization/OAuthVersion";
import { UnknownAuthorizationMethod } from "../../../Exceptions";
import { APIPayloadType } from "../Types/APIPayloadType";
import { CombinedParameterDataType } from "../Types/CombinedParameterDataType";
import { ApiUnitObject } from "../Service/ApiSet/ApiUnitObject";

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

export default class Authorization {
    private readonly info: AuthInfoType;
    public auth: OAuth1 | OAuth2;

    constructor(source: AuthorizationUnitObject, apiKey: APIKeyType) {
        this.info = {
            apiKey,
            oauthVersion: source.oauthVersion,
            authMethod: source.authMethod,
            signMethod: source.signMethod,
            signSpace: source.signSpace,
            scope: source.scope ? source.scope.reduce((p, c): string => p + " " + c, "") : undefined,
        };

        switch (this.info.oauthVersion) {
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

    public getAuthorizationData(
        baseUri: string,
        api: ApiUnitObject,
        token: TokenType,
        payload: APIPayloadType
    ): CombinedParameterDataType {
        return this.auth.getAuthorizationData(baseUri, api, this.info, token, payload);
    }
}
