import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { StoreType } from "../../Store/StoreType";
import { Merge } from "type-fest";
import { TabObject } from "../../Logics/DataFlow/UI/TabControl";
import { ColumnControl } from "../../Logics/DataFlow/UI/ColumnControl";
import { notEmpty } from "../../../Utility/notEmpty";

const tabs = (state: StoreType) => state.dataStore?.tabs;
const columns = (state: StoreType) => state.dataStore?.columns;

export type ColumnFilledTabArray = Array<Merge<TabObject, { column: ColumnControl[] }>>;

const getTab = createSelector(
    tabs,
    columns,
    (tab, column): ColumnFilledTabArray => {
        return (
            tab?.tabArray.map((v) => ({
                ...v,
                column: v.columns.map((t) => column?.find((c) => c.id === t)).filter(notEmpty),
            })) ?? []
        );
    }
);

const getSelectedTabIndex = createSelector(tabs, (tab) => {
    return tab?.selected || 0;
});

export const useTab = () => {
    const tab = useSelector(getTab);
    const selectedIndex = useSelector(getSelectedTabIndex);
    return { tab, selectedIndex };
};
