import React from "react";
import { storiesOf } from "@storybook/react";
import { boolean, select } from "@storybook/addon-knobs";
import { Column_, ColumnProps } from "./Column";
import { progressStatus, StatusColorBar } from "./ColumnHeader/StatusColorBar";
import { IUICommonAttribuite, UIAction } from "@tsuruclient/datatype";
import { Header } from "./ColumnHeader/Header";
import { User1, User2 } from "../__testdata__/User";
import centered from "@storybook/addon-centered";
import { Columns } from "./Columns";
import { action } from "@storybook/addon-actions";

const StoryPrefix = "MainView|";

const height100percent = (story) => <div style={{height: "100vh", display: "flex", alignItems: "center" }}>{story()}</div>;

const UIColumnAttribute: IUICommonAttribuite = {
    account: "3902047509399",
    column: "82477795091294"
};

const actions: UIAction[] = [
    {
        id: "1234",
        name: "Start Streaming",
        action: action("Start Streaming")
    },
    {
        id: "5678",
        name: "Sign Out",
        action: action("Sign Out")
    }
];

const statusBarLabel = 'Status';
const statusBarOptions = {
    none: progressStatus.none,
    inProgress: progressStatus.inProgress,
    streaming: progressStatus.streaming,
};
const statusBarDefaultValue = progressStatus.none;

const raiseErrorLabel = "error";

const UICAttrList: ColumnProps[] = [
    {
        uiColumnAttr: { account: "arclisp", column: "90425802"},
        columnUiActions: [{id: "984284982380198930", name: "Setting", action: action("uiaction fired")}],
        name: "Reaction",
        owner: User2,
        status: progressStatus.none,
        width: 280
    },
    {
        uiColumnAttr: { account: "origami", column: "44888542823289"},
        columnUiActions: [],
        name: "Next Timeline",
        owner: User1,
        status: progressStatus.none,
        width: 280
    },
    {
        uiColumnAttr: { account: "arclisp", column: "9042388402"},
        columnUiActions: [],
        name: "Home Timeline",
        owner: User1,
        status: progressStatus.none,
        width: 280
    }
];

storiesOf(StoryPrefix + "Columns", module)
    .addDecorator(height100percent)
    .add("info", () => <Columns
        tabId={"83832859950909209"}
        columns={UICAttrList} />);

storiesOf(StoryPrefix + "Column", module)
    .addDecorator(height100percent)
    .add("info", () => <Column_
        {...UIColumnAttribute}
        width={320}
        owner={User1}
        status={select(statusBarLabel, statusBarOptions, statusBarDefaultValue)}
        name={"はいじゃない"}
        columnUiActions={actions}
        uiColumnAttr={UIColumnAttribute}/>);

storiesOf(StoryPrefix + "Column/Header/StatusColorBar", module)
    .addDecorator(height100percent)
    .add("info", () => <StatusColorBar
        error={boolean(raiseErrorLabel, false)}
        status={select(statusBarLabel, statusBarOptions, statusBarDefaultValue)}/>);

storiesOf(StoryPrefix + "Column/Header", module)
    .addDecorator(centered)
    .add("info", () =>
        <Header
            owner={User1}
            columnName={"Home Timeline"}
            status={progressStatus.inProgress}
            uiColumnAttr={UIColumnAttribute}
            uiActions={actions} />);
