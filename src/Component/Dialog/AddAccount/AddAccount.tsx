import * as React from "react";
import { DialogTitle } from "@material-ui/core";
import { ServiceSelect } from "./ServiceSelect";

export const AddAccount: React.FC = () => {
    return (
        <>
            <DialogTitle>アカウントの追加</DialogTitle>
            <ServiceSelect />
        </>
    );
};
