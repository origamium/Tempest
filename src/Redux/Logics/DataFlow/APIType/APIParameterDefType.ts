import { ApiParameterMethods } from "../Enums/ApiParameterMethods";

export interface APIParameterDefType {
    [key: string]:
        | {
              required: boolean;
              type: ApiParameterMethods;
          }
        | undefined;
}
