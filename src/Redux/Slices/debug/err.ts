import { debugIdentifier } from "./index";

export interface errActionType {
    type: debugIdentifier.ERR;
    payload: {
        message?: string;
    };
}

export const errAction = (message?: string): errActionType => ({
    type: debugIdentifier.ERR,
    payload: {
        message,
    },
});
