import { ApiParameterMethods } from "../../Enums/ApiParameterMethods";

export interface APIParameterDefType {
    [key: string]:
        | {
              required: boolean;
              type: ApiParameterMethods;
              extendPath?: string; // only in sandwitch parameter, i.e. ~/:id/extend...
          }
        | undefined;
}
