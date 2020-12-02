import React from "react";
import { styled } from "../../Theme";
import { AccountIcon } from "./AccountIcon";
import { useAccountListData } from "../../Redux/Selector/Account/getAccountData";

export interface IAccountListProps {}

const Styled = {
    Root: styled.div`
        display: flex;
        flex-direction: column;
        margin: 4px 4px;
        overflow-y: auto;

        & > * {
            margin: 2px 0;
        }
    `,
};

export const AccountList: React.FC<IAccountListProps> = (props) => {
    const accounts = useAccountListData();

    return (
        <Styled.Root>
            {accounts.map((v) => (
                <AccountIcon key={v.key.account} keys={v.key} uiActions={v.uiActions || []} user={v.userData} />
            ))}
        </Styled.Root>
    );
};
