import React, { memo } from "react";
import { Avatar as _Avatar, Paper as _Paper, Typography } from "@material-ui/core";
import { styled } from "@styled";
import { IStatus, StatusProperties } from "@tsuruclient/datatype";
import { PaperProps } from "@material-ui/core/Paper";

const Styled = {
    Avatar: styled(_Avatar)<PaperProps>`
        && {
            margin: 6px;
            width: 32px;
            height: 32px;
        }
    `,
    Root: styled(_Paper)<PaperProps>`
        && {
            width: 100%;
            max-height: 60px;
            display: flex;
            overflow: hidden;
        }
    `
};

interface Props {
    account: string;
    target: IStatus;
    handleClick?: (payload: Record<string, any>) => void;
}

const handleClick = (props: Props) => (e: React.MouseEvent<any>) => {
    e.preventDefault();
    if (props.handleClick) {
        props.handleClick({
            account: props.account,
            id: props.target[StatusProperties.id]
        });
    }
};

const _StatusCard: React.FunctionComponent<Props> = (props: Props) => {
    return (
        <Styled.Root onClick={handleClick(props)}>
            <Styled.Avatar src={props.target[StatusProperties.user].avatarImage} />
            <Typography variant="body1" style={{ wordWrap: "break-word", wordBreak: "break-all" }}>
                {props.target.text}
            </Typography>
        </Styled.Root>
    );
};

export const StatusCard = memo(_StatusCard);
