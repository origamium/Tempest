import { OAuthVersion } from "../../Types/Authorization/OAuthVersion";
import { AuthorizeMethod } from "../../Types/Authorization/AuthorizeMethod";
import { SignMethod } from "../../Types/Authorization/SignMethod";
import { SignSpace } from "../../Types/Authorization/SignSpace";

export type AuthorizationUnitObject = {
    apiUrl?: string; // connect authorization lambda
    oauthVersion: OAuthVersion; // required
    authMethod: AuthorizeMethod; // required
    signMethod: SignMethod; // required
    signSpace: SignSpace; // required
    scope?: string[];
    callback: string; // required
    requestAccessTokenLambda?: string;
    requestAuthorizeTokenLambda?: string;
    requestTokenRefreshLambda?: string;
    requestRevokeTokenLambda?: string;
};
