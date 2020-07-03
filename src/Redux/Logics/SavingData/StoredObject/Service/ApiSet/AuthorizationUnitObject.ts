import { OAuthVersion } from "../../../../DataFlow/Enums/Authorization/OAuthVersion";
import { AuthorizeMethod } from "../../../../DataFlow/Enums/Authorization/AuthorizeMethod";
import { SignMethod } from "../../../../DataFlow/Enums/Authorization/SignMethod";
import { SignSpace } from "../../../../DataFlow/Enums/Authorization/SignSpace";

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
