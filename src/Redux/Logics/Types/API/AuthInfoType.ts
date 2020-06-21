import { APIKeyType } from "./APIKeyType";
import { OAuthVersion } from "../../Enums/Authorization/OAuthVersion";
import { AuthorizeMethod } from "../../Enums/Authorization/AuthorizeMethod";
import { SignMethod } from "../../Enums/Authorization/SignMethod";
import { SignSpace } from "../../Enums/Authorization/SignSpace";

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
