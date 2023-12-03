import * as React from "react";
import { Paper, Avatar, Typography } from "@material-ui/core";
import { useCallback } from "react";
import { css } from "@emotion/react";

interface Props {
    account: string;
    id: string;
    displayName?: string;
    screenName?: string;
    avatar?: string;
    header?: string;
    handleClick?: Function;
}

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
        [_handleClick, account, id],
    );

    return (
        <Paper
            onClick={handleClick}
            css={css`
                width: 100%;
                height: 120px;
                display: inline-flex;
                flex-direction: column;
                align-content: center;
                align-items: center;
                justify-items: center;
                padding: 0.4em 0;

                overflow-y: hidden;

                background-size: cover;
                background-position: top center;

                ${header ? `background-image: url("${header}")` : "background-color: white"}

                & > * {
                    word-break: break-all;
                    word-wrap: break-word;
                }
            `}
        >
            {avatar ? <Avatar src={avatar} /> : <Avatar>{"?"}</Avatar>}
            <Typography variant={"body1"}>{displayName || ""}</Typography>
            <Typography variant={"caption"}>{screenName || ""}</Typography>
        </Paper>
    );
};
