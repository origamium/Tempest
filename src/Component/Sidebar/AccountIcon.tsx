import React, { useCallback, useMemo } from "react";
import { styled } from "../../Theme";
import { Avatar, ButtonBase, Tooltip, Typography } from "@material-ui/core";
import { TooltipProps } from "@material-ui/core/Tooltip";
import { TypographyProps } from "@material-ui/core/Typography";
import { PopOverMenu } from "../Common/Action/PopoverMenus";
import { IUser, UserProperties } from "../../datatype/Contents/User";
import { UIActionElement } from "../../Redux/Logics/DataFlow/UIActions/UIActionControl";

interface AccountIconProps {
    keys: { account: string; provider: string; service: string };
    uiActions: UIActionElement[];
    user?: IUser;
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
    `,
};

export const AccountIcon: React.FC<AccountIconProps> = (props) => {
    const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
    const [tooltipOpen, setTooltipOpen] = React.useState<boolean>(false);
    const user = useMemo(() => props.user, [props.user]);
    const avatar = useMemo(() => user?.[UserProperties.avatarImage], []);

    const name = useMemo(
        () =>
            `${user?.[UserProperties.providerDomain] ? user?.[UserProperties.providerDomain] : ""}@${
                user?.[UserProperties.screenName]
            }`,
        [user]
    );

    const handleMouseOver = useCallback(() => {
        setTooltipOpen(true);
    }, []);

    const handleMouseOut = useCallback(() => {
        setTooltipOpen(false);
    }, []);

    const handleAvatarClick = useCallback((e: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(e.currentTarget);
        setTooltipOpen(true);
    }, []);

    const handleMenuClose = useCallback(() => {
        setAnchorEl(null);
        setTooltipOpen(false);
    }, []);

    return (
        <>
            <Styled.Root open={tooltipOpen || !!anchorEl} title={name} placement="right">
                <div onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
                    <ButtonBase disableRipple onClick={handleAvatarClick}>
                        {avatar ? <Avatar alt={name} src={avatar} /> : <Avatar alt={name}>{"?"}</Avatar>}
                    </ButtonBase>
                </div>
            </Styled.Root>
            <PopOverMenu
                keys={props.keys}
                anchorEl={anchorEl}
                handleMenuClose={handleMenuClose}
                uiActions={props.uiActions}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                }}
            />
        </>
    );
};
