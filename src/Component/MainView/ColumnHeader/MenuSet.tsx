import React, { useState, useCallback } from "react";
import { IconButton } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { PopOverMenu } from "../../Common/Action/PopoverMenus";
import { UIActionElement } from "../../../Redux/Logics/DataFlow/UIActions/UIActionControl";

export interface MenuProps {
    uiActions: UIActionElement[];
    updateAllContent: () => void;
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
                keys={
                    {
                        /*TODO*/
                    }
                }
                anchorEl={anchorEl}
                handleMenuClose={handleClose}
                uiActions={props.uiActions}
                updateAllContent={props.updateAllContent}
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
