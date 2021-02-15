import * as React from "react";
import { styled } from "../../Theme";
import { Column } from "./Column";
import { useColumns } from "../../hooks/useColumns";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

export type ColumnsProps = {
    tabId: string;
    handleUpdate: () => void;
};

const Styled = {
    Container: styled.main`
        display: flex;
        justify-content: flex-start;
        height: 100%;
        overflow: auto;
    `,
};

export const Columns: React.FC<ColumnsProps> = ({ tabId, handleUpdate }) => {
    const { columns, handleBeforeDragStart, handleDragEnd, handleDragStart, handleDragUpdate } = useColumns();

    return (
        <DragDropContext
            onBeforeDragStart={handleBeforeDragStart}
            onDragStart={handleDragStart}
            onDragUpdate={handleDragUpdate}
            onDragEnd={handleDragEnd}
        >
            <Droppable droppableId={tabId} direction="horizontal">
                {(provided) => (
                    <Styled.Container ref={provided.innerRef} {...provided.droppableProps}>
                        {columns.map((v, i) => (
                            <Draggable key={v.id} index={i} draggableId={v.id}>
                                {(provided) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        style={{ ...provided.draggableProps.style }}
                                    >
                                        <Column handle={provided.dragHandleProps} column={v} />
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
