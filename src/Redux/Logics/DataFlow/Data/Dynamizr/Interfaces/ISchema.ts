import { schemaTypes } from "../../../Types/SchemaTypes";
import { TransformSchema } from "./TransformData";

export interface ISchema {
    target?: string;
    errorCheckParam?: string;
    schema: IRecursiveSchema;
}

export interface IRecursiveSchema {
    [key: string]: SchemaElement;
}

export type SchemaElement = {
    name: string;
    type: schemaTypes;
    idAttribute?: string;
    definition?: ISchema;
    transform: TransformSchema;
};
