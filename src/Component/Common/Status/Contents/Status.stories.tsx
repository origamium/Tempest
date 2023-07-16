import * as React from "react";
import centered from "@storybook/addon-centered/react";
import { ThemeProviderDecorator } from "../../../../Theme";
import { SampleStatus, UIColumnAttr } from "../testdata";
import { Status } from "./Status";

export default {
    title: "Common Components/Content/status",
    decorators: [centered, ThemeProviderDecorator],
    component: Status,
};

export const Basic = () => (
    <div style={{ border: "solid 1px black", width: "280px" }}>
        <Status {...UIColumnAttr} target={SampleStatus} measure={() => {}} />
    </div>
);
