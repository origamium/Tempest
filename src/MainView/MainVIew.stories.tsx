import React from "react";
import { storiesOf } from "@storybook/react";
import {Column} from "./Column";


const StoryPrefix = "MainView|";

storiesOf(StoryPrefix + "Column", module)
    .add("info", () => <Column id={"329005725180193470"} width={230}/>)
