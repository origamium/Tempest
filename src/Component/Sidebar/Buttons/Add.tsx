import { IconButton, Menu, MenuItem } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import * as React from "react";
import { DialogName, useDialog } from "../../../hooks/useDialog";

export const SidebarAddButton: React.FC = () => {
    const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
    const [, openDialogByKey] = useDialog();

    const handleAddButtonClick = React.useCallback((e: React.SyntheticEvent<HTMLButtonElement>) => {
        setAnchorEl(e.currentTarget);
    }, []);

    const handleClose = React.useCallback(() => {
        setAnchorEl(null);
    }, []);

    const handleMenuButtonClicked = React.useCallback(
        (e: React.MouseEvent<any>) => {
            const action: DialogName = e.currentTarget.dataset.actions;
            if (action) {
                openDialogByKey(action);
            }
            handleClose();
        },
        [handleClose, openDialogByKey]
    );

    return (
        <>
            <IconButton onClick={handleAddButtonClick}>
                <Add />
            </IconButton>
            <Menu open={!!anchorEl} anchorEl={anchorEl} onClose={handleClose}>
                <MenuItem data-actions={"add-account"} onClick={handleMenuButtonClicked}>
                    {"Add Account"}
                </MenuItem>
                <MenuItem data-actions="add-column" onClick={handleMenuButtonClicked}>
                    {"Add Column"}
                </MenuItem>
            </Menu>
        </>
    );
};
