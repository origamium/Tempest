import React from "react";
import { MenuItem, MenuList, Popover } from "@material-ui/core";
import { IUICommonAttribuite, UIAction } from "@tsuruclient/datatype";
import { PopoverOrigin } from "@material-ui/core/Popover";

export interface PopoverMenuProps {
    uiCommonAttr: IUICommonAttribuite;
    anchorEl: HTMLElement | null;
    handleMenuClose: () => void;
    uiActions: UIAction[];
    anchorOrigin?: PopoverOrigin;
    transformOrigin?: PopoverOrigin;
}

interface IPopoverMenuItemProps extends PopoverMenuProps {
    uiAction: UIAction;
}

export const PopOverMenuItem: React.FC<IPopoverMenuItemProps> = props => {
    const handleClick = React.useCallback(() => {
        props.uiAction.action({
            ...props.uiCommonAttr,
            uiActionId: props.uiAction.id
        });
        props.handleMenuClose();
    }, [props]);

    return <MenuItem onClick={handleClick}>{props.uiAction.name}</MenuItem>;
};

export const PopOverMenu: React.FC<PopoverMenuProps> = props => {
    const isOpen = !!props.anchorEl;
    return (
        <Popover
            open={isOpen}
            onClose={props.handleMenuClose}
            anchorEl={props.anchorEl}
            anchorOrigin={props.anchorOrigin}
            transformOrigin={props.transformOrigin}
        >
            <MenuList>
                {props.uiActions.length > 0 ? (
                    props.uiActions.map((v, i) => <PopOverMenuItem key={i} {...props} uiAction={v} />)
                ) : (
                    <MenuItem>{"account actions not registered"}</MenuItem>
                )}
            </MenuList>
        </Popover>
    );
};
