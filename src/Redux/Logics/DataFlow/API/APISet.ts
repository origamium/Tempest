import { compile, PathFunction } from "path-to-regexp";
import { ApiUnitObject } from "../Service/ApiSet/ApiUnitObject";

export class APISet {
    private _compiledPathToRegexp: PathFunction<any>;
    private _api: ApiUnitObject;

    constructor(source: ApiUnitObject) {
        this._compiledPathToRegexp = compile(source.path);
        this._api = source;
    }

    public createRequest = (): [RequestInfo, RequestInit] => {
        return ["", {}];
    };
}
