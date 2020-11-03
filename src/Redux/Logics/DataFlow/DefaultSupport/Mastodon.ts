import { APISetsObject } from "../Service/ApiSet/APISetObject";
import { Protocol } from "../Types/Protocol";
import { HttpMethods } from "../Types/HttpMethods";
import { ProviderObject } from "../Provider/ProviderControl";
import { OAuthVersion } from "../Types/Authorization/OAuthVersion";
import { SignSpace } from "../Types/Authorization/SignSpace";
import { SignMethod } from "../Types/Authorization/SignMethod";

const serviceKey = "mastodon";

export default {
    Service: {
        serviceKey,
        serviceName: "Mastodon",
        apiSet: {
            authorize: {
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
            token: {
                path: "oauth/token",
                protocol: Protocol.rest,
                httpMethod: HttpMethods.POST,
                parameterDef: {
                    client_id: {
                        required: true,
                    },
                    client_secret: {
                        required: true,
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
                },
                returnedDataKey: "oauth_token",
            },
            revoke: {
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
        } as APISetsObject,
        dataSet: {},
    },
    Provider: [
        {
            serviceKey,
            providerName: "mstdn.jp",
            providerKey: "mstdnjp",
            baseUrl: "https://mstdn.jp/",
            domain: "mstdn.jp",
            apiKey: {
                ApiKey: "f24ec24cda87513ba5b963addc0b3a75d13c8fed83c17fc60ba2f7b59aeb7ffc",
            },
            authorization: {
                apiUrl: "https://mstdn.net/",
                oauthVersion: OAuthVersion.OAuth2,
                signSpace: SignSpace.Header,
                signMethod: SignMethod.plain,
                callback: "urn:ietf:wg:oauth:2.0:oob",
                requestAuthorizePagePath: "oauth/authorize",
                requestAccessTokenPath: "oauth/token",
            },
        },
        {
            serviceKey,
            providerName: "pawoo.net",
            providerKey: "pawoonet",
            baseUrl: "https://pawoo.net/",
            domain: "pawoo.net",
            apiKey: {
                ApiKey: "5e0f667fb4da4b6e06cff473f8fdbce51f86c2af9c56ccd90b2fcad5160aeab8",
            },
            authorization: {
                apiUrl: "https://pawoo.net/",
                oauthVersion: OAuthVersion.OAuth2,
                signSpace: SignSpace.Header,
                signMethod: SignMethod.plain,
                callback: "urn:ietf:wg:oauth:2.0:oob",
                requestAuthorizePagePath: "oauth/authorize",
                requestAccessTokenPath: "oauth/token",
            },
        },
    ] as ProviderObject,
};
