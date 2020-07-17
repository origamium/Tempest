import { ApiParameterMethods } from "./ApiParameterMethods";

export interface APIParameterDefType {
    [key: string]:
        | {
              required: boolean;
              type: ApiParameterMethods;
          }
        | undefined;
}
