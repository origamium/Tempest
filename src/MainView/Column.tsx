import React, { createContext } from "react";
import { styled } from "@styled";
import { Paper } from "@material-ui/core";
import { PaperProps } from "@material-ui/core/Paper";
import { IUICommonAttribuite, IUser } from "@tsuruclient/datatype";
import { Header } from "./ColumnHeader/Header";
import { progressStatus } from "./ColumnHeader/StatusColorBar";

export interface IColumnProps extends IUICommonAttribuite {
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

const ColumnAttrContextSkeleton: IUICommonAttribuite = {
    account: "0",
    column: "0"
};
export const ColumnAttrContext = createContext<IUICommonAttribuite>(ColumnAttrContextSkeleton);
const ColumnAttrProvider = ColumnAttrContext.Provider;

export const OwnerContextSkeleton: IUser = {
    id: "0"
};
export const OwnerContext = createContext<IUser>(OwnerContextSkeleton);
const OwnerContextProvider= OwnerContext.Provider;

const _Column: React.FC<IColumnProps> = (props: IColumnProps) => {
    return (
        <Styled.Root width={props.width}>
            <Styled.Paper>
                <ColumnAttrProvider value={{account: props.account, column: props.column}}>
                    <OwnerContextProvider value={props.owner} >
                        <Header columnName={props.name} status={props.status} />
                        <main />
                    </OwnerContextProvider>
                </ColumnAttrProvider>
            </Styled.Paper>
        </Styled.Root>
    );
};

export const Column = React.memo(_Column);
