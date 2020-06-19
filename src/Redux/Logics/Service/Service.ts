import { APISet } from "../API/APISet";
import DataSet from "../Data/DataSet";
import { ServiceObject } from "../StoredObject/Service/ServiceObject";

export default class Service {
    private readonly _serviceName: string;
    private readonly _apiSet: APISet;
    private readonly _dataSet: DataSet;

    constructor(source: ServiceObject) {
        this._serviceName = source.serviceName;
        this._apiSet = new APISet(source.apiSet);
        this._dataSet = new DataSet(source.dataSet);
    }
}
