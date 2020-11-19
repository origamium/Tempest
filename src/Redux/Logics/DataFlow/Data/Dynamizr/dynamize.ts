import { ReturnedDatumInfoType } from "../../Types/ReturnedDatumInfoType";
import { transformer } from "./Functions/transformer";

export const dynamize = (schemaData: ReturnedDatumInfoType, data: any) => {
    return transformer(schemaData, data);
};
