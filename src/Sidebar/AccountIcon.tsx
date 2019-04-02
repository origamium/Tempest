import * as React from "react";
import styled from "styled-components";
import { Avatar, Tooltip, Typography } from "@material-ui/core";
import { IUser, UserProperties } from "@data";
import { TooltipProps } from "@material-ui/core/Tooltip";
import { TypographyProps } from "@material-ui/core/Typography";

interface AccountIconProps extends IUser{}

const Styled = {
    Root: styled((props: TooltipProps) => (
        <Tooltip title={props.title} placement={props.placement} classes={{ popper: 'popper' }}>
            {props.children}
        </Tooltip>))``,
    Name: styled((props: TypographyProps) => (
        <Typography {...props} classes={{root: 'root'}}>
            {props.children}
        </Typography>
    ))`
        &.root{
            color: white;
        }
    `,
}


export const AccountIcon = React.memo((props: AccountIconProps) => {
    const avatar = props[UserProperties.avatarImage];
    const name = (props[UserProperties.providerDomain] ? props[UserProperties.providerDomain] + "@" : "") + props[UserProperties.screenName];
    return (
        <Styled.Root title={<Styled.Name>{name}</Styled.Name>} placement="right">
                {avatar ? <Avatar alt={name} src={avatar} /> : <Avatar alt={name}>{"?"}</Avatar>}
        </Styled.Root>
    )
})

export default AccountIcon
