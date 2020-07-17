import { APISet, APISetControl } from "../API/APISet";
import { APIUnitsObject } from "./ApiSet/ApiUnitObject";
import { PairOfObject, UndefinedablePairOfObject } from "../../HelperType/PairOfObject";
import { DataSetControl, DataSetsObject } from "../Data/DataSetControl";
import { ISolvedData } from "../Data/Dynamizr/Interfaces/ISolvedData";
import { Exportable } from "../../HelperType/Exportable";

export type ServiceObject = {
    serviceName: string; // is equal key
    apiSet: APIUnitsObject;
    dataSet: DataSetsObject;
    officialKey?: string;
};

// key is Service Name. e.g. 'twitter', 'slack', 'mastodon'.
export type Services = UndefinedablePairOfObject<ServiceObject>;

export class Service implements Exportable<ServiceObject> {
    private readonly _serviceName: string;
    private readonly _apiSet: APISetControl;
    private readonly _dataSet: DataSetControl;

    constructor({ source, officialServiceKey }: { source: ServiceObject; officialServiceKey?: unknown }) {
        this._serviceName = source.serviceName;
        this._apiSet = new APISetControl(source.apiSet);
        this._dataSet = new DataSetControl(source.dataSet);
    }

    get serviceName() {
        return this._serviceName;
    }

    public getApiSet(key: string): APISet | undefined {
        return this._apiSet[key];
    }

    public dataDynamize(key: string, data: unknown): ISolvedData {
        return this._dataSet.normalize(key, data);
    }

    export(): ServiceObject {
        return {
            serviceName: this._serviceName,
            apiSet: this._apiSet.export(),
            dataSet: this._dataSet.export(),
            officialKey: undefined,
        };
    }
}

export class ServiceControl implements Exportable<Services> {
    private _services: PairOfObject<Service>;

    constructor(source: Services) {
        this._services = Object.entries(source).reduce(
            (accm, [key, source]) => ({ ...accm, [key]: new Service({ source } as { source: ServiceObject }) }),
            {}
        );
    }

    public getService(key: string): Service | undefined {
        return this._services[key];
    }

    export(): Services {
        return Object.entries(this._services).reduce((accm, [key, value]) => ({ ...accm, [key]: value.export() }), {});
    }
}
