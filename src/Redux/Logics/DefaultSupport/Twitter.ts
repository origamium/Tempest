import { APISetObject } from "../Types/StoredObject/Service/ApiSet/APISetObject";
import { OAuthVersion } from "../Enums/Authorization/OAuthVersion";
import { AuthorizeMethod } from "../Enums/Authorization/AuthorizeMethod";
import { SignMethod } from "../Enums/Authorization/SignMethod";
import { SignSpace } from "../Enums/Authorization/SignSpace";
import { HttpMethods } from "../Enums/HttpMethods";
import { ApiParameterMethods } from "../Enums/ApiParameterMethods";
import { schemaTypes } from "../Enums/SchemaTypes";
import { DataSetsObject } from "../Types/StoredObject/Service/DataSet/DataSetObject";
import { ServiceObject } from "../Types/StoredObject/Service/ServiceObject";
import { ProviderObject } from "../Types/StoredObject/Provider/ProviderObject";

const serviceKey = "Twitter";

const apiSet: APISetObject = {
    authorization: {
        oauthVersion: OAuthVersion.OAuth1,
        authMethod: AuthorizeMethod.PIN,
        signMethod: SignMethod.hmac,
        signSpace: SignSpace.Header,
        redirectUrl: "https://google.com",
        requestAuthorizeTokenPath: "oauth/request_token",
        requestAuthorizePagePath: "oauth/authorize",
        requestAccessTokenPath: "oauth/access_token",
    },
    apis: {
        updateStatus: {
            path: "statuses/update",
            httpMethod: HttpMethods.POST,
            parameterDefinition: {
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
            httpMethod: HttpMethods.GET,
            parameterDefinition: {},
            returnedDataKey: "statusList",
        },
        mentionsTimeline: {
            path: "statuses/mentions_timeline",
            httpMethod: HttpMethods.GET,
            parameterDefinition: {},
            returnedDataKey: "statusList",
        },
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
    apiKey: "",
    apiSecret: "",
};

export default {
    service,
    provider,
};
