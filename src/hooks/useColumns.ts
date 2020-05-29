import { createContext, useCallback, useContext } from "react";
import { DragStart, DragUpdate, DropResult, ResponderProvided } from "react-beautiful-dnd";
import { ColumnProps } from "../Component/MainView/Column";

export type ColumnDataContextType = { columns: ColumnProps[]; updateColumns: (columns: ColumnProps[]) => void };
export const ColumnDataContext = createContext<ColumnDataContextType | undefined>(undefined);
export const ColumnDataProvider = ColumnDataContext.Provider;

export const useColumnDataCtx = (): ColumnDataContextType => {
    const ctx = useContext(ColumnDataContext);
    if (!ctx) throw new Error("Not children of DataContext.Provider");
    return ctx;
};

export const useColumns = () => {
    const { columns, updateColumns } = useColumnDataCtx();
    const handleBeforeDragStart = useCallback((initial: DragStart) => {
        /*...*/
    }, []);

    const handleDragStart = useCallback((initial: DragStart, provided: ResponderProvided) => {
        /*...*/
    }, []);

    const handleDragUpdate = useCallback((initial: DragUpdate, provided: ResponderProvided) => {
        /*...*/
    }, []);

    const handleDragEnd = useCallback(
        (result: DropResult, provided: ResponderProvided) => {
            if (!result.destination || result.destination.index === result.source.index) return;
            const resultArr = [...columns];
            const [removed] = resultArr.splice(result.source.index, 1);
            resultArr.splice(result.destination.index, 0, removed);

            updateColumns(resultArr);
        },
        [columns, updateColumns]
    );

    return {
        columns,
        handleBeforeDragStart,
        handleDragStart,
        handleDragUpdate,
        handleDragEnd,
    };
};
