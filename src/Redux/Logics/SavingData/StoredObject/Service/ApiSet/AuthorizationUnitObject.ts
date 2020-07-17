import { OAuthVersion } from "../../../../DataFlow/Types/Authorization/OAuthVersion";
import { AuthorizeMethod } from "../../../../DataFlow/Types/Authorization/AuthorizeMethod";
import { SignMethod } from "../../../../DataFlow/Types/Authorization/SignMethod";
import { SignSpace } from "../../../../DataFlow/Types/Authorization/SignSpace";

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
