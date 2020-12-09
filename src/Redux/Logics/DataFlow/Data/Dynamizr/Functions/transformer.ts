import { ReturnedDatumInfoType } from "../../../Types/ReturnedDatumInfoType";
import { TransformArraySchema, TransformSchema, TransformObjectSchema } from "../Interfaces/TransformData";

const arrayOrObject = (v: Array<any> | Object): [] | {} => (Array.isArray(v) ? [] : {});

const addValue = (source: any, value: any, isArray: boolean): any =>
    isArray ? [...source, value] : { ...source, ...value };

export const _reduceArray = (schemaValue: TransformArraySchema[], target: Array<any>) => {
    const schema = schemaValue[0]!;
    return { [schema._key]: target.map((v) => _reduce({}, schema.schema, v)) };
};

export const _reduceObject = (accumulator: any, schemaValue: TransformObjectSchema, target: any) => {
    if (typeof schemaValue._key === "string") {
        return { ...accumulator, [schemaValue._key]: _reduce(accumulator, schemaValue.schema, target) };
    } else {
        return Object.entries(schemaValue).reduce((innerAccm, [innerSchemaKey, innerSchemaValue]) => {
            return _reduce(innerAccm, innerSchemaValue, target[innerSchemaKey]);
        }, {});
    }
};

export const _reduce = (accumulator: any, schemaValue: TransformSchema, target: any) => {
    if (Array.isArray(schemaValue)) {
        return addValue(accumulator, _reduceArray(schemaValue, target), false);
    } else if (typeof schemaValue === "object") {
        return _reduceObject(accumulator, schemaValue, target);
    } else {
        return addValue(accumulator, { [schemaValue]: target }, false);
    }
};

export const simplyTransformer = (schema: TransformSchema, target: any) =>
    _reduce(arrayOrObject(target), schema, target);

export const transformer = (dynaSchemaData: ReturnedDatumInfoType, target_: any): any => {
    const schema = dynaSchemaData.transformerSchema;
    const targetIsArray = Array.isArray(dynaSchemaData.transformerSchema);
    const target = dynaSchemaData.targetParameterName ? target_[dynaSchemaData.targetParameterName] : target_;

    const result = _reduce(arrayOrObject(targetIsArray), schema, target);

    if (result["_root"]) {
        return result._root;
    } else {
        return result;
    }
};
