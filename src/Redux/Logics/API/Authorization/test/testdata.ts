import { APIKeyType, TokenType } from "../../../Types/API/APIKeyType";
import { APIDataType } from "../../../Types/API/APIDataType";
import { HttpMethods } from "../../../Enums/HttpMethods";
import { APIParameterDefType } from "../../../Types/API/APIParameterDefType";
import { ApiParameterMethods } from "../../../Enums/ApiParameterMethods";
import { PairOfObject } from "../../../HelperType/PairOfObject";
import { AuthorizationUnitObject } from "../../../Types/StoredObject/Service/ApiSet/AuthorizationUnitObject";
import { OAuthVersion } from "../../../Enums/Authorization/OAuthVersion";
import { AuthorizeMethod } from "../../../Enums/Authorization/AuthorizeMethod";
import { SignMethod } from "../../../Enums/Authorization/SignMethod";
import { SignSpace } from "../../../Enums/Authorization/SignSpace";

export const DummyApiKey: APIKeyType = {
    ApiKey: "qwerty",
    ApiSecretKey: "ywmg",
};

export const DummyToken: TokenType = {
    Token: "foooooooooo",
};

export const DummyTokenHasSecretToken: TokenType = {
    Token: "ippon_manzoku_bar",
    TokenSecret: "kusanagi_tsuyoshi",
};

export const blank: APIDataType = {
    baseUri: "https://example.com",
    path: "/path/to",
    parameter: {},
    method: HttpMethods.GET,
};

export const test1_blank_param: APIParameterDefType = {
    Authorization: {
        required: true,
        type: ApiParameterMethods.Header,
    },
};

export const oauth1data: PairOfObject<AuthorizationUnitObject> = {
    pin_hmac_header: {
        oauthVersion: OAuthVersion.OAuth1,
        authMethod: AuthorizeMethod.PIN,
        signMethod: SignMethod.hmac,
        signSpace: SignSpace.Header,
        redirectUrl: "oob",
        requestAuthorizeTokenPath: "oauth/request_token",
        requestAuthorizePagePath: "oauth/authorize",
        requestAccessTokenPath: "oauth/access_token",
    },
    pin_hmac_query: {
        oauthVersion: OAuthVersion.OAuth1,
        authMethod: AuthorizeMethod.PIN,
        signMethod: SignMethod.hmac,
        signSpace: SignSpace.Query,
        redirectUrl: "oob",
        requestAuthorizeTokenPath: "oauth/request_token",
        requestAuthorizePagePath: "oauth/authorize",
        requestAccessTokenPath: "oauth/access_token",
    },
};

export const oauth2data: PairOfObject<AuthorizationUnitObject> = {
    pin_plain_header: {
        oauthVersion: OAuthVersion.OAuth2,
        authMethod: AuthorizeMethod.Callback,
        signMethod: SignMethod.plain,
        signSpace: SignSpace.Header,
        redirectUrl: "https://google.com",
        requestAuthorizePagePath: "oauth/authorize",
        requestAccessTokenPath: "oauth/access_token",
    },
    pin_plain_query: {
        oauthVersion: OAuthVersion.OAuth2,
        authMethod: AuthorizeMethod.Callback,
        signMethod: SignMethod.plain,
        signSpace: SignSpace.Query,
        redirectUrl: "https://google.com",
        requestAuthorizePagePath: "oauth/authorize",
        requestAccessTokenPath: "oauth/access_token",
    },
};
