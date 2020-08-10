import { IconButton, Menu, MenuItem } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import * as React from "react";

export const SidebarAddButton: React.FC = () => {
    const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

    const handleAddButtonClick = React.useCallback((e: React.SyntheticEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setAnchorEl(e.currentTarget);
    }, []);

    return (
        <>
            <IconButton onClick={handleAddButtonClick}>
                <Add />
            </IconButton>
            <Menu open={!!anchorEl} anchorEl={anchorEl}>
                <MenuItem>{"Add Account"}</MenuItem>
                <MenuItem>{"Add Column"}</MenuItem>
                <MenuItem>{"Add Provider"}</MenuItem>
            </Menu>
        </>
    );
};
