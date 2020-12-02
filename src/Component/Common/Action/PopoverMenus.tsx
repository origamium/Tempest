import React from "react";
import { MenuItem, MenuList, Popover } from "@material-ui/core";
import { PopoverOrigin } from "@material-ui/core/Popover";
import { UIAction } from "../../../datatype/UI/UIAction";

export interface PopoverMenuProps {
    accountKey: string;
    anchorEl: HTMLElement | null;
    handleMenuClose: () => void;
    uiActions: UIAction[];
    anchorOrigin?: PopoverOrigin;
    transformOrigin?: PopoverOrigin;
}

interface IPopoverMenuItemProps extends Pick<PopoverMenuProps, "accountKey" | "handleMenuClose"> {
    uiAction: UIAction;
}

export const PopOverMenuItem: React.FC<IPopoverMenuItemProps> = ({ uiAction, accountKey, handleMenuClose }) => {
    const handleClick = React.useCallback(() => {
        uiAction.action({
            accountKey,
            uiActionId: uiAction.id,
        });
        handleMenuClose();
    }, [accountKey, handleMenuClose, uiAction]);

    return <MenuItem onClick={handleClick}>{uiAction.name}</MenuItem>;
};

export const PopOverMenu: React.FC<PopoverMenuProps> = ({
    accountKey,
    anchorEl,
    anchorOrigin,
    transformOrigin,
    uiActions,
    handleMenuClose,
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
                            accountKey={accountKey}
                        />
                    ))
                ) : (
                    <MenuItem>{"account actions not registered"}</MenuItem>
                )}
            </MenuList>
        </Popover>
    );
};
