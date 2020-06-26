import { ApiParameterMethods } from "../../Enums/ApiParameterMethods";
import { APIParameterDefType } from "../../Types/API/APIParameterDefType";
import { CombinedParameterDataType } from "../../Types/API/CombinedParameterDataType";
import * as querystring from "querystring";
import { compile } from "path-to-regexp";
import { APIPayloadType } from "../../Types/API/APIPayloadType";
import { APIDataType } from "../../Types/API/APIDataType";

interface IParameterKeysObject {
    key: string[];
    required: string[];
    header: string[];
    pathToRegexp: string[];
    query: string[];
}

export default class Request {
    public static getParameterClassifier(parameter: APIParameterDefType): IParameterKeysObject {
        const parameters = Object.keys(parameter);

        return {
            key: parameters,
            required: parameters.filter((key: string) => parameter[key]?.required),
            header: parameters.filter((key: string) => parameter[key]?.type === ApiParameterMethods.Header),
            pathToRegexp: parameters.filter((key) => parameter[key]?.type === ApiParameterMethods.PathString),
            query: parameters.filter((key: string) => parameter[key]?.type === ApiParameterMethods.Query),
        };
    }

    public static parameterChecker({ payload }: CombinedParameterDataType, keys: IParameterKeysObject): boolean {
        const payloadKeys = Object.keys(payload);

        for (const requiredKey of keys.required) {
            if (!payloadKeys.includes(requiredKey)) {
                return false;
            }
        }

        for (const payloadKey of payloadKeys) {
            if (!keys.key.includes(payloadKey)) {
                return false;
            }
        }

        return true;
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
        data: APIDataType,
        parameters: CombinedParameterDataType,
        keys: IParameterKeysObject
    ): string {
        const qs = querystring.stringify(this.pickUpQueryString(keys, parameters.payload));
        const qsString = qs.length !== 0 ? `?${qs}` : "";
        const path = this.pickUpPathToRegexp(data.path, parameters, keys);

        return `${data.baseUri}${path}${qsString}`;
    }

    public static createQueryParameterObject(
        parameters: CombinedParameterDataType,
        keys: IParameterKeysObject
    ): object {
        return keys.query
            .filter((key) => parameters.payload[key])
            .reduce(
                (prev, currKey) => ({
                    ...prev,
                    ...{ currKey: parameters.payload[currKey] },
                }),
                {}
            );
    }

    public static createHeaderObject(parameters: CombinedParameterDataType, keys: IParameterKeysObject): HeadersInit {
        return keys.header
            .filter((key) => parameters.payload[key])
            .reduce(
                (prev, currKey) => ({
                    ...prev,
                    ...{ currKey: parameters.payload[currKey] },
                }),
                {}
            );
    }

    public static createRequest(
        data: APIDataType,
        payload: APIPayloadType,
        cert?: CombinedParameterDataType
    ): [RequestInfo, RequestInit] {
        let combinedParameter: CombinedParameterDataType = {
            definition: data.parameter,
            payload,
        };
        if (cert) {
            combinedParameter = {
                definition: { ...combinedParameter.definition, ...cert.definition },
                payload: { ...combinedParameter.payload, ...cert.payload },
            };
        }

        const classifiedKey: IParameterKeysObject = this.getParameterClassifier(combinedParameter.definition);
        if (this.parameterChecker(combinedParameter, classifiedKey)) {
            throw new Error("invalid parameter definition and payload.");
        }

        return [
            this.createUri(data, combinedParameter, classifiedKey),
            {
                method: data.method,
                headers: this.createHeaderObject(combinedParameter, classifiedKey),
            },
        ];
    }
}
