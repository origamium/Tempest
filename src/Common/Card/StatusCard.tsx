import _Avatar from '@material-ui/core/Avatar';
import _Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import * as React from 'react';
import {pure} from 'recompose';
import styled from '../../Theme/style';
import {IStatus, StatusProperties} from '../../../lib/data/src/index';

const Styled = {
    Avatar: styled(_Avatar)`
        &&{
            margin: 6px;
            width: 32px;
            height: 32px;
        }
    `,
    Root: styled(_Paper)`
        && {
            width: 100%;
            max-height: 60px;
            margin: 4px;
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

const handleClick = (props: Props) => (e: any) => {
    e.preventDefault();
    if(props.handleClick) {
        props.handleClick({
            account: props.accountKey,
            id: props.target[StatusProperties.id],
        });
    }
};

export const StatusCard: React.SFC<Props> = (props: Props) => (
    <Styled.Root onClick={handleClick(props)}>
        <Styled.Avatar src={props.target[StatusProperties.user].avatarImage} />
        <Typography variant="body1">{props.target.text}</Typography>
    </Styled.Root>
);

export default pure(StatusCard);
