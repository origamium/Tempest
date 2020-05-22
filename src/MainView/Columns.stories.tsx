import * as React from "react";
import { ColumnProps } from "./Column";
import { User1, User2 } from "../__testdata__/User";
import { progressStatus } from "./ColumnHeader/StatusColorBar";
import { Columns } from "./Columns";
import { action } from "@storybook/addon-actions";
import { ColumnDataProvider } from "../hooks/useColumns";

export default {
    title: "Column|Columns",
    component: Columns,
};

const UICAttrList: ColumnProps[] = [
    {
        uiColumnAttr: { column: "32890930209", account: "230092309238023" },
        columnUiActions: [],
        name: "Home string",
        owner: User1,
        status: progressStatus.streaming,
        width: 320,
    },
    {
        uiColumnAttr: { column: "3289099", account: "230092309238023" },
        columnUiActions: [],
        name: "Home string 2",
        owner: User1,
        status: progressStatus.streaming,
        width: 320,
    },
    {
        uiColumnAttr: { column: "893189231", account: "230092309238023" },
        columnUiActions: [],
        name: "Civilization VI",
        owner: User2,
        status: progressStatus.streaming,
        width: 320,
    },
];

export const Basic: React.FC = () => {
    const [columns, setColumns] = React.useState<ColumnProps[]>(UICAttrList);
    return (
        <ColumnDataProvider
            value={{
                columns,
                updateColumns: setColumns,
            }}
        >
            <Columns tabId={"83832859950909209"} handleUpdate={action("column update")} />
        </ColumnDataProvider>
    );
};
