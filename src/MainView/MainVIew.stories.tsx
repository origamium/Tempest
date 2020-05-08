import React from "react";
import { storiesOf } from "@storybook/react";
import { boolean, select } from "@storybook/addon-knobs";
import { Column, ColumnProps } from "./Column";
import { progressStatus, StatusColorBar } from "./ColumnHeader/StatusColorBar";
import { Header } from "./ColumnHeader/Header";
import { User1 } from "../__testdata__/User";
import centered from "@storybook/addon-centered";
import { Columns } from "./Columns";
import { action } from "@storybook/addon-actions";
import { IUICommonAttribute } from "../datatype/UI/UICommonAttribute";

const StoryPrefix = "MainView|";

const height100percent = (story) => (
    <div style={{ height: "100vh", display: "flex", alignItems: "center" }}>{story()}</div>
);

const UIColumnAttribute: IUICommonAttribute = {
    account: "3902047509399",
    column: "82477795091294",
};

const statusBarLabel = "Status";
const statusBarOptions = {
    none: progressStatus.none,
    inProgress: progressStatus.inProgress,
    streaming: progressStatus.streaming,
};
const statusBarDefaultValue = progressStatus.none;

const raiseErrorLabel = "error";

const UICAttrList: ColumnProps[] = [
    {
        uiColumnAttr: { column: "32890930209", account: "230092309238023" },
        columnUiActions: [],
        name: "Home string",
        owner: User1,
        status: progressStatus.streaming,
        width: 320,
    },
];

storiesOf(StoryPrefix + "Columns", module).add("info", () => (
    <Columns tabId={"83832859950909209"} columns={UICAttrList} handleUpdate={action("column update")} />
));

storiesOf(StoryPrefix + "Column", module)
    .addDecorator(height100percent)
    .add("info", () => (
        <Column
            uiColumnAttr={UIColumnAttribute}
            columnUiActions={[]}
            width={320}
            owner={User1}
            status={select(statusBarLabel, statusBarOptions, statusBarDefaultValue)}
            name={"はいじゃない"}
        />
    ));

storiesOf(StoryPrefix + "Column/Header/StatusColorBar", module)
    .addDecorator(height100percent)
    .add("info", () => (
        <StatusColorBar
            error={boolean(raiseErrorLabel, false)}
            status={select(statusBarLabel, statusBarOptions, statusBarDefaultValue)}
        />
    ));

storiesOf(StoryPrefix + "Column/Header", module)
    .addDecorator(centered)
    .add("info", () => (
        <Header
            owner={User1}
            uiColumnAttr={{ column: "842812010", account: "809230892340021" }}
            columnName={"Home Timeline"}
            status={progressStatus.inProgress}
            uiActions={[]}
        />
    ));
