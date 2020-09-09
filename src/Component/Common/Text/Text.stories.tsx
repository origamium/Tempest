import * as React from "react";
import { text } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import centered from "@storybook/addon-centered";

import { Text } from "./Text";
import { ThemeProviderDecorator } from "../../../Theme";

export default {
    title: "Common Components/Text",
    component: Text,
    decorators: [centered, ThemeProviderDecorator],
};
const initText = `はい #no jfdaslfjldkasjflasjdl https://google.com @arclisp`;

export const Basic = () => <Text text={text("source", initText)} handleLinkClick={action("clicked")} />;
export const NoUrls = () => (
    <Text text={text("source2", "90132091098851029384091")} handleLinkClick={action("clicked")} />
);
export const LongUrl = () => (
    <Text
        text={"https://superloooooooooooooooooooooooooooooooooooooooooooongurl.origamium.com/"}
        handleLinkClick={action("clicked")}
    />
);
