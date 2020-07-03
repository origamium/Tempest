import { APIDataType } from "../APIType/APIDataType";
import { compile, PathFunction } from "path-to-regexp";

export class APISet {
    private compiledPathToRegexp: PathFunction<any>;
    private api: APIDataType;

    constructor(source: APIDataType) {
        this.compiledPathToRegexp = compile(source.path);
        this.api = source;
    }

    public createRequest = (): [RequestInfo, RequestInit] => {

    }
}
