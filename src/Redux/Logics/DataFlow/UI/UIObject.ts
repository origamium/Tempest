import { ColumnControlObject } from "./ColumnControl";
import { MuteControlObject } from "./MuteControl";
import { TabControlObject } from "./TabControl";
import { PageControlObject } from "./PageControl";

export type UIObject = {
    page: PageControlObject;
    tabs: TabControlObject[];
    columns: ColumnControlObject[];
    mutes: MuteControlObject;
};
