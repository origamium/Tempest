import React from "react";
import { storiesOf } from "@storybook/react";
import { boolean, select } from "@storybook/addon-knobs";
import { Column_ } from "./Column";
import { progressStatus, StatusColorBar } from "./ColumnHeader/StatusColorBar";
import { IUICommonAttribuite, UIAction } from "@tsuruclient/datatype";
import { Header } from "./ColumnHeader/Header";
import { User1 } from "../__testdata__/User";
import centered from "@storybook/addon-centered";
import { ColumnContextProviderForStorybook } from "../__testdata__/UIProsp";
import { Columns } from "./Columns";
import { action } from "@storybook/addon-actions";

const StoryPrefix = "MainView|";

const height100percent = story => (
    <div style={{ height: "100vh", display: "flex", alignItems: "center" }}>{story()}</div>
);

const UIColumnAttribute: IUICommonAttribuite = {
    account: "3902047509399",
    column: "82477795091294"
};

const statusBarLabel = "Status";
const statusBarOptions = {
    none: progressStatus.none,
    inProgress: progressStatus.inProgress,
    streaming: progressStatus.streaming
};
const statusBarDefaultValue = progressStatus.none;

const raiseErrorLabel = "error";

const UICAttrList: IUICommonAttribuite[] = [
    { account: "48398892", column: "384279910003" },
    { account: "48493101029", column: "3999337271" },
    { account: "41000001226626", column: "30585837777" },
    { account: "38931100100230", column: "8889989990003" },
    { account: "949099090926", column: "3055715537" },
    { account: "228884056", column: "30518282977" }
];

storiesOf(StoryPrefix + "Columns", module).add("info", () => (
    <Columns tabId={"83832859950909209"} columns={UICAttrList} />
));

storiesOf(StoryPrefix + "Column", module)
    .addDecorator(height100percent)
    .add("info", () => (
        <Column
            {...UIColumnAttribute}
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
    .addDecorator(ColumnContextProviderForStorybook)
    .add("info", () => <Header columnName={"Home Timeline"} status={progressStatus.inProgress} />);
