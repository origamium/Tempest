import * as qs from "querystring";
import dynamize, { dynaSchemaCreator } from "./Dynamizr";
import { ReturnedDatumInfoType } from "../Types/ReturnedDatumInfoType";
import { PairOfObject, UndefinedablePairOfObject } from "../../HelperType/PairOfObject";
import { UnexpectedDataKey } from "../../../Exceptions";
import { ISolvedData } from "./Dynamizr/Interfaces/ISolvedData";
import { ISchema } from "./Dynamizr/Interfaces/ISchema";
import { Exportable } from "../../HelperType/Exportable";

export enum DataFormat {
    json = "json",
    qs = "querystring",
}

export type DataSetObject = {
    key: string;
    targetDataKey?: string;
    extendErrorKey?: string;
    schemaDef: ISchema;
    dataFormat?: DataFormat; // default as json
};

export type DataSetsObject = UndefinedablePairOfObject<DataSetObject>;

export class DataSetControl implements Exportable<DataSetsObject> {
    private readonly _receivedDataInfo: PairOfObject<{ schema: ReturnedDatumInfoType; format: DataFormat }>;
    private readonly _source: DataSetsObject;

    constructor(source: DataSetsObject) {
        this._receivedDataInfo = {};
        this._source = source;
        const keys = Object.keys(source);
        for (const key of keys) {
            if (key) {
                const dataInfo = source[key];
                if (dataInfo) {
                    this._receivedDataInfo[key] = {
                        schema: dynaSchemaCreator(dataInfo.schemaDef),
                        format: dataInfo.dataFormat ?? DataFormat.json,
                    };
                }
            }
        }
    }

    public async parseResponse<T = any>(key: string, res: Response): Promise<ISolvedData<T>> {
        const dataInfo = this._receivedDataInfo[key];

        if (!dataInfo) {
            throw UnexpectedDataKey;
        }

        if (!res.ok) {
            // error response parse
            await Promise.reject({ status: res.status, statusText: res.statusText });
        }

        switch (dataInfo.format) {
            case DataFormat.qs:
                return { entities: (qs.parse(await res.text()) as any) as T }; // OH MY GOD
            case DataFormat.json:
            default:
                return dynamize(dataInfo.schema, await res.json());
        }
    }

    export(): DataSetsObject {
        return this._source;
    }
}
