import React from "react";
import { styled } from "@styled";
import { Toolbar } from "@material-ui/core";
import { Title } from "./Title";
import { progressStatus, StatusColorBar } from "./StatusColorBar";

export interface HeaderProps {
    columnName: string;
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
            <Toolbar>
                <Title columnName={props.columnName} />
            </Toolbar>
            <StatusColorBar status={props.status} />
        </Styled.Root>
    );
};
