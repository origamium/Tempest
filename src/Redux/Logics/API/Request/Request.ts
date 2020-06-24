import { ApiParameterMethods } from "../../Enums/ApiParameterMethods";
import * as Exceptions from "../../../Exceptions";
import { APIParameterDefType } from "../../Types/API/APIParameterDefType";
import { CombinedParameterDataType } from "../../Types/API/CombinedParameterDataType";
import { APIDataType } from "../../Types/API/APIDataType";
import { APIPayloadType } from "../../Types/API/APIPayloadType";
import * as querystring from "querystring";

interface IParameterKeysObject {
    key: string[];
    required: string[];
    header: string[];
    sandwitch: string | null;
    query: string[];
}

export default class Request {
    public static getParameterClassifier(parameter: APIParameterDefType): IParameterKeysObject {
        const parameters = Object.keys(parameter);
        const sandwitches = parameters.filter((key) => parameter[key]?.type === ApiParameterMethods.PathString);

        let sandwitch: string | null = null;
        if (sandwitches.length > 1) {
            throw Exceptions.MultipleSandWitchParameterNotAllowed;
        } else if (sandwitches.length === 1) {
            sandwitch = sandwitches[0];
        }

        return {
            key: parameters,
            required: parameters.filter((key: string) => parameter[key]?.required),
            header: parameters.filter((key: string) => parameter[key]?.type === ApiParameterMethods.Header),
            sandwitch,
            query: parameters.filter((key: string) => parameter[key]?.type === ApiParameterMethods.Query),
        };
    }

    public static parameterChecker(parameters: CombinedParameterDataType, keys: IParameterKeysObject): boolean {
        const payloadKeys = Object.keys(parameters.payload);

        for (const payloadKeyIndex in payloadKeys) {
            if (!keys.key.includes(payloadKeys[payloadKeyIndex])) {
                return false;
            }
        }

        for (const requiredKey in keys.required) {
            if (!payloadKeys.includes(keys.required[requiredKey])) {
                return false;
            }
        }

        return true;
    }

    private static isIncludePathToRegexp({ definition }: CombinedParameterDataType): boolean {
        return !!Object.entries(definition).find(([, value]) => value?.type === ApiParameterMethods.PathString);
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
        return `${data.baseUri}${data.path /*TODO: path-to-regexp*/}${qs.length !== 0 ? `?${qs}` : ""}`;
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
