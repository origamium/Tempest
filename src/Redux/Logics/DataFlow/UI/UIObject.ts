import { ColumnControlObject } from "./ColumnControl";
import { MuteControlObject } from "./MuteControl";
import { TabControlObject } from "./TabControl";

export type UIObject = {
    tabs: TabControlObject;
    columns: ColumnControlObject[];
    mutes: MuteControlObject;
};
