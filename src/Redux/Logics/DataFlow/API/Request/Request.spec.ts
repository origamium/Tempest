import Request from "./Request";
import { APIDataType } from "../../Types/API/APIDataType";
import { HttpMethods } from "../../Enums/HttpMethods";
import { APIParameterDefType } from "../../Types/API/APIParameterDefType";
import { ApiParameterMethods } from "../../Enums/ApiParameterMethods";
import { CombinedParameterDataType } from "../../Types/API/CombinedParameterDataType";

const blank: APIDataType = {
    baseUri: "https://example.com",
    path: "/path/to",
    parameter: {},
    method: HttpMethods.GET,
};

const path_to_string_basic: APIDataType = {
    baseUri: "https://example.com",
    path: "/:id/nya/:projectName/",
    parameter: {
        id: {
            required: true,
            type: ApiParameterMethods.PathString,
        },
        projectName: {
            required: true,
            type: ApiParameterMethods.PathString,
        },
    },
    method: HttpMethods.POST,
};

const path_to_string: APIParameterDefType = {
    yuru: {
        required: true,
        type: ApiParameterMethods.PathString,
    },
};

const path_to_string_error: APIParameterDefType = {
    yuru: {
        required: true,
        type: ApiParameterMethods.PathString,
    },
    yuri: {
        required: false,
        type: ApiParameterMethods.PathString,
    },
};

const sample1: APIParameterDefType = {
    yuru: {
        required: true,
        type: ApiParameterMethods.PathString,
    },
    yuri: {
        required: true,
        type: ApiParameterMethods.Header,
    },
    oomuro: {
        required: false,
        type: ApiParameterMethods.Query,
    },
    sakurako: {
        required: false,
        type: ApiParameterMethods.Query,
    },
    yoshikawa: {
        required: true,
        type: ApiParameterMethods.Query,
    },
    chinatsu: {
        required: false,
        type: ApiParameterMethods.Header,
    },
};

test("getParameterKeys method", () => {
    expect(Request.getParameterClassifier(blank.parameter)).toEqual({
        key: [],
        required: [],
        header: [],
        pathToRegexp: [],
        query: [],
    });

    expect(Request.getParameterClassifier({ ...blank.parameter, ...path_to_string })).toEqual({
        key: ["yuru"],
        required: ["yuru"],
        header: [],
        pathToRegexp: ["yuru"],
        query: [],
    });

    // getParameterClassifier is not raise exception. its valid case.
    expect(Request.getParameterClassifier({ ...blank.parameter, ...path_to_string_error })).toEqual({
        key: ["yuru", "yuri"],
        required: ["yuru"],
        header: [],
        pathToRegexp: ["yuru", "yuri"],
        query: [],
    });

    expect(Request.getParameterClassifier(Object.assign({ ...blank.parameter, ...sample1 }))).toEqual({
        key: ["yuru", "yuri", "oomuro", "sakurako", "yoshikawa", "chinatsu"],
        required: ["yuru", "yuri", "yoshikawa"],
        header: ["yuri", "chinatsu"],
        pathToRegexp: ["yuru"],
        query: ["oomuro", "sakurako", "yoshikawa"],
    });

    expect(Request.getParameterClassifier(path_to_string_basic.parameter)).toEqual({
        key: ["id", "projectName"],
        required: ["id", "projectName"],
        header: [],
        pathToRegexp: ["id", "projectName"],
        query: [],
    });
});

const blankCombinedParameter: CombinedParameterDataType = {
    definition: {},
    payload: {},
};

const path_to_bacic_combined_parameter: CombinedParameterDataType = {
    definition: path_to_string_basic.parameter,
    payload: {
        id: "1234",
        projectName: "383208",
    },
};

const errorParameter: CombinedParameterDataType = {
    definition: sample1,
    payload: {},
};

const goodParameter: CombinedParameterDataType = {
    definition: sample1,
    payload: { yuru: "yuri", yuri: "yuru", yoshikawa: "chinatsu" },
};

const unknownPayload: CombinedParameterDataType = {
    definition: sample1,
    payload: { yuru: "yuri", yuri: "yuru", yoshikawa: "chinatsu", donald: "trump" },
};

test("parameterRequireChecker method", () => {
    expect(
        Request.parameterChecker(
            blankCombinedParameter,
            Request.getParameterClassifier(blankCombinedParameter.definition)
        )
    ).toBeUndefined();

    expect(() =>
        Request.parameterChecker(errorParameter, Request.getParameterClassifier(errorParameter.definition))
    ).toThrow();

    expect(
        Request.parameterChecker(goodParameter, Request.getParameterClassifier(goodParameter.definition))
    ).toBeUndefined();

    expect(() =>
        Request.parameterChecker(unknownPayload, Request.getParameterClassifier(unknownPayload.definition))
    ).toThrow();
});

test("createUrl method", () => {
    expect(
        Request.createUri(
            blank,
            blankCombinedParameter,
            Request.getParameterClassifier(blankCombinedParameter.definition)
        )
    ).toEqual(blank.baseUri + blank.path);

    expect(
        Request.createUri(path_to_string_basic, path_to_bacic_combined_parameter, {
            key: ["id", "projectName"],
            required: ["id", "projectName"],
            header: [],
            pathToRegexp: ["id", "projectName"],
            query: [],
        })
    ).toEqual(`${path_to_string_basic.baseUri}/1234/nya/383208/`);
});

test("createHeaderObject method", () => {
    expect(
        Request.createHeaderObject(
            blankCombinedParameter,
            Request.getParameterClassifier(blankCombinedParameter.definition)
        )
    ).toEqual({});
    //だるい: TODO
});

test("createRequset", () => {
    expect(Request.createRequest(path_to_string_basic, path_to_bacic_combined_parameter.payload)).toEqual([
        "https://example.com/1234/nya/383208/",
        { headers: {}, method: "POST" },
    ]);
});
