import React, { useCallback } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { IUICommonAttribuite } from "@tsuruclient/datatype";
import { styled } from "@styled";
// import { Column } from "./Column";

interface ColumnsProps {
    tabId: string;
    columns: IUICommonAttribuite[];
}

const Styled = {
    Container: styled.main`
        height: 100%;
        overflow: auto;
        display: flex;
        justify-content: flex-start;
    `,
    Item: styled.div`
        user-select: none;
        margin: 0 4px;
        padding: 4px 0;
        background-color: gray;
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
                {(provided, snapshot) => (
                    <Styled.Container ref={provided.innerRef} {...provided.droppableProps}>
                        {props.columns.map((v, i) => (
                            <Draggable key={v.column} index={i} draggableId={v.column}>
                                {(provided, snapshot) => (
                                    <Styled.Item
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        style={{ ...provided.draggableProps.style }}
                                    >
                                        {v.column}
                                    </Styled.Item>
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
