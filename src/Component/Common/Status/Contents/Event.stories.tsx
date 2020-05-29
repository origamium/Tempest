import * as React from "react";
import centered from "@storybook/addon-centered";
import { Event } from "./Event";
import { Event1, Event2, UIColumnAttr } from "../testdata";
import { ThemeProviderDecorator } from "../../../Theme";

export default {
    title: "Common Components|Content/Event",
    decorators: [centered, ThemeProviderDecorator],
    component: Event,
};

export const Basic = () => (
    <div style={{ border: "solid 1px black", width: "280px" }}>
        <Event {...UIColumnAttr} eventContext={"retweeted you"} target={Event1} />
    </div>
);

export const MultipleSourceUser = () => (
    <div style={{ border: "solid 1px black", width: "280px" }}>
        <Event {...UIColumnAttr} eventContext={"liked your tweet"} target={Event2} />
    </div>
);
