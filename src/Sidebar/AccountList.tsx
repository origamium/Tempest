import React from "react";
import { styled } from "@styled";
import { AccountIcon } from "./AccountIcon";
import { IUser, UIAction, UserProperties } from "@tsuruclient/datatype";

interface IAccountListProps {
    Accounts: {
        user: IUser;
        actions: UIAction[];
    }[];
}

const Styled = {
    Root: styled.div`
        display: flex;
        flex-direction: column;
        overflow-y: auto;
    `
};

export const AccountList = (props: IAccountListProps) => {
    return (
        <Styled.Root>
            {props.Accounts.map(v => (
                <AccountIcon key={v.user[UserProperties.id]} actions={v.actions} {...v.user} />
            ))}
        </Styled.Root>
    );
};
