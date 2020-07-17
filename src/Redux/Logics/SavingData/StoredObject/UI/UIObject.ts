import { PageObject } from "./PageObject";
import { TabObject } from "./TabObject";
import { ColumnObject } from "./ColumnObject";
import { MuteObject } from "./MuteObject";

export type UIObject = {
    page: PageObject;
    tabs: TabObject[];
    columns: ColumnObject[];
    mutes: MuteObject;
}
