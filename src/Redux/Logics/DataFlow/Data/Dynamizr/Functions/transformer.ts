import { UnexpectedFormatType } from "../Exceptions";
import { ISolvedData } from "../Interfaces/ISolvedData";
import { ITransform } from "../Interfaces/ITransform";
import { ReturnedDatumInfoType } from "../../../Types/ReturnedDatumInfoType";

const dataTransform = (format: any, target: any): any => {
    switch (typeof format) {
        case "string":
            return target[format];
        case "object":
            return Object.keys(format)
                .map((key) => ({ key, data: dataTransform(format[key], target) }))
                .reduce((accm, curr) => ({ ...accm, [curr.key]: curr.data }), {});
        default:
            throw UnexpectedFormatType;
    }
};

const transform = (format: ITransform, target: any) => {
    return Object.keys(target)
        .map((itemKey) => ({
            itemKey,
            data: Object.keys(target[itemKey])
                .map((id) => ({
                    id,
                    data: dataTransform(format[itemKey], target[itemKey][id]),
                }))
                .reduce((accm, curr) => ({ ...accm, [curr.id]: curr.data }), {}),
        }))
        .reduce((accm, curr) => ({ ...accm, [curr.itemKey]: curr.data }), {});
};

export default (dynaSchemaData: ReturnedDatumInfoType, target: any): ISolvedData =>
    dynaSchemaData.normalizrSchema
        ? {
              // TODO: Return Data Definition
              entities: transform(dynaSchemaData.transformerSchema, target.entities),
              result: target.result,
          }
        : { entities: transform(dynaSchemaData.transformerSchema, target.entities ?? target), result: target };
