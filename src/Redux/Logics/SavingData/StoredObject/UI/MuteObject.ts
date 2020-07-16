import { MuteEnumType } from "../../../DataFlow/Enums/MuteEnumType";

export type MuteCommonObject = {
    type: MuteEnumType;
    id: string;
    name: string;
};

export type MuteWordElementObject = {
    type: MuteEnumType.word;
    isRegex: boolean;
    inverse: boolean;
    muteWord: string;
} & MuteCommonObject;

export type MuteUserElementObject = {
    type: MuteEnumType.user;
    inverse: boolean;
    targetId: string[];
} & MuteCommonObject;

export type MuteObject = {
    [id: string]: MuteWordElementObject | MuteUserElementObject;
};
