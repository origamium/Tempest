import { APISet } from "../API/APISet";
import DataSet from "../Data/DataSet";
import { ServiceObject } from "../../SavingData/StoredObject/Service/ServiceObject";
import { APISetObject } from "../../SavingData/StoredObject/Service/ApiSet/APISetObject";

export class ServiceControl {
    private readonly _serviceName: string;
    private readonly _apiSet: APISetObject;
    private readonly _dataSet: DataSet;

    constructor(source: ServiceObject) {
        this._serviceName = source.serviceName;
        this._apiSet = new APISet(source.apiSet.apis);
        this._dataSet = new DataSet(source.dataSet);
    }
}
