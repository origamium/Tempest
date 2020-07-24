import { createContext, useContext } from "react";
import { TabProps } from "@material-ui/core";
import { ColumnProps } from "react-virtualized";

export type TabDataContextType = { columns: TabProps[]; insertColumns: (columns: ColumnProps[]) => void };
export const TabDataContext = createContext<TabDataContextType | undefined>(undefined);
export const TabDataProvider = TabDataContext.Provider;

export const useColumnDataCtx = (): TabDataContextType => {
    const ctx = useContext(TabDataContext);
    if (!ctx) throw new Error("Not children of DataContext.Provider");
    return ctx;
};
