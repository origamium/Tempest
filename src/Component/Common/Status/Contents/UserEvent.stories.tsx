import * as React from "react";
import centered from "@storybook/addon-centered";
import { UserEvent } from "./UserEvent";
import { User1, User2 } from "../../../__testdata__/User";
import { ThemeProviderDecorator } from "../../../../Theme";

export default {
    title: "Common Components/Content/UserEvent",
    decorators: [centered, ThemeProviderDecorator],
    component: UserEvent,
};

export const basic = () => (
    <div style={{ border: "solid 1px black", width: "280px" }}>
        <UserEvent account={"moha"} column={"yeah"} eventContext={"followed you"} sourceUser={[User1, User2]} />
    </div>
);
