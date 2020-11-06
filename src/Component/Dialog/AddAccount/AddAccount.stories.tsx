import * as React from "react";
import centered from "@storybook/addon-centered";
import { ThemeProviderDecorator } from "../../../Theme";
import { ServiceSelect } from "./ServiceSelect";
import { action } from "@storybook/addon-actions";
import { InputPIN } from "./InputPIN";

export default {
    title: "Dialog/AddAccount",
    decorators: [centered, ThemeProviderDecorator],
};

export const ServiceSelectDialog = () => <ServiceSelect list={[]} handleSubmitProvider={action("provider select!")} />;
export const InputPINDialog = () => <InputPIN providerKey={"providerKey"} handleSubmitPIN={action("pin sended!")} />;
