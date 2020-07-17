import { APIKeyType } from "./APIKeyType";
import { OAuthVersion } from "./Authorization/OAuthVersion";
import { AuthorizeMethod } from "./Authorization/AuthorizeMethod";
import { SignMethod } from "./Authorization/SignMethod";
import { SignSpace } from "./Authorization/SignSpace";

export interface AuthInfoType {
    apiKey: APIKeyType;
    oauthVersion: OAuthVersion;
    authMethod: AuthorizeMethod;
    signMethod: SignMethod;
    signSpace: SignSpace;
    scope?: string;
    callback?: string;
    official?: string;
}
