import { normalize } from "normalizr";
import transformer from "./Functions/transformer";
import { ReturnedDatumInfoType } from "../../Types/ReturnedDatumInfoType";

export default (schemaData: ReturnedDatumInfoType, data: any) => {
    return transformer(
        schemaData,
        schemaData.normalizrSchema
            ? normalize(
                  schemaData.targetParameterName ? data[schemaData.targetParameterName] : data,
                  schemaData.normalizrSchema
              )
            : data
    );
};
