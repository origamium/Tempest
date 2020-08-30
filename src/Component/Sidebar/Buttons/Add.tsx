import { IconButton, Menu, MenuItem } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import * as React from "react";
import { OpenDialogEventDetail, OpenDialogEventDispatcher } from "../../../CustomEvents";

export const SidebarAddButton: React.FC = () => {
    const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

    const handleAddButtonClick = React.useCallback((e: React.SyntheticEvent<HTMLButtonElement>) => {
        setAnchorEl(e.currentTarget);
    }, []);

    const handleClose = React.useCallback(() => {
        setAnchorEl(null);
    }, []);

    const handleMenuButtonClicked = React.useCallback(
        (e: React.MouseEvent<any>) => {
            const action: OpenDialogEventDetail = e.currentTarget.dataset.actions;
            if (action) {
                OpenDialogEventDispatcher(action);
            }
            handleClose();
        },
        [handleClose]
    );

    return (
        <>
            <IconButton onClick={handleAddButtonClick}>
                <Add />
            </IconButton>
            <Menu open={!!anchorEl} anchorEl={anchorEl} onClose={handleClose}>
                <MenuItem data-actions="add-account" onClick={handleMenuButtonClicked}>
                    {"Add Account"}
                </MenuItem>
                <MenuItem data-actions="add-column" onClick={handleMenuButtonClicked}>
                    {"Add Column"}
                </MenuItem>
            </Menu>
        </>
    );
};
