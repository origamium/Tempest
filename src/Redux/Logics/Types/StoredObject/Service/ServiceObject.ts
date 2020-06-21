import { ApiSetObject } from "./ApiSet/ApiSetObject";
import { DataSets } from "./DataSet/DataSetObject";
import { PairOfObject } from "../../../HelperType/PairOfObject";

export type ServiceObject = {
    serviceName: string; // is equal key
    apiSet: ApiSetObject;
    dataSet: DataSets;
};

// key is Service Name. e.g. 'twitter', 'slack', 'mastodon'.
export type Services = PairOfObject<ServiceObject>;
