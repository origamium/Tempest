import { APIKeyType } from "../../Types/APIKeyType";
import { AuthInfoType } from "../../Types/AuthInfoType";
import { OAuthVersion } from "../../Types/Authorization/OAuthVersion";
import { AuthorizeMethod } from "../../Types/Authorization/AuthorizeMethod";
import { SignMethod } from "../../Types/Authorization/SignMethod";
import { SignSpace } from "../../Types/Authorization/SignSpace";
import { APIDataType } from "../../../Types/APIDataType";
import { HttpMethods } from "../../Types/HttpMethods";
import OAuth1 from "../OAuth1";

const auth = new OAuth1();

const apikey: APIKeyType = {
    ApiKey: "qweoiruouwtqiuoiequioqreuqowirueioqurioe",
    ApiSecretKey: "rjti4qojeioqjfiojio240ut0943085904809528038502",
};

const authData_header: AuthInfoType = {
    apiKey: apikey,
    oauthVersion: OAuthVersion.OAuth1,
    authMethod: AuthorizeMethod.Callback,
    signMethod: SignMethod.hmac,
    signSpace: SignSpace.Header,
};

const apidata_header: APIDataType = {
    baseUri: "https://example.com/",
    path: "yeah/good",
    parameter: {},
    method: HttpMethods.GET,
};

// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const authData_query: AuthInfoType = {
    apiKey: apikey,
    oauthVersion: OAuthVersion.OAuth1,
    authMethod: AuthorizeMethod.Callback,
    signMethod: SignMethod.hmac,
    signSpace: SignSpace.Query,
};

// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const apidata_query: APIDataType = {
    baseUri: "https://example.com/",
    path: "yeah/good",
    parameter: {},
    method: HttpMethods.GET,
};

describe("OAuth1 authentication test", () => {
    it("01: request auth token", () => {
        const target = auth.requestAuthToken(apidata_header, authData_header);
        expect(Object.keys(target.definition)).toEqual(["Authorization"]);
    });

    it("02: create authorize uri", () => {
        const target = auth.authorizeUri(apidata_header, authData_header, AuthorizeMethod.Callback, {
            authToken: { Token: "yeah" },
        });
        expect(target.uri && typeof target.uri === "string").toBeTruthy();
    });
});
