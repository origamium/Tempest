import * as React from "react";
import styled from "styled-components";
import { Avatar, ButtonBase, MenuItem, MenuList, Popover, Tooltip, Typography } from "@material-ui/core";
import { IUser, UIAction, UserProperties } from "@tsuruclient/datatype";
import { TooltipProps } from "@material-ui/core/Tooltip";
import { TypographyProps } from "@material-ui/core/Typography";

interface AccountIconProps extends IUser {
    actions: UIAction[];
}

const Styled = {
    Root: styled((props: TooltipProps) => <Tooltip {...props}>{props.children}</Tooltip>)``,
    Name: styled((props: TypographyProps) => (
        <Typography {...props} classes={{ root: "root" }}>
            {props.children}
        </Typography>
    ))`
        &.root {
            color: white;
        }
    `
};

interface PopoverMenuProps extends AccountIconProps {
    menuOpen: boolean;
    handleMenuClose: () => void;
    anchorEl: React.RefObject<HTMLElement>;
}

const extractUserInfo = (props: AccountIconProps): IUser =>
    Object.keys(UserProperties)
        .map(key => props[key])
        .reduce((prev, curr) => ({ ...prev, curr }), {});

interface IPopoverMenuItemProps extends PopoverMenuProps {
    uiAction: UIAction;
}
const PopOverMenuItem: React.FC<IPopoverMenuItemProps> = (props: IPopoverMenuItemProps) => {
    const handleClick = React.useCallback(() => {
        props.uiAction.action({
            ...extractUserInfo(props),
            uiActionId: props.uiAction.id
        });
        props.handleMenuClose();
    }, [props]);

    return <MenuItem onClick={handleClick}>{props.uiAction.name}</MenuItem>;
};

const PopOverMenu: React.FC<PopoverMenuProps> = (props: PopoverMenuProps) => {
    return (
        <Popover
            open={props.menuOpen}
            onClose={props.handleMenuClose}
            anchorOrigin={{
                vertical: "bottom",
                horizontal: "right"
            }}
            transformOrigin={{
                vertical: "top",
                horizontal: "left"
            }}
            anchorEl={props.anchorEl.current}
        >
            <MenuList>
                {props.actions.length > 0 ? (
                    props.actions.map((v, i) => <PopOverMenuItem key={i} {...props} uiAction={v} />)
                ) : (
                    <MenuItem>{"account actions not registered"}</MenuItem>
                )}
            </MenuList>
        </Popover>
    );
};

const RenderName: React.FC<{ name: string }> = ({ name }: { name: string }) => <Styled.Name>{name}</Styled.Name>;

export const AccountIcon = React.memo((props: AccountIconProps) => {
    const [menuOpen, setMenuOpen] = React.useState<boolean>(false);
    const [tooltipOpen, setTooltipOpen] = React.useState<boolean>(false);
    const anchorEl = React.useRef(null);
    const avatar = props[UserProperties.avatarImage];
    const name =
        (props[UserProperties.providerDomain] ? props[UserProperties.providerDomain] + "@" : "") +
        props[UserProperties.screenName];

    const handleMouseOver = () => {
        setTooltipOpen(true);
    };

    const handleMouseOut = () => {
        if (!menuOpen) {
            setTooltipOpen(false);
        }
    };

    const handleAvatarClick = () => {
        setMenuOpen(true);
        setTooltipOpen(true);
    };

    const handleMenuClose = () => {
        setMenuOpen(false);
        setTooltipOpen(false);
    };

    return (
        <>
            <Styled.Root open={tooltipOpen} title={RenderName({ name })} placement="right">
                <div onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
                    <ButtonBase disableRipple onClick={handleAvatarClick} buttonRef={anchorEl}>
                        {avatar ? <Avatar alt={name} src={avatar} /> : <Avatar alt={name}>{"?"}</Avatar>}
                    </ButtonBase>
                </div>
            </Styled.Root>
            <PopOverMenu {...props} menuOpen={menuOpen} handleMenuClose={handleMenuClose} anchorEl={anchorEl} />
        </>
    );
});
