import React from "react";
import { styled } from "../../Theme";
import { AccountIcon } from "./AccountIcon";
import { IUser } from "../../datatype/Contents/User";
import { UIAction } from "../../datatype/UI/UIAction";
import { IUICommonAttribute } from "../../datatype/UI/UICommonAttribute";
import { useAccountListData } from "../../Redux/Selector/Account/getAccountData";
import { useDispatch } from "react-redux";
import { requestRESTAction } from "../../Redux/Slices/requests/REST";

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
    `,
};

export const AccountList: React.FC<IAccountListProps> = (props) => {
    const accounts = useAccountListData();
    const uiActions =

    return (
        <Styled.Root>
            {accounts.map((v) => (
                <AccountIcon key={v.key} uiActions={[]} user={v.userData} />
            ))}
        </Styled.Root>
    );
};
