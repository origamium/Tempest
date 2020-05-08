import * as React from "react";
import { Paper, Avatar, Typography } from "@material-ui/core";
import { PaperProps } from "@material-ui/core/Paper";
import { styled, ITheme } from "../../Theme";
import { useCallback } from "react";

interface Props {
    account: string;
    id: string;
    displayName?: string;
    screenName?: string;
    avatar?: string;
    header?: string;
    handleClick?: Function;
}

const Styled = {
    Root: styled<Props | PaperProps | any>(Paper)`
        && {
            width: 100%;
            height: 100px;
            display: flex;
            flex-direction: column;
            align-content: center;
            align-items: center;
            justify-items: center;
            padding: 0.4em 0;

            ${({ header }: Props & { theme: ITheme }) =>
                header ? "background-image: url(" + header + ")" : "background-color: white"}
            background-size: cover;
            background-position: top center;
        }
    `,
};

export const UserCard: React.FC<Props> = ({
    account,
    id,
    displayName,
    screenName,
    avatar,
    header,
    handleClick: _handleClick,
}) => {
    const handleClick = useCallback(
        (e: React.MouseEvent<HTMLElement>) => {
            e.preventDefault();
            if (_handleClick) {
                _handleClick({
                    account: account,
                    id: id,
                });
            }
        },
        [_handleClick, account, id]
    );

    return (
        <Styled.Root header={header} onClick={handleClick}>
            {avatar ? <Avatar src={avatar} /> : <Avatar>{"?"}</Avatar>}
            <Typography variant={"body1"}>{displayName || ""}</Typography>
            <Typography variant={"caption"}>{screenName || ""}</Typography>
        </Styled.Root>
    );
};
