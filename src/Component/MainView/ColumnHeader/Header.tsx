import React from "react";
import { styled } from "../../../Theme";
import { Toolbar } from "@material-ui/core";
import { Title } from "./Title";
import { progressStatus, StatusColorBar } from "./StatusColorBar";
import { MenuSet } from "./MenuSet";
import { DraggableProvidedDragHandleProps } from "react-beautiful-dnd";
import { IUser } from "../../../datatype/Contents/User";
import { UIActionElement } from "../../../Redux/Logics/DataFlow/UIActions/UIActionControl";

export interface HeaderProps {
    handle?: DraggableProvidedDragHandleProps | {};
    uiActions: UIActionElement[];
    updateAllContent: () => void;
    columnName: string;
    owner?: IUser;
    status: progressStatus;
}

const Styled = {
    Root: styled.header`
        position: relative;
        user-select: none;
    `,
    DragHandle: styled.div`
        position: absolute;
        top: 4px;
        left: 4px;
        width: 8px;
        height: 56px;
        background-color: darkgray;
        border-radius: 2px;
    `,
};

export const Header: React.FC<HeaderProps> = (props) => {
    return (
        <Styled.Root>
            <Toolbar style={{ justifyContent: "space-between" }}>
                <Title columnName={props.columnName} />
                <MenuSet uiActions={props.uiActions} updateAllContent={props.updateAllContent} />
            </Toolbar>
            <StatusColorBar status={props.status} />
            <Styled.DragHandle {...props.handle} />
        </Styled.Root>
    );
};

Header.defaultProps = {
    handle: {},
};
