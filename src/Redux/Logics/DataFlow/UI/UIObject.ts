import { ColumnControlObject } from "./ColumnControl";
import { MuteControlObject } from "./MuteControl";
import { TabControlObject } from "./TabControl";

export type UIObject = {
    tab: TabControlObject;
    columns: ColumnControlObject[];
    mutes: MuteControlObject;
};
