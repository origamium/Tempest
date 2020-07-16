import { debugIdentifier } from "./index";

export interface inDevelopmentActionType {
    type: debugIdentifier.IN_DEVELOPMENT;
    payload: {
        target: string;
        message?: string;
    };
}

export const inDevelopmentAction = ({
    target,
    message,
}: {
    target: string;
    message?: string;
}): inDevelopmentActionType => {
    console.warn(`${target} is'nt implemented. \n ${message}`);
    return {
        type: debugIdentifier.IN_DEVELOPMENT,
        payload: {
            target,
            message,
        },
    };
};
