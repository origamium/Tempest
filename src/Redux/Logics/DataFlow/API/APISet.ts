import { compile, PathFunction } from "path-to-regexp";
import { APISetObject, APISetsObject } from "../Service/ApiSet/APISetObject";
import { PairOfObject } from "../../HelperType/PairOfObject";
import { Exportable } from "../../HelperType/Exportable";
import { HttpMethods } from "../Types/HttpMethods";
import { ApiParameterMethods } from "../Types/ApiParameterMethods";
import { TRequest } from "./Request/Request";
import { APIPayloadType } from "../Types/APIPayloadType";

export class APISet implements Exportable<APISetObject> {
    // @ts-ignore
    private _compiledPathToRegexp: PathFunction<any>;
    private _api: APISetObject;

    private static defaultMethod(method: HttpMethods): ApiParameterMethods {
        switch (method) {
            case HttpMethods.GET:
            case HttpMethods.PUT:
                return ApiParameterMethods.Query;
            default:
                return ApiParameterMethods.Body;
        }
    }

    constructor(source: APISetObject) {
        this._compiledPathToRegexp = compile(source.path);
        this._api = source;
        this._api.parameterDef =
            source.parameterDef &&
            Object.entries(source.parameterDef).reduce(
                (accm, [key, value]) => ({
                    ...accm,
                    [key]: Object.assign(
                        { ...value },
                        { type: value?.type ?? APISet.defaultMethod(source.httpMethod) }
                    ),
                }),
                {}
            );
    }

    public createRequest = (baseUri: string, payload: APIPayloadType): [RequestInfo, RequestInit, boolean] => {
        return TRequest.createRequest(baseUri, this._api, payload);
    };

    get dataKey(): string | undefined {
        return this._api.returnedDataKey;
    }

    get errorKey() {
        return this._api.errorKey;
    }

    get parameterDef() {
        return this._api.parameterDef;
    }

    export(): APISetObject {
        return this._api;
    }
}

export class APISetControl implements Exportable<APISetsObject> {
    private _apiSet: PairOfObject<APISet>;

    constructor(source: APISetsObject) {
        this._apiSet = Object.entries(source).reduce(
            (accm, [key, value]) => ({ ...accm, [key]: new APISet(value as APISetObject) }),
            {}
        );
    }

    public getAPI(key: string): APISet {
        return this._apiSet[key];
    }

    export(): APISetsObject {
        return Object.entries(this._apiSet).reduce((accm, [key, value]) => ({ ...accm, [key]: value.export() }), {});
    }
}
