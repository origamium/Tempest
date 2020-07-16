import { debugIdentifier } from "./index";

export interface debugActionType {
    type: debugIdentifier.DEBUG;
    payload: {
        message?: string;
    };
}

export const debugAction = (message?: string): debugActionType => ({
    type: debugIdentifier.DEBUG,
    payload: {
        message,
    },
});
