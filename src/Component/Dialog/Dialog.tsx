import * as React from "react";
import { Dialog } from "@material-ui/core";
import { AddAccount } from "./AddAccount/AddAccount";
import { useDispatch, useSelector } from "react-redux";
import { StoreType } from "../../Redux/Store/StoreType";
import { closeDialogAction, dialogKeys } from "../../Redux/Slices/dialog";
import { AddColumn } from "./AddColumn/AddColumn";

type DialogContentsProps = {
    dialogKey: dialogKeys;
    pageNumber: number;
    handleClose: () => void;
};

const DialogContents: React.FC<DialogContentsProps> = ({ dialogKey, pageNumber, handleClose }) => {
    React.useEffect(() => {
        if (!dialogKey) {
            handleClose();
        }
    }, [dialogKey, handleClose]);

    switch (dialogKey) {
        case "add-account":
            return <AddAccount pageNumber={pageNumber} handleClose={handleClose} />;
        case "add-column":
            return <AddColumn handleClose={handleClose} />;
        case undefined:
            return <div />;
        default:
            console.error(`unknown dialog key: ${dialogKey}`);
            return <div />;
    }
};

export const TempestDialog: React.FC = () => {
    const dialogData = useSelector((store: StoreType) => store.dialog);
    const dispatch = useDispatch();

    const handleClose = React.useCallback(() => {
        dispatch(closeDialogAction());
    }, [dispatch]);

    return (
        dialogData && (
            <Dialog open={!!dialogData.open}>
                <DialogContents dialogKey={dialogData.open} pageNumber={dialogData.page} handleClose={handleClose} />
            </Dialog>
        )
    );
};
