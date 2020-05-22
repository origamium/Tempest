import React, { useState, useCallback } from "react";
import { IconButton } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { PopOverMenu } from "../../Common/Action/PopoverMenus";
import { UIAction } from "../../datatype/UI/UIAction";
import { IUICommonAttribute } from "../../datatype/UI/UICommonAttribute";

export interface MenuProps {
    uiCommonAttr: IUICommonAttribute;
    uiActions: UIAction[];
}

export const MenuSet: React.FC<MenuProps> = (props) => {
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
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
            />
        </>
    );
};
