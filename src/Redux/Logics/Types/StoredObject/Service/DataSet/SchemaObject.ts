import { schemaTypes } from "../../../../Enums/SchemaTypes";
import { ITransform } from "../../../../Data/Dynamizr/Interfaces/ITransform";
import { PairOfObject } from "../../../../HelperType/PairOfObject";

export type SchemaObjectElement = {
    name: string; // equal key
    type: schemaTypes;
    idAttribute: string;
    transform: ITransform;
    definition?: PairOfObject<SchemaObject>;
};

export type SchemaObject = SchemaObjectElement;
