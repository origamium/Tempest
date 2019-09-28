import React from "react";
import { styled } from "@styled";
import { AccountIcon } from "./AccountIcon";
import { IUICommonAttribuite, IUser, UIAction, UserProperties } from "@tsuruclient/datatype";

export interface IAccountProps {
    user: IUser;
    actions: UIAction[];
    uiCommonAttr: IUICommonAttribuite;
}

export interface IAccountListProps {
    accounts: IAccountProps[];
}

const Styled = {
    Root: styled.div`
        margin: 4px 4px;
        display: flex;
        flex-direction: column;
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
