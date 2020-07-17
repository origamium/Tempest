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

    public normalize(key: string, data: any): ISolvedData {
        if (!this._receivedDataInfo[key]) {
            throw UnexpectedDataKey;
        }
        return dynamize(this._receivedDataInfo[key]!, data);
    }

    export(): DataSetsObject {
        return this._source;
    }
}
