import React from "react";
import { styled } from "@styled";
import { Toolbar } from "@material-ui/core";
import { Title } from "./Title";
import { progressStatus, StatusColorBar } from "./StatusColorBar";
import { MenuSet } from "./MenuSet";
import { IUICommonAttribuite, IUser, UIAction } from "@tsuruclient/datatype";

export interface HeaderProps {
    uiColumnAttr: IUICommonAttribuite;
    uiActions: UIAction[];
    columnName: string;
    owner: IUser;
    status: progressStatus;
}

const Styled = {
    Root: styled.header`
        user-select: none;
    `
};

export const Header: React.FC<HeaderProps> = (props: HeaderProps) => {
    return (
        <Styled.Root>
            <Toolbar style={{ justifyContent: "space-between" }}>
                <Title owner={props.owner} columnName={props.columnName} />
                <MenuSet uiActions={props.uiActions} uiCommonAttr={props.uiColumnAttr} />
            </Toolbar>
            <StatusColorBar status={props.status} />
        </Styled.Root>
    );
};
