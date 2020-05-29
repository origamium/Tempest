import React from "react";
import centered from "@storybook/addon-centered/react";
import { Content } from "./Content";
import { ThemeProviderDecorator } from "../../Theme";
import { SampleStatus, UIColumnAttr } from "./testdata";

export default {
    title: "Common Components|Content",
    decorators: [centered, ThemeProviderDecorator],
};

export const Basic = () => <Content {...UIColumnAttr} target={SampleStatus} />;
