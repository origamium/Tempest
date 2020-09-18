import { OAuthVersion } from "../Types/Authorization/OAuthVersion";
import { AuthorizeMethod } from "../Types/Authorization/AuthorizeMethod";
import { SignMethod } from "../Types/Authorization/SignMethod";
import { SignSpace } from "../Types/Authorization/SignSpace";
import { HttpMethods } from "../Types/HttpMethods";
import { ApiParameterMethods } from "../Types/ApiParameterMethods";
import { schemaTypes } from "../Types/SchemaTypes";
import { Protocol } from "../Types/Protocol";
import { ProviderObject } from "../Provider/ProviderControl";
import { ServiceObject } from "../Service/ServiceControl";
import { DataSetsObject } from "../Data/DataSetControl";

const apiSet = {
    updateStatus: {
        path: "statuses/update",
        protocol: Protocol.rest,
        httpMethod: HttpMethods.POST,
        parameterDef: {
            status: {
                required: true,
                type: ApiParameterMethods.Query,
            },
            in_reply_to_status_id: {
                required: false,
                type: ApiParameterMethods.Query,
            },
        },
        returnedDataKey: "status",
    },
    homeTimeline: {
        path: "statuses/home_timeline",
        protocol: Protocol.rest,
        httpMethod: HttpMethods.GET,
        parameterDef: {},
        returnedDataKey: "statusList",
    },
    mentionsTimeline: {
        path: "statuses/mentions_timeline",
        protocol: Protocol.rest,
        httpMethod: HttpMethods.GET,
        parameterDef: {},
        returnedDataKey: "statusList",
    },
};

const dataSet: DataSetsObject = {
    status: {
        key: "status",
        schemaDef: {
            schema: {
                name: "contents",
                type: schemaTypes.Entity,
                idAttribute: "id_str",
                transform: {
                    id: "id_str",
                    date: "created_at",
                    content: {
                        text: "text",
                        entity: "entities",
                    },
                },
            },
        },
    },
    statusList: {
        key: "status",
        schemaDef: {
            schema: {
                name: "contents",
                type: schemaTypes.Array,
                idAttribute: "id_str",
                transform: {
                    id: "id_str",
                    date: "created_at",
                    content: {
                        text: "text",
                        entity: "entities",
                    },
                },
                definition: {
                    user: {
                        name: "users",
                        type: schemaTypes.Entity,
                        idAttribute: "id_str",
                        transform: {
                            id: "id_str",
                            screen_name: "screen_name",
                            display_name: "name",
                            icon: "profile_image_url_https",
                            header: "profile_background_image_url_https",
                            bio: "description",
                        },
                    },
                },
            },
        },
    },
    user: {
        key: "user",
        schemaDef: {
            schema: {
                name: "user",
                type: schemaTypes.Entity,
                idAttribute: "id_str",
                transform: {
                    id: "id_str",
                },
            },
        },
    },
};

const serviceKey = "Twitter";

const service: ServiceObject = {
    serviceName: serviceKey,
    apiSet,
    dataSet,
};

const provider: ProviderObject = {
    serviceKey,
    providerName: "twitter.com",
    baseUrl: "https://twitter.com/",
    domain: "twitter.com",
    authorization: {
        apiUrl: "https://api.twitter.com/",
        oauthVersion: OAuthVersion.OAuth1,
        authMethod: AuthorizeMethod.PIN,
        signMethod: SignMethod.hmac,
        signSpace: SignSpace.Header,
        callback: "https://tsuru-twitter-oauth1-v1.origamium.net",
        requestAuthorizeTokenPath: "oauth/request_token",
        requestAuthorizePagePath: "oauth/authorize",
        requestAccessTokenPath: "oauth/access_token",
    },
    apiKey: { ApiKey: "teMvsH7tcmvrJSbKNJvOTIKsc" },
};

export default {
    service,
    provider,
};
