import OAuth1 from "./OAuth1";
import OAuth2 from "./OAuth2";
import { AuthInfoType } from "../../Types/API/AuthInfoType";
import { AuthorizationUnitObject } from "../../Types/StoredObject/Service/ApiSet/AuthorizationUnitObject";
import { APIKeyType, TokenType } from "../../Types/API/APIKeyType";
import { OAuthVersion } from "../../Enums/Authorization/OAuthVersion";
import { UnknownAuthorizationMethod } from "../../../Exceptions";
import { APIDataType } from "../../Types/API/APIDataType";
import { APIPayloadType } from "../../Types/API/APIPayloadType";
import { CombinedParameterDataType } from "../../Types/API/CombinedParameterDataType";

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
        api: APIDataType,
        token: TokenType,
        payload: APIPayloadType
    ): CombinedParameterDataType {
        return this.auth.getAuthorizationData(api, this.info, token, payload);
    }
}
