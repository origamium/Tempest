import { APISetsObject } from "../Service/ApiSet/APISetObject";
import { Protocol } from "../Types/Protocol";
import { HttpMethods } from "../Types/HttpMethods";
import { ProviderObject } from "../Provider/ProviderControl";

export default {
    Service: {
        serviceKey: "mastodon",
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
            baseUrl: "https://mstdn.jp/",
            domain: "mstdn.jp",
            apiKey: undefined,
        },
        {
            baseUrl: "https://pawoo.net/",
            domain: "mstdn.jp",
            apiKey: undefined,
        },
    ] as ProviderObject,
};
