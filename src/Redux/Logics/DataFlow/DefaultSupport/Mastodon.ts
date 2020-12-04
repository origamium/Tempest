import { APISetsObject } from "../Service/ApiSet/APISetObject";
import { Protocol } from "../Types/Protocol";
import { HttpMethods } from "../Types/HttpMethods";
import { ProviderObject } from "../Provider/ProviderControl";
import { OAuthVersion } from "../Types/Authorization/OAuthVersion";
import { SignSpace } from "../Types/Authorization/SignSpace";
import { SignMethod } from "../Types/Authorization/SignMethod";
import { ApiParameterMethods } from "../Types/ApiParameterMethods";
import { UIActionsObject } from "../UIActions/UIActionControl";
import { DataSetsObject } from "../Data/DataSetControl";
import { UserProperties } from "../../../../datatype/Contents/User";

const serviceKey = "mastodon";

export default {
    Service: {
        serviceKey,
        serviceName: "Mastodon",
        apiSet: {
            authorizeUri: {
                path: "oauth/authorize",
                protocol: Protocol.rest,
                httpMethod: HttpMethods.GET,
                open: true,
                parameterDef: {
                    response_type: {
                        required: true,
                        default: "code",
                    },
                    client_id: {
                        required: true,
                    },
                    redirect_uri: {
                        required: true,
                    },
                    scope: {
                        required: true,
                        default: "read write follow",
                    },
                },
            },
            requestToken: {
                path: "oauth/token",
                protocol: Protocol.rest,
                httpMethod: HttpMethods.POST,
                parameterDef: {
                    client_id: {
                        required: true,
                    },
                    client_secret: {
                        required: false,
                    },
                    redirect_uri: {
                        required: true,
                    },
                    scope: {
                        required: true,
                        default: "read write follow",
                    },
                    code: {
                        required: true,
                    },
                    grant_type: {
                        required: true,
                        default: "code",
                    },
                    provider: {
                        required: false,
                    },
                    "content-type": {
                        required: true,
                        type: ApiParameterMethods.Header,
                        default: "application/x-www-form-urlencoded",
                    },
                },
                returnedDataKey: "oauth_token",
            },
            revokeToken: {
                path: "oauth/revoke",
                protocol: Protocol.rest,
                httpMethod: HttpMethods.POST,
                parameterDef: {
                    client_id: {
                        required: true,
                    },
                    client_secret: {
                        required: true,
                    },
                    token: {
                        required: true,
                    },
                },
            },
            getCredentials: {
                path: "api/v1/accounts/verify_credentials",
                protocol: Protocol.rest,
                httpMethod: HttpMethods.GET,
                returnedDataKey: "userData",
                parameterDef: {},
            },
        } as APISetsObject,
        dataSet: {
            oauth_token: {
                transform: {
                    access_token: "token",
                },
            },
            userData: {
                transform: {
                    id: "id",
                    display_name: UserProperties.displayName,
                    username: UserProperties.screenName,
                    locked: UserProperties.locked,
                    avatar: UserProperties.avatarImage,
                    header: UserProperties.headerImage,
                },
            },
        } as DataSetsObject,
        uiActionSet: {
            account: {
                getInfo: {
                    name: "get user info",
                    targetApiKey: "getCredentials",
                    targetContentKey: "userData",
                    dataPoolKey: "self.account",
                    schema: {},
                },
            },
        } as UIActionsObject,
    },
    Provider: [
        {
            serviceKey,
            providerName: "mstdn.jp",
            providerKey: "mstdnjp",
            baseUrl: "https://mstdn.jp/",
            domain: "mstdn.jp",
            apiKey: {
                ApiKey: "5e0f667fb4da4b6e06cff473f8fdbce51f86c2af9c56ccd90b2fcad5160aeab8",
            },
            authorization: {
                apiUrl: "https://mstdn.jp/",
                oauthVersion: OAuthVersion.OAuth2,
                signSpace: SignSpace.Header,
                signMethod: SignMethod.plain,
                callback: "urn:ietf:wg:oauth:2.0:oob",
                requestAuthorizeTokenLambda: "https://tempest-authorizer.origamium.net/api/mastodon/v1/request_token",
            },
        },
        {
            serviceKey,
            providerName: "pawoo.net",
            providerKey: "pawoonet",
            baseUrl: "https://pawoo.net/",
            domain: "pawoo.net",
            apiKey: {
                ApiKey: "f24ec24cda87513ba5b963addc0b3a75d13c8fed83c17fc60ba2f7b59aeb7ffc",
            },
            authorization: {
                apiUrl: "https://pawoo.net/",
                oauthVersion: OAuthVersion.OAuth2,
                signSpace: SignSpace.Header,
                signMethod: SignMethod.plain,
                callback: "urn:ietf:wg:oauth:2.0:oob",
                requestAuthorizeTokenLambda: "https://tempest-authorizer.origamium.net/api/mastodon/v1/request_token",
            },
        },
    ] as ProviderObject,
};
