import {AuthorizeMethod} from '../Enums/AuthorizeMethod';
import {OAuthVersion} from '../Enums/OAuthVersion';
import {SignMethod} from '../Enums/SignMethod';
import {SignSpace} from '../Enums/SignSpace';
import {IAPIKey} from './APIKeyType';

export interface AuthInfoType {
    apiKey: IAPIKey;
    oauthVersion: OAuthVersion;
    authMethod: AuthorizeMethod;
    signMethod: SignMethod;
    signSpace: SignSpace;
    scope?: string;
    callback?: string;
    official?: string;
}
