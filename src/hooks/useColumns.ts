import { useCallback } from "react";
import { DragStart, DragUpdate, DropResult, ResponderProvided } from "react-beautiful-dnd";
import { useSelector } from "react-redux";
import { StoreType } from "../Redux/Store/StoreType";

export const useColumns = () => {
    const columns = useSelector((store: StoreType) => store.dataStore?.columns ?? []);
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

            // updateColumns(resultArr);
        },
        [columns]
    );

    return {
        columns,
        handleBeforeDragStart,
        handleDragStart,
        handleDragUpdate,
        handleDragEnd,
    };
};
