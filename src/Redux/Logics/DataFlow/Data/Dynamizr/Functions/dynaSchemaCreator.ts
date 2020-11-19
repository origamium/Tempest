import { schema } from "normalizr";
import { UnsupportedSchemaType } from "../Exceptions";
import {
    IRecursiveSchema,
    ISchema,
    IDynaSchemaElement,
    IFlatSchemaElement,
    SchemaElement,
} from "../Interfaces/ISchema";
import { schemaTypes } from "../../../Types/SchemaTypes";
import { ReturnedDatumInfoType } from "../../../Types/ReturnedDatumInfoType";

// --- normalizr schema creator ----
const entityCreator = (schemaData: IDynaSchemaElement) =>
    new schema.Entity(
        schemaData.name,
        schemaData.definition ? reCreateSchema(schemaData.definition) : {},
        schemaData.idAttribute ? { idAttribute: schemaData.idAttribute } : {}
    );

const reCreateSchema = (schemaData: IRecursiveSchema) =>
    Object.keys(schemaData)
        .map((key) => ({
            name: key,
            schema: schemaCreator(schemaData[key]),
        }))
        .reduce(
            (accu, curr) => ({
                ...accu,
                [curr.name]: curr.schema,
            }),
            {}
        );

const schemaCreator = (
    schemaData: IDynaSchemaElement | IFlatSchemaElement
): schema.Array<any> | schema.Entity<any> | undefined => {
    // eslint-disable-next-line no-case-declarations
    const data = schemaData as IDynaSchemaElement;
    switch (data.type) {
        case schemaTypes.Entity:
            return entityCreator(data);
        case schemaTypes.Array:
            return new schema.Array(entityCreator(data));
        default:
            throw UnsupportedSchemaType;
    }
};
// --- end of normalizr schema creator ---

// --- transform ---
const pickupTransformAttr = (schemaData: SchemaElement, root = {}) => {
    const definition = schemaData.definition;
    if (definition) {
        Object.keys(definition).forEach((key) => pickupTransformAttr(definition[key], root));
    }
    return Object.assign(
        root,
        schemaData.name
            ? { [schemaData.name]: schemaData.transform }
            : Object.keys(schemaData.transform).reduce(
                  (accm, curr) => ({ ...accm, [curr]: { target: schemaData.transform[curr] } }),
                  {}
              )
    );
};

export default (schemaData: ISchema): ReturnedDatumInfoType => ({
    normalizrSchema: schemaCreator(schemaData.schema),
    transformerSchema: pickupTransformAttr(schemaData.schema),
    targetParameterName: schemaData.target, // undefinedable and nullable
    extendErrorCheck: schemaData.errorCheckParam, // undefinedable and nullable
});
