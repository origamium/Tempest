import React from "react";
import { styled } from "@styled";
import { AccountIcon } from "./AccountIcon";
import { IUser, UserProperties } from "../datatype/Contents/User";
import { UIAction } from "../datatype/UI/UIAction";
import { IUICommonAttribute } from "../datatype/UI/UICommonAttribute";

export interface IAccountProps {
    user: IUser;
    actions: UIAction[];
    uiCommonAttr: IUICommonAttribute;
}

export interface IAccountListProps {
    accounts: IAccountProps[];
}

const Styled = {
    Root: styled.div`
        display: flex;
        flex-direction: column;
        margin: 4px 4px;
        overflow-y: auto;

        & > * {
            margin: 2px 0;
        }
    `
};

export const AccountList: React.FC<IAccountListProps> = props => {
    return (
        <Styled.Root>
            {props.accounts.map(v => (
                <AccountIcon
                    key={v.user[UserProperties.id]}
                    uiActions={v.actions}
                    uiCommonAttr={v.uiCommonAttr}
                    {...v.user}
                />
            ))}
        </Styled.Root>
    );
};
