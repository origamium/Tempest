import { ColumnObject } from "./ColumnControl";
import { MuteObject } from "./MuteControl";
import { TabObject } from "./TabControl";
import { PageObject } from "./PageControl";

export type UIObject = {
    page: PageObject;
    tabs: TabObject[];
    columns: ColumnObject[];
    mutes: MuteObject;
};
