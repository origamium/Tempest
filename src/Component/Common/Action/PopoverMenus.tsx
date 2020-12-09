import React from "react";
import { MenuItem, MenuList, Popover } from "@material-ui/core";
import { PopoverOrigin } from "@material-ui/core/Popover";
import { UIActionElement } from "../../../Redux/Logics/DataFlow/UIActions/UIActionControl";
import { useDispatch } from "react-redux";
import { requestDispatchUIAction } from "../../../Redux/Slices/uiaction/uiaction";

export interface PopoverMenuProps {
    keys: { account: string; service: string; provider: string };
    anchorEl: HTMLElement | null;
    handleMenuClose: () => void;
    uiActions: UIActionElement[];
    updateAllContent: () => void;
    anchorOrigin?: PopoverOrigin;
    transformOrigin?: PopoverOrigin;
}

interface IPopoverMenuItemProps extends Pick<PopoverMenuProps, "keys" | "handleMenuClose"> {
    uiAction: UIActionElement;
}

export const PopOverMenuItem: React.FC<IPopoverMenuItemProps> = ({ uiAction, keys, handleMenuClose }) => {
    const dispatch = useDispatch();
    const handleClick = React.useCallback(() => {
        dispatch(requestDispatchUIAction(uiAction, keys, {}));
        handleMenuClose();
    }, [dispatch, uiAction, keys, handleMenuClose]);

    return <MenuItem onClick={handleClick}>{uiAction.name}</MenuItem>;
};

export const PopOverMenu: React.FC<PopoverMenuProps> = ({
    keys,
    anchorEl,
    anchorOrigin,
    transformOrigin,
    uiActions,
    updateAllContent,
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
                {uiActions.length > 0
                    ? uiActions.map((v, i) => (
                          <PopOverMenuItem key={i} handleMenuClose={handleMenuClose} uiAction={v} keys={keys} />
                      ))
                    : undefined}
                <MenuItem onClick={updateAllContent}>{"Update Column Content"}</MenuItem>
            </MenuList>
        </Popover>
    );
};
