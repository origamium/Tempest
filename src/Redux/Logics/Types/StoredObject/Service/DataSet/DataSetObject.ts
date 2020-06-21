import { SchemaObject } from "./SchemaObject";
import { PairOfObject } from "../../../../HelperType/PairOfObject";

export type DataSetObject = {
    key: string;
    targetDataKey?: string;
    extendErrorKey?: string;
    schema: SchemaObject;
};

export type DataSets = PairOfObject<DataSetObject>;
