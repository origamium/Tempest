import * as React from "react";
import { Column } from "./Column";
import { User1 } from "../__testdata__/User";
import { select } from "@storybook/addon-knobs";
import { IUICommonAttribute } from "../../datatype/UI/UICommonAttribute";
import { progressStatus } from "./ColumnHeader/StatusColorBar";

export default {
    title: "Column|Column",
    component: Column,
};

const UIColumnAttribute: IUICommonAttribute = {
    account: "3902047509399",
    column: "82477795091294",
};

const statusBarLabel = "Status";
const statusBarOptions = {
    none: progressStatus.none,
    inProgress: progressStatus.inProgress,
    streaming: progressStatus.streaming,
};
const statusBarDefaultValue = progressStatus.none;

export const Basic = () => (
    <Column
        uiColumnAttr={UIColumnAttribute}
        columnUiActions={[]}
        width={320}
        owner={User1}
        status={select(statusBarLabel, statusBarOptions, statusBarDefaultValue)}
        name={"はいじゃない"}
    />
);
