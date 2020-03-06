import React from "react";
import { styled } from "@styled";
import { Toolbar } from "@material-ui/core";
import { Title } from "./Title";
import { progressStatus, StatusColorBar } from "./StatusColorBar";
import { MenuSet } from "./MenuSet";
import { DraggableProvidedDragHandleProps } from "react-beautiful-dnd";
import { UIAction } from "../../datatype/UI/UIAction";
import { IUser } from "../../datatype/Contents/User";
import { IUICommonAttribute } from "../../datatype/UI/UICommonAttribute";

export interface HeaderProps {
    handle?: DraggableProvidedDragHandleProps | {};
    uiColumnAttr: IUICommonAttribute;
    uiActions: UIAction[];
    columnName: string;
    owner: IUser;
    status: progressStatus;
}

const Styled = {
    Root: styled.header`
        user-select: none;
        position: relative;
    `,
    DragHandle: styled.div`
        position: absolute;
        left: 4px;
        top: 4px;
        width: 8px;
        height: 56px;
        background-color: darkgray;
        border-radius: 2px;
    `
};

export const Header: React.FC<HeaderProps> = props => {
    return (
        <Styled.Root>
            <Toolbar style={{ justifyContent: "space-between" }}>
                <Title owner={props.owner} columnName={props.columnName} />
                <MenuSet uiActions={props.uiActions} uiCommonAttr={props.uiColumnAttr} />
            </Toolbar>
            <StatusColorBar status={props.status} />
            <Styled.DragHandle {...props.handle} />
        </Styled.Root>
    );
};

Header.defaultProps = {
    handle: {}
}
