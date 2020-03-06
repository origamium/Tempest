import { createContext, useCallback, useContext } from "react";
import { DragStart, DragUpdate, DropResult, ResponderProvided } from "react-beautiful-dnd";
import { ColumnProps } from "../MainView/Column";

export const ColumnDataContext = createContext<undefined | ColumnProps[]>(undefined);
export const ColumnDataProvider = ColumnDataContext.Provider;

export const useColumnDataCtx = (): ColumnProps[] => {
    const ctx = useContext(ColumnDataContext);
    if (!ctx) throw new Error("Not children of DataContext.Provider");
    return ctx;
};

export const useColumns = () => {
    const handleBeforeDragStart = useCallback((initial: DragStart) => {
        /*...*/
    }, []);

    const handleDragStart = useCallback((initial: DragStart, provided: ResponderProvided) => {
        /*...*/
    }, []);

    const handleDragUpdate = useCallback((initial: DragUpdate, provided: ResponderProvided) => {
        /*...*/
    }, []);

    const handleDragEnd = useCallback((result: DropResult, provided: ResponderProvided) => {
        handleUpdate(result.source);
    }, []);

    return {
        handleBeforeDragStart,
        handleDragStart,
        handleDragUpdate,
        handleDragEnd
    };
};
