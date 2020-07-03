import { normalize } from "normalizr";
import transformer from "./Functions/transformer";
import { ReturnedDatumInfoType } from "../../APIType/ReturnedDatumInfoType";

export default (schemaData: ReturnedDatumInfoType, data: any) => {
    return transformer(
        schemaData,
        normalize(
            schemaData.targetParameterName ? data[schemaData.targetParameterName] : data,
            schemaData.normalizrSchema
        )
    );
};
