import { OAuthVersion } from "../../../../Enums/Authorization/OAuthVersion";
import { AuthorizeMethod } from "../../../../Enums/Authorization/AuthorizeMethod";
import { SignMethod } from "../../../../Enums/Authorization/SignMethod";
import { SignSpace } from "../../../../Enums/Authorization/SignSpace";

export type AuthorizationUnitObject = {
    oauthVersion: OAuthVersion; // required
    authMethod: AuthorizeMethod; // required
    signMethod: SignMethod; // required
    signSpace: SignSpace; // required
    scope?: string[]; // required
    redirectUrl: string; // required
    requestAuthorizeTokenPath?: string;
    requestAuthorizePagePath: string; // required
    requestAccessTokenPath: string; // required
    requestTokenRefreshPath?: string;
    official?: string; // connect authorization lambda
};
