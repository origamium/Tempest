import React, { useCallback } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { styled } from "@styled";
import { Column, ColumnProps } from "./Column";

export interface ColumnsProps {
    tabId: string;
    columns: ColumnProps[];
}

const Styled = {
    Container: styled.main`
        height: 100%;
        overflow: auto;
        display: flex;
        justify-content: flex-start;
    `
};

export const Columns = (props: ColumnsProps) => {
    const handleBeforeDragStart = useCallback(() => {
        /*...*/
    }, []);

    const handleDragStart = useCallback(() => {
        /*...*/
    }, []);

    const handleDragUpdate = useCallback(() => {
        /*...*/
    }, []);

    const handleDragEnd = useCallback(() => {
        // the only one that is required
    }, []);

    return (
        <DragDropContext
            onBeforeDragStart={handleBeforeDragStart}
            onDragStart={handleDragStart}
            onDragUpdate={handleDragUpdate}
            onDragEnd={handleDragEnd}
        >
            <Droppable droppableId={props.tabId} direction="horizontal">
                {provided => (
                    <Styled.Container ref={provided.innerRef} {...provided.droppableProps}>
                        {props.columns.map((v, i) => (
                            <Draggable key={v.uiColumnAttr.column} index={i} draggableId={v.uiColumnAttr.column}>
                                {provided => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        style={{ ...provided.draggableProps.style }}
                                    >
                                        <Column handle={provided.dragHandleProps} {...v} />
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </Styled.Container>
                )}
            </Droppable>
        </DragDropContext>
    );
};
