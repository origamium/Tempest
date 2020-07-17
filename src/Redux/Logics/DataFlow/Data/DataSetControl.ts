import dynamize, { dynaSchemaCreator } from "./Dynamizr";
import { ReturnedDatumInfoType } from "../Types/ReturnedDatumInfoType";
import { PairOfObject } from "../../HelperType/PairOfObject";
import { DataSetsObject } from "../Service/DataSet/DataSetObject";
import { UnexpectedDataKey } from "../../../Exceptions";
import { ISolvedData } from "./Dynamizr/Interfaces/ISolvedData";

export default class DataSetControl {
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

    public normalize(key: string, data: any): ISolvedData {
        if (!this._receivedDataInfo[key]) {
            throw UnexpectedDataKey;
        }
        return dynamize(this._receivedDataInfo[key]!, data);
    }
}
