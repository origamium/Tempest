import React, { useState, useCallback } from "react";
import { IconButton } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { IUICommonAttribuite, UIAction } from "@tsuruclient/datatype";
import { PopOverMenu } from "../../Common/Action/PopoverMenus";

export interface MenuProps {
    uiCommonAttr: IUICommonAttribuite;
    uiActions: UIAction[];
}

export const MenuSet: React.FC<MenuProps> = props => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const handleClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(e.currentTarget);
    }, []);

    const handleClose = useCallback(() => {
        setAnchorEl(null);
    }, []);

    return (
        <>
            <IconButton onClick={handleClick}>
                <MenuIcon />
            </IconButton>
            <PopOverMenu
                uiCommonAttr={props.uiCommonAttr}
                anchorEl={anchorEl}
                handleMenuClose={handleClose}
                uiActions={props.uiActions}
            />
        </>
    );
};
