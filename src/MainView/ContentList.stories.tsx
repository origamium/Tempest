import * as React from "react";
import { ContentList } from "./ContentList";
import { nanoid } from "nanoid";
import { createDummyStatus } from "../Utility/createDummyStatus";

export default {
    title: "Column|Column/ContentList",
    component: ContentList,
};

const statusList1 = Array.from({ length: 100 })
    .fill(null)
    .map(() => createDummyStatus());

export const Basic = () => <ContentList articles={statusList1} account={nanoid(10)} column={nanoid(10)} />;
