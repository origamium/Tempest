import { normalize } from "normalizr";
import transformer from "./Functions/transformer";
import { ReturnedDatumInfoType } from "../../Types/API/ReturnedDatumInfoType";

export default (schemaData: ReturnedDatumInfoType, data: any) => {
    return transformer(
        schemaData,
        normalize(
            schemaData.targetParameterName ? data[schemaData.targetParameterName] : data,
            schemaData.normalizrSchema
        )
    );
};
