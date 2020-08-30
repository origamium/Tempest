import { debugActionType } from "./debug";
import { inDevelopmentActionType } from "./inDevelopmentAction";
import { errActionType } from "./err";

export enum debugIdentifier {
    DEBUG = "DEBUG",
    IN_DEVELOPMENT = "IN_DEVELOPMENT",
    ERR = "ERR",
}

export type debugActions = debugActionType | inDevelopmentActionType | errActionType;
