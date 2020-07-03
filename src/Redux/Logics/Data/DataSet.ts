import dynamize, { dynaSchemaCreator } from "./Dynamizr";
import { ReturnedDatumInfoType } from "../Types/API/ReturnedDatumInfoType";
import { PairOfObject } from "../HelperType/PairOfObject";
import { DataSetsObject } from "../Types/StoredObject/Service/DataSet/DataSetObject";
import { UnexpectedDataKey } from "../../Exceptions";

export default class DataSet {
    private readonly _receivedDataInfo: PairOfObject<ReturnedDatumInfoType>;

    constructor(source: DataSetsObject) {
        this._receivedDataInfo = {};
        const keys = Object.keys(source);
        for (const key of keys) {
            if (key) {
                this._receivedDataInfo[key] = dynaSchemaCreator(source[key]!.schemaDef);
            }
        }
    }

    public normalize(key: string, data: any): any {
        if (!this._receivedDataInfo[key]) {
            throw UnexpectedDataKey;
        }
        return dynamize(this._receivedDataInfo[key]!, data);
    }
}
