import * as React from "react";
import { Dialog } from "@material-ui/core";
import { DialogName, useDialog } from "../../hooks/useDialog";
import { AddAccount } from "./AddAccount/AddAccount";

type DialogContentsProps = {
    dialogKey: DialogName;
    handleClose: () => void;
};

const DialogContents: React.FC<DialogContentsProps> = ({ dialogKey, handleClose }) => {
    React.useEffect(() => {
        if (!dialogKey) {
            handleClose();
        }
    }, [dialogKey, handleClose]);

    switch (dialogKey) {
        case "add-account":
            return <AddAccount />;
        case "add-column":
            return <div />;
        case undefined:
            return <div />;
        default:
            console.error(`unknown dialog key: ${dialogKey}`);
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
