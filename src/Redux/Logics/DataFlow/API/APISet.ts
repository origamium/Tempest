import { compile, PathFunction } from "path-to-regexp";
import { ApiUnitObject, APIUnitsObject } from "../Service/ApiSet/ApiUnitObject";
import { PairOfObject } from "../../HelperType/PairOfObject";
import { Exportable } from "../../HelperType/Exportable";

export class APISet implements Exportable<ApiUnitObject> {
    // @ts-ignore
    private _compiledPathToRegexp: PathFunction<any>;
    private _api: ApiUnitObject;

    constructor(source: ApiUnitObject) {
        this._compiledPathToRegexp = compile(source.path);
        this._api = source;
    }

    public createRequest = (): [RequestInfo, RequestInit] => {
        return ["", {}];
    };

    export(): ApiUnitObject {
        return this._api;
    }
}

export class APISetControl implements Exportable<APIUnitsObject> {
    private _apiSet: PairOfObject<APISet>;

    constructor(source: APIUnitsObject) {
        this._apiSet = Object.entries(source).reduce(
            (accm, [key, value]) => ({ ...accm, [key]: new APISet(value as ApiUnitObject) }),
            {}
        );
    }

    public getAPI(key: string): APISet {
        return this._apiSet[key];
    }

    export(): APIUnitsObject {
        return Object.entries(this._apiSet).reduce((accm, [key, value]) => ({ ...accm, [key]: value.export() }), {});
    }
}
