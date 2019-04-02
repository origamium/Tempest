import * as React from 'react';
import { Avatar as _Avatar, Paper as _Paper, Typography } from "@material-ui/core";
import styled from '../../Theme/style';
import { IStatus, StatusProperties } from "@data";

const Styled = {
    Avatar: styled(_Avatar)<any>`
        &&{
            margin: 6px;
            width: 32px;
            height: 32px;
        }
    `,
    Root: styled(_Paper)<any>`
        && {
            width: 100%;
            max-height: 60px;
            display: flex;
            overflow: hidden;
        }
    `,
};

type Props = {
    accountKey: string,
    target: IStatus,
    handleClick?: (payload: Object) => void,
}

const handleClick = (props: Props) => (e: React.MouseEvent<any>) => {
    e.preventDefault();
    if(props.handleClick) {
        props.handleClick({
            account: props.accountKey,
            id: props.target[StatusProperties.id],
        });
    }
};

export const StatusCard: React.FunctionComponent<Props> = React.memo((props: Props) => {
    return (
        <Styled.Root onClick={handleClick(props)}>
            <Styled.Avatar src={props.target[StatusProperties.user].avatarImage}/>
            <Typography variant="body1" style={{ wordWrap: "break-word", wordBreak: "break-all" }}>
                {props.target.text}
            </Typography>
        </Styled.Root>
    );
});

export default StatusCard;
