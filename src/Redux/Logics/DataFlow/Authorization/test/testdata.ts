import { APIKeyType, TokenType } from "../../Types/APIKeyType";
import { APIDataType } from "../../../Types/APIDataType";
import { HttpMethods } from "../../Types/HttpMethods";
import { APIParameterDefType } from "../../../Types/APIParameterDefType";
import { ApiParameterMethods } from "../../Types/ApiParameterMethods";
import { PairOfObject } from "../../../HelperType/PairOfObject";
import { AuthorizationUnitObject } from "../../Service/ApiSet/AuthorizationUnitObject";
import { OAuthVersion } from "../../Types/Authorization/OAuthVersion";
import { AuthorizeMethod } from "../../Types/Authorization/AuthorizeMethod";
import { SignMethod } from "../../Types/Authorization/SignMethod";
import { SignSpace } from "../../Types/Authorization/SignSpace";

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
