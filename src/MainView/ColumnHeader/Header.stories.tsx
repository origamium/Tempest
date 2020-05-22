import * as React from "react";
import { Header } from "./Header";
import { IUICommonAttribute } from "../../datatype/UI/UICommonAttribute";
import { progressStatus } from "./StatusColorBar";
import { User1 } from "../../__testdata__/User";

export default {
    title: "Column|Header",
    component: Header,
};

const UIColumnAttribute: IUICommonAttribute = {
    account: "3902047509399",
    column: "82477795091294",
};

export const Basic = () => (
    <Header
        uiColumnAttr={UIColumnAttribute}
        columnName={"はい"}
        status={progressStatus.none}
        uiActions={[]}
        owner={User1}
    />
);

