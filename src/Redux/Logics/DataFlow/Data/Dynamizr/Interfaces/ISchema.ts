import { TransformData } from "./TransformData";
import { schemaTypes } from "../../../Types/SchemaTypes";

export interface ISchema {
    target?: string;
    errorCheckParam?: string;
    schema: IDynaSchemaElement | IFlatSchemaElement;
}

export interface IRecursiveSchema {
    [key: string]: IDynaSchemaElement | IFlatSchemaElement;
}

export enum SchemaElementType {
    dyna = "dyna",
    flat = "flat",
}

interface ISchemaElementBase {
    elementType: SchemaElementType;
    definition?: IRecursiveSchema;
    transform: TransformData;
}

export interface IDynaSchemaElement extends ISchemaElementBase {
    name: string;
    type: schemaTypes;
    idAttribute?: string;
}

export interface IFlatSchemaElement extends ISchemaElementBase {
    name: string;
}

export type SchemaElement = IDynaSchemaElement | IFlatSchemaElement;
