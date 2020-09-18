import * as React from "react";
import { Dialog } from "@material-ui/core";
import { DialogName, useDialog } from "../../hooks/useDialog";
import { ServiceSelect } from "./AddAccount/ServiceSelect";

type DialogContentsProps = {
    dialogKey: DialogName;
    handleClose: () => void;
};

const DialogContents: React.FC<DialogContentsProps> = ({ dialogKey, handleClose }) => {
    switch (dialogKey) {
        case "add-account":
            return <ServiceSelect />;
        case "add-column":
            return <div />;
        default:
            console.error(`unknown dialog key: ${dialogKey}`);
            handleClose();
            return <div />;
    }
};

export const TempestDialog: React.FC = () => {
    const [dialogKey, , handleClose] = useDialog();

    return (
        <Dialog open={!!dialogKey}>
            <DialogContents dialogKey={dialogKey} handleClose={handleClose} />
        </Dialog>
    );
};
