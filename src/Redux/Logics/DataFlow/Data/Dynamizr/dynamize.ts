import { ReturnedDatumInfoType } from "../../Types/ReturnedDatumInfoType";
import { transformer } from "./Functions/transformer";

export default (schemaData: ReturnedDatumInfoType, data: any) => {
    return transformer(schemaData, data);
};
