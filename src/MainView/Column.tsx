import React from "react";
import { styled } from "@styled";
import { Paper } from "@material-ui/core";
import { PaperProps } from "@material-ui/core/Paper";
import { Header } from "./ColumnHeader/Header";
import { progressStatus } from "./ColumnHeader/StatusColorBar";
import { DraggableProvidedDragHandleProps } from "react-beautiful-dnd";
import { UIAction } from "../datatype/UI/UIAction";
import { IUser } from "../datatype/Contents/User";
import { IUICommonAttribute } from "../datatype/UI/UICommonAttribute";

export interface ColumnProps {
    handle?: DraggableProvidedDragHandleProps;
    uiColumnAttr: IUICommonAttribute;
    columnUiActions: UIAction[];
    name: string;
    owner: IUser;
    status: progressStatus;
    width: number;
}

const Styled = {
    Root: styled.article<{ width: number }>`
        padding: 4px;
        width: ${({ width }) => width}px;
        height: 100%;
    `,
    Paper: styled((props: PaperProps) => <Paper {...props}>{props.children}</Paper>)`
        && {
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            & > header,
            & > footer {
                flex: 0 1 auto;
            }

            & > main {
                height: 100%;
                overflow: auto;
                word-break: break-all;
            }
        }
    `
};

export const Column: React.FC<ColumnProps> = props => {
    const { uiColumnAttr, columnUiActions, width, owner, name, status, handle } = props;
    return (
        <Styled.Root width={width}>
            <Styled.Paper>
                <Header
                    handle={handle}
                    columnName={name}
                    status={status}
                    owner={owner}
                    uiActions={columnUiActions}
                    uiColumnAttr={uiColumnAttr}
                />
                <main />
            </Styled.Paper>
        </Styled.Root>
    );
};
