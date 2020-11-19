import { APISet, APISetControl } from "../API/APISet";
import { APISetsObject } from "./ApiSet/APISetObject";
import { PairOfObject, UndefinedablePairOfObject } from "../../HelperType/PairOfObject";
import { DataSetControl, DataSetsObject } from "../Data/DataSetControl";
import { Exportable } from "../../HelperType/Exportable";
import { ISolvedData } from "../Data/Dynamizr/Interfaces/ISolvedData";

export type ServiceObject = {
    serviceKey: string; // is equal key
    serviceName: string;
    apiSet: APISetsObject;
    dataSet: DataSetsObject;
    officialKey?: string;
};

// key is Service Name. e.g. 'twitter', 'slack', 'mastodon'.
export type Services = UndefinedablePairOfObject<ServiceObject>;

export class Service implements Exportable<ServiceObject> {
    private readonly _serviceKey: string;
    private readonly _serviceName: string;
    private readonly _apiSet: APISetControl;
    private readonly _dataSet: DataSetControl;

    constructor({ source, officialServiceKey }: { source: ServiceObject; officialServiceKey?: unknown }) {
        this._serviceKey = source.serviceKey;
        this._serviceName = source.serviceName;
        this._apiSet = new APISetControl(source.apiSet);
        this._dataSet = new DataSetControl(source.dataSet);
    }

    get serviceKey() {
        return this._serviceKey;
    }

    get serviceName() {
        return this._serviceName;
    }

    public getApiSet(key: string): APISet | undefined {
        return this._apiSet.getAPI(key);
    }

    public parseResponse<T>(api: APISet, response: Response): Promise<T> {
        return new Promise((resolve, reject) => {
            api.dataKey ? resolve(this._dataSet.parseResponseData<T>(api.dataKey, response)) : reject();
        });
    }

    export(): ServiceObject {
        return {
            serviceKey: this._serviceKey,
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

    public getServices(): { key: string; name: string }[] {
        return Object.values(this._services).map((v) => ({ key: v.serviceKey, name: v.serviceName }));
    }

    public getService(key: string): Service | undefined {
        return this._services[key];
    }

    export(): Services {
        return Object.entries(this._services).reduce((accm, [key, value]) => ({ ...accm, [key]: value.export() }), {});
    }
}
