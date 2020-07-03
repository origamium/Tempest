import OAuth1 from "./OAuth1";
import OAuth2 from "./OAuth2";
import { AuthInfoType } from "../../APIType/AuthInfoType";
import { AuthorizationUnitObject } from "../../../SavingData/StoredObject/Service/ApiSet/AuthorizationUnitObject";
import { APIKeyType, TokenType } from "../../APIType/APIKeyType";
import { OAuthVersion } from "../../Enums/Authorization/OAuthVersion";
import { UnknownAuthorizationMethod } from "../../../../Exceptions";
import { APIDataType } from "../../APIType/APIDataType";
import { APIPayloadType } from "../../APIType/APIPayloadType";
import { CombinedParameterDataType } from "../../APIType/CombinedParameterDataType";

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
