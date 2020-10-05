import dynamize, { dynaSchemaCreator } from "./Dynamizr";
import { ReturnedDatumInfoType } from "../Types/ReturnedDatumInfoType";
import { UndefinedablePairOfObject } from "../../HelperType/PairOfObject";
import { UnexpectedDataKey } from "../../../Exceptions";
import { ISolvedData } from "./Dynamizr/Interfaces/ISolvedData";
import { ISchema } from "./Dynamizr/Interfaces/ISchema";
import { Exportable } from "../../HelperType/Exportable";

export type DataSetObject = {
    key: string;
    targetDataKey?: string;
    extendErrorKey?: string;
    schemaDef: ISchema;
};

export type DataSetsObject = UndefinedablePairOfObject<DataSetObject>;

export class DataSetControl implements Exportable<DataSetsObject> {
    private readonly _receivedDataInfo: UndefinedablePairOfObject<ReturnedDatumInfoType>;
    private readonly _source: DataSetsObject;

    constructor(source: DataSetsObject) {
        this._receivedDataInfo = {};
        this._source = source;
        const keys = Object.keys(source);
        for (const key of keys) {
            if (key) {
                this._receivedDataInfo[key] = dynaSchemaCreator(source[key]!.schemaDef);
            }
        }
    }

    public normalize<T = any>(key: string, data: any): ISolvedData<T> {
        if (!this._receivedDataInfo[key]) {
            throw UnexpectedDataKey;
        }
        return dynamize(this._receivedDataInfo[key]!, data);
    }

    public async parseResponse<T = any>(key: string, res: Response): Promise<ISolvedData<T>> {
        if (!res.ok) {
            await Promise.reject({ status: res.status, statusText: res.statusText });
        }
        const json = await res.json();
        return this.normalize(key, json);
    }

    export(): DataSetsObject {
        return this._source;
    }
}
