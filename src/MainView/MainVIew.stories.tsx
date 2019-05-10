import React from "react";
import { storiesOf } from "@storybook/react";
import { select } from "@storybook/addon-knobs";
import { Column } from "./Column";
import { progressStatus, StatusBar } from "./Organism/StatusBar";

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
    error: progressStatus.error
};
const statusBarDefaultValue = progressStatus.none;
const statusBarGroupId = 'GROUP-ID1';

storiesOf(StoryPrefix + "ColumnHeader/StatusBar", module)
    .addDecorator(height100percent)
    .add("info", () => <StatusBar status={select(statusBarLabel, statusBarOptions, statusBarDefaultValue, statusBarGroupId)}/>)
