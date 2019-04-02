import * as React from "react";
import styled from "styled-components";
import { Avatar, Tooltip } from "@material-ui/core";
import { IUser, UserProperties } from "@data";

interface AccountIconProps extends IUser{}

const Styled = {
    Root: styled.div``,
}

export const AccountIcon = React.memo((props: AccountIconProps) => {
    const avatar = props[UserProperties.avatarImage];
    const name = (props[UserProperties.providerDomain] ? props[UserProperties.providerDomain] + "@" : "") + props[UserProperties.screenName];
    return (
        <Styled.Root>
            <Tooltip title={name}>
            {avatar ? <Avatar alt={name} src={avatar} /> : <Avatar alt={name}>{"?"}</Avatar>}
            </Tooltip>
        </Styled.Root>
    )
})

export default AccountIcon
