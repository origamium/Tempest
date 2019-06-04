import React from "react";
import { storiesOf } from "@storybook/react";
import { boolean, select } from "@storybook/addon-knobs";
import { Column } from "./Column";
import { progressStatus, StatusColorBar } from "./ColumnHeader/StatusColorBar";
import { IUICommonAttribuite } from "@tsuruclient/datatype";
import { Header } from "./ColumnHeader/Header";
import { User1 } from "../__testdata__/User";
import centered from "@storybook/addon-centered";
import { ColumnContextProviderForStorybook } from "../__testdata__/Context";

const StoryPrefix = "MainView|";

const height100percent = (story) => <div style={{height: "100vh", display: "flex", alignItems: "center" }}>{story()}</div>

const UIColumnAttribute: IUICommonAttribuite = {
    account: "3902047509399",
    column: "82477795091294"
}

const statusBarLabel = 'Status';
const statusBarOptions = {
    none: progressStatus.none,
    inProgress: progressStatus.inProgress,
    streaming: progressStatus.streaming,
};
const statusBarDefaultValue = progressStatus.none;

const raiseErrorLabel = "error";


storiesOf(StoryPrefix + "Column", module)
    .addDecorator(height100percent)
    .add("info", () => <Column
        {...UIColumnAttribute}
        width={320}
        owner={User1}
        status={select(statusBarLabel, statusBarOptions, statusBarDefaultValue)}
        name={"はいじゃない"} />)

storiesOf(StoryPrefix + "ColumnHeader/StatusColorBar", module)
    .addDecorator(height100percent)
    .add("info", () => <StatusColorBar
        error={boolean(raiseErrorLabel, false)}
        status={select(statusBarLabel, statusBarOptions, statusBarDefaultValue)}/>)

storiesOf(StoryPrefix + "ColumnHeader", module)
    .addDecorator(centered)
    .addDecorator(ColumnContextProviderForStorybook)
    .add("info", () =>
        <Header columnName={"Home Timeline"} status={progressStatus.inProgress}/>)
