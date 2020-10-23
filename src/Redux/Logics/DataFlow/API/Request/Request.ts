import * as querystring from "querystring";
import { compile } from "path-to-regexp";
import { ApiParameterMethods } from "../../Types/ApiParameterMethods";
import { APIPayloadType } from "../../Types/APIPayloadType";
import { CombinedParameterDataType } from "../../Types/CombinedParameterDataType";
import { APISetObject } from "../../Service/ApiSet/APISetObject";
import { APIParameterDefTypes } from "../../Service/ApiSet/APIParameterDefTypes";

interface IParameterKeysObject {
    key: string[];
    required: string[];
    header: string[];
    pathToRegexp: string[];
    query: string[];
}

export class TRequest {
    private static defaultHeaders = ["mode"];

    public static getParameterClassifier(parameter: APIParameterDefTypes): IParameterKeysObject {
        const parameters = [...Object.keys(parameter), ...this.defaultHeaders];

        return {
            key: parameters,
            required: parameters.filter((key: string) => parameter[key]?.required),
            header: [
                ...parameters.filter((key: string) => parameter[key]?.type === ApiParameterMethods.Header),
                ...this.defaultHeaders,
            ],
            pathToRegexp: parameters.filter((key) => parameter[key]?.type === ApiParameterMethods.PathString),
            query: parameters.filter((key: string) => parameter[key]?.type === ApiParameterMethods.Query),
        };
    }

    public static parameterChecker({ payload }: CombinedParameterDataType, keys: IParameterKeysObject): void | never {
        const payloadKeys = Object.keys(payload);

        for (const requiredKey of keys.required) {
            if (!payloadKeys.includes(requiredKey)) {
                throw new Error(
                    `missing required payload, ${JSON.stringify(keys.required)} but missing ${requiredKey}`
                );
            }
        }

        for (const payloadKey of payloadKeys) {
            if (!keys.key.includes(payloadKey)) {
                throw new Error(
                    `unexpected payload. ${payloadKey} is not defined parameter. defined keys:${JSON.stringify(
                        keys.key
                    )} `
                );
            }
        }
    }

    private static isIncludePathToRegexp({ definition }: CombinedParameterDataType): boolean {
        return !!Object.entries(definition).find(([, value]) => value?.type === ApiParameterMethods.PathString);
    }

    private static pickUpPathToRegexp(
        path: string,
        parameters: CombinedParameterDataType,
        keys: IParameterKeysObject
    ): string {
        if (this.isIncludePathToRegexp(parameters)) {
            const toPath = compile(path); // TODO: ここでわざわざcompileするのはかなりパフォーマンス的に悪い
            const PathToRegexParam: { [key: string]: string } = keys.pathToRegexp?.reduce(
                (prev, curr) => ({ ...prev, [curr]: parameters.payload[curr] }),
                {}
            );
            return toPath(PathToRegexParam);
        } else {
            return path;
        }
    }

    private static pickUpQueryString(
        { query }: IParameterKeysObject,
        payload: APIPayloadType
    ): { [key: string]: string } {
        return query.reduce((prev, curr) => {
            return { ...prev, ...(payload[curr] ? { [curr]: payload[curr] } : {}) };
        }, {});
    }

    public static createUri(
        baseUri: string,
        data: APISetObject,
        parameters: CombinedParameterDataType,
        keys: IParameterKeysObject
    ): string {
        const qs = querystring.stringify(this.pickUpQueryString(keys, parameters.payload));
        const qsString = qs.length !== 0 ? `?${qs}` : "";
        const path = this.pickUpPathToRegexp(data.path, parameters, keys);

        return `${baseUri}${path}${qsString}`;
    }

    public static createHeaderObject(parameters: CombinedParameterDataType, keys: IParameterKeysObject): HeadersInit {
        return keys.header
            .filter((key) => parameters.payload[key])
            .reduce(
                (prev, currKey) => ({
                    ...prev,
                    ...{ [currKey]: parameters.payload[currKey] },
                }),
                {}
            );
    }

    public static createRequest(
        baseUri: string,
        data: APISetObject,
        payload: APIPayloadType,
        cert?: CombinedParameterDataType
    ): [RequestInfo, RequestInit] {
        const parameterDef = data.parameterDef ?? {};
        const defaultPayload = Object.entries(parameterDef).reduce(
            (accm, [key, value]) => (value?.default ? { ...accm, [key]: value.default } : accm),
            {}
        );
        let combinedParameter: CombinedParameterDataType = {
            definition: parameterDef,
            payload: { ...defaultPayload, ...payload },
        };
        if (cert) {
            combinedParameter = {
                definition: { ...combinedParameter.definition, ...cert.definition },
                payload: { ...combinedParameter.payload, ...cert.payload },
            };
        }

        const classifiedKey: IParameterKeysObject = this.getParameterClassifier(combinedParameter.definition);
        this.parameterChecker(combinedParameter, classifiedKey);

        return [
            this.createUri(baseUri, data, combinedParameter, classifiedKey),
            {
                method: data.httpMethod,
                headers: this.createHeaderObject(combinedParameter, classifiedKey),
            },
        ];
    }
}
