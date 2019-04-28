import React from "react";
import { storiesOf } from "@storybook/react";
import {Column} from "./Column";

const StoryPrefix = "MainView|";

const height100percent = (story) => <div style={{height: "100vh"}}>{story()}</div>

storiesOf(StoryPrefix + "Column", module)
    .addDecorator(height100percent)
    .add("info", () => <Column id={"329005725180193470"} width={230}/>)
