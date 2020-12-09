import * as React from "react";
import { styled } from "../../Theme";
import { Column, ColumnProps } from "./Column";
import { StoreType } from "../../Redux/Store/StoreType";
import { useSelector } from "react-redux";

export interface ColumnsProps {
    tabId: string;
    handleUpdate: (result: ColumnProps[]) => void;
}

const Styled = {
    Container: styled.main`
        display: flex;
        justify-content: flex-start;
        height: 100%;
        overflow: auto;
    `,
};

export const Columns: React.FC = () => {
    const columns = useSelector((store: StoreType) => store.dataStore?.columns ?? []);

    return columns.map((v) => <Column key={v.id} column={v} />);
};

/*

    return (
        <DragDropContext
            onBeforeDragStart={handleBeforeDragStart}
            onDragStart={handleDragStart}
            onDragUpdate={handleDragUpdate}
            onDragEnd={handleDragEnd}
        >
            <Droppable droppableId={props.tabId} direction="horizontal">
                {(provided) => (
                    <Styled.Container ref={provided.innerRef} {...provided.droppableProps}>
                        {columns.map((v, i) => (
                            <Draggable key={v.uiColumnAttr.column} index={i} draggableId={v.uiColumnAttr.column}>
                                {(provided) => (
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
*/
