import React from "react";
import { styled } from "../../Theme";
import { Paper } from "@material-ui/core";
import { PaperProps } from "@material-ui/core/Paper";
import { Header } from "./ColumnHeader/Header";
import { progressStatus } from "./ColumnHeader/StatusColorBar";
import { ColumnControl } from "../../Redux/Logics/DataFlow/UI/ColumnControl";
import { useDispatch, useSelector } from "react-redux";
import { requestRESTAction } from "../../Redux/Slices/requests/REST";
import { StoreType } from "../../Redux/Store/StoreType";
import { DataPoolControl } from "../../Redux/Logics/DataFlow/Contents/DataPoolControl";
import { ContentList } from "./ContentList";
import { DraggableProvidedDragHandleProps } from "react-beautiful-dnd";
import { Form } from "../Common/Form";

export interface ColumnProps {
    column: ColumnControl;
    handle?: DraggableProvidedDragHandleProps;
}

const Styled = {
    Root: styled.article<{ width: number }>`
        width: ${({ width }) => width}px;
        height: 100%;
        padding: 4px;
    `,
    Paper: styled((props: PaperProps) => <Paper {...props}>{props.children}</Paper>)`
        && {
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            width: 100%;
            height: 100%;
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
    `,
};

export const Column: React.FC<ColumnProps> = ({ column }) => {
    const name = column.name;
    const store = useSelector((store: StoreType) => store.dataStore);
    const dispatch = useDispatch();
    const updateColumn = React.useCallback(() => {
        const sourceElement = column.sourceElement;
        sourceElement.forEach((v) => {
            if (store) {
                const account = store.account.getAccount(v.accountKey);
                if (account) {
                    dispatch(requestRESTAction(v.accountKey, account.service, account.provider, v.uiAction, {}));
                }
            }
        }, []);
    }, [column.sourceElement, dispatch, store]);

    const contents = React.useMemo(() => {
        const todoContent = column.sourceElement[0];
        const datapool =
            store?.datapool.getContent(
                DataPoolControl.generateKeyFromUIElement(todoContent.uiAction, todoContent.accountKey),
            ) || [];
        return { articles: datapool, column: column.id, account: todoContent.accountKey };
    }, [column.id, column.sourceElement, store?.datapool]);

    const isSingleOwner = React.useMemo(() => column.accountId.length <= 1, [column.accountId.length]);

    return (
        <Styled.Root width={320}>
            <Styled.Paper>
                <Header
                    handle={{}}
                    columnName={name}
                    status={progressStatus.none}
                    uiActions={[]}
                    updateAllContent={updateColumn}
                />
                {isSingleOwner && <Form handleClickReply={() => {}} requestPost={() => {}} registerColumn={() => {}} />}
                <ContentList {...contents} />
            </Styled.Paper>
        </Styled.Root>
    );
};
