import React from "react";
import { storiesOf } from "@storybook/react";
import { select, boolean } from "@storybook/addon-knobs";
import { Column } from "./Column";
import { progressStatus, StatusColorBar } from "./ColumnParts/StatusColorBar";

const StoryPrefix = "MainView|";

const height100percent = (story) => <div style={{height: "100vh", display: "flex", alignItems: "center" }}>{story()}</div>

storiesOf(StoryPrefix + "Column", module)
    .addDecorator(height100percent)
    .add("info", () => <Column id={"329005725180193470"} width={230}/>)

const statusBarLabel = 'Status';
const statusBarOptions = {
    none: progressStatus.none,
    inProgress: progressStatus.inProgress,
    streaming: progressStatus.streaming,
};
const statusBarDefaultValue = progressStatus.none;

const raiseErrorLabel = "error";


storiesOf(StoryPrefix + "ColumnHeader/StatusColorBar", module)
    .addDecorator(height100percent)
    .add("info", () => <StatusColorBar
        error={boolean(raiseErrorLabel, false)}
        status={select(statusBarLabel, statusBarOptions, statusBarDefaultValue)}/>)
