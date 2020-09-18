import * as React from "react";
import centered from "@storybook/addon-centered";
import { ThemeProviderDecorator } from "../../../Theme";
import { ServiceSelect } from "./ServiceSelect";

export default {
    title: "Dialog/AddAccount",
    decorators: [centered, ThemeProviderDecorator],
};

export const ServiceSelectDialog = () => <ServiceSelect />;
