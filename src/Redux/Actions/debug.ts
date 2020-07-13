export enum debugIdentifier {
    DEBUG = "DEBUG",
    IN_DEVELOPMENT = "IN_DEVELOPMENT",
    ERR = "ERR",
}

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
    return {
        type: debugIdentifier.IN_DEVELOPMENT,
        payload: {
            target,
            message,
        },
    };
};

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

export type debugActions = debugActionType | inDevelopmentActionType | errActionType;
