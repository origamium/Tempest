import { IconButton, Menu, MenuItem } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import * as React from "react";
import { dialogKeys, openDialogAction } from "../../../Redux/Slices/dialog";
import { useDispatch } from "react-redux";

export const SidebarAddButton: React.FC = () => {
    const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
    const dispatch = useDispatch();

    const handleAddButtonClick = React.useCallback((e: React.SyntheticEvent<HTMLButtonElement>) => {
        setAnchorEl(e.currentTarget);
    }, []);

    const handleClose = React.useCallback(() => {
        setAnchorEl(null);
    }, []);

    const handleMenuButtonClicked = React.useCallback(
        (e: React.MouseEvent<any>) => {
            const action: dialogKeys = e.currentTarget.dataset.actions;
            if (action) {
                dispatch(openDialogAction(action));
            }
            handleClose();
        },
        [dispatch, handleClose],
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
