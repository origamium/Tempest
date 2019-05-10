import React from "react";
import { styled } from "@styled";
import { AccountIcon } from "./AccountIcon";
import { IUser, UIAction, UserProperties } from "@tsuruclient/datatype";

export interface IAccountProps {
    user: IUser;
    actions: UIAction[];
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

export const AccountList = (props: IAccountListProps) => {
    return (
        <Styled.Root>
            {props.accounts.map(v => (
                <AccountIcon key={v.user[UserProperties.id]} actions={v.actions} {...v.user} />
            ))}
        </Styled.Root>
    );
};
