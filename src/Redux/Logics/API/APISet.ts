import { APIDataType } from "../Types/API/APIDataType";
import { compile, PathFunction } from "path-to-regexp";

export class APISet {
    private compiledPathToRegexp: PathFunction<any>;

    constructor(source: APIDataType) {
        this.compiledPathToRegexp = compile(source.path);
    }
}
