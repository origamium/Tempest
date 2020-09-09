import * as React from "react";
import { ContentList } from "./ContentList";
import { nanoid } from "nanoid";
import { createDummyContent } from "../../Utility/createDummyData/createDummyContent";

export default {
    title: "Column/Column/ContentList",
    component: ContentList,
};

const statusList1 = Array.from({ length: 100 })
    .fill(null)
    .map(() => createDummyContent());

export const Basic = () => (
    <div style={{ height: "100vh" }}>
        <ContentList articles={statusList1} account={nanoid(10)} column={nanoid(10)} />
    </div>
);
