import React from "react";
import { styled } from "@styled";
import { Toolbar } from "@material-ui/core";
import { IUICommonAttribuite, IUser } from "@tsuruclient/datatype";
import { Title } from "./Title";
import { progressStatus, StatusColorBar } from "./StatusColorBar";
import { Form } from "../../Common/Form";

export interface HeaderProps extends IUICommonAttribuite {
    owner: IUser;
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
                <Title {...props} />
            </Toolbar>
            <StatusColorBar status={props.status} />
        </Styled.Root>
    );
};
