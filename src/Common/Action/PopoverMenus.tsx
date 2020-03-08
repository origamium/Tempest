import React from "react";
import { MenuItem, MenuList, Popover } from "@material-ui/core";
import { PopoverOrigin } from "@material-ui/core/Popover";
import { UIAction } from "../../datatype/UI/UIAction";
import { IUICommonAttribute } from "../../datatype/UI/UICommonAttribute";

export interface PopoverMenuProps {
    uiCommonAttr: IUICommonAttribute;
    anchorEl: HTMLElement | null;
    handleMenuClose: () => void;
    uiActions: UIAction[];
    anchorOrigin?: PopoverOrigin;
    transformOrigin?: PopoverOrigin;
}

interface IPopoverMenuItemProps extends Pick<PopoverMenuProps, "uiCommonAttr" | "handleMenuClose"> {
    uiAction: UIAction;
}

export const PopOverMenuItem: React.FC<IPopoverMenuItemProps> = ({ uiAction, uiCommonAttr, handleMenuClose }) => {
    const handleClick = React.useCallback(() => {
        uiAction.action({
            ...uiCommonAttr,
            uiActionId: uiAction.id
        });
        handleMenuClose();
    }, [handleMenuClose, uiAction, uiCommonAttr]);

    return <MenuItem onClick={handleClick}>{uiAction.name}</MenuItem>;
};

export const PopOverMenu: React.FC<PopoverMenuProps> = ({
    uiCommonAttr,
    anchorEl,
    anchorOrigin,
    transformOrigin,
    uiActions,
    handleMenuClose
}) => {
    const isOpen = !!anchorEl;
    return (
        <Popover
            open={isOpen}
            onClose={handleMenuClose}
            anchorEl={anchorEl}
            anchorOrigin={anchorOrigin}
            transformOrigin={transformOrigin}
        >
            <MenuList>
                {uiActions.length > 0 ? (
                    uiActions.map((v, i) => (
                        <PopOverMenuItem
                            key={i}
                            handleMenuClose={handleMenuClose}
                            uiAction={v}
                            uiCommonAttr={uiCommonAttr}
                        />
                    ))
                ) : (
                    <MenuItem>{"account actions not registered"}</MenuItem>
                )}
            </MenuList>
        </Popover>
    );
};
