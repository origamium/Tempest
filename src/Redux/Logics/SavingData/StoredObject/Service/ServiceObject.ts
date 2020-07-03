import { APISetObject } from "./ApiSet/APISetObject";
import { DataSetsObject } from "./DataSet/DataSetObject";
import { PairOfObject } from "../../../HelperType/PairOfObject";

export type ServiceObject = {
    serviceName: string; // is equal key
    apiSet: APISetObject;
    dataSet: DataSetsObject;
};

// key is Service Name. e.g. 'twitter', 'slack', 'mastodon'.
export type Services = PairOfObject<ServiceObject>;
