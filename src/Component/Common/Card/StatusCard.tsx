import React, { useCallback } from "react";
import { Avatar as _Avatar, Paper as _Paper, Typography } from "@material-ui/core";
import { styled } from "../../../Theme";
import { IStatus, StatusProperties } from "../../../datatype/Contents/Article/Status";

const Styled = {
    Avatar: styled(_Avatar)<any>`
        && {
            width: 32px;
            height: 32px;
            margin: 6px;
        }
    `,
    Root: styled(_Paper)<any>`
        && {
            display: flex;
            width: 100%;
            max-height: 60px;
            overflow: hidden;
        }
    `,
};

interface Props {
    account: string;
    target: IStatus;
    handleClick?: (payload: Record<string, string>) => void;
}

export const StatusCard: React.FunctionComponent<Props> = ({ account, target, handleClick: handleClick_ }) => {
    const handleClick = useCallback(
        (e: React.MouseEvent<HTMLElement>) => {
            e.preventDefault();
            if (handleClick_) {
                handleClick_({
                    account: account,
                    id: target[StatusProperties.id],
                });
            }
        },
        [account, target, handleClick_],
    );

    return (
        <Styled.Root onClick={handleClick}>
            <Styled.Avatar src={target[StatusProperties.user].avatarImage} />
            <Typography variant="body1" style={{ wordWrap: "break-word", wordBreak: "break-all" }}>
                {target.text}
            </Typography>
        </Styled.Root>
    );
};
