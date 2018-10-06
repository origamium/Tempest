import Avatar from '@material-ui/core/Avatar';
import Paper, {PaperProps} from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import * as React from 'react';
import {pure} from 'recompose';
import styled, {ITheme} from '../../Theme/style'

type Props = {
    account: string,
    id: string,
    displayName: string,
    screenName?: string,
    avatar: string,
    header?: string,
    handleClick: Function,
};

const Styled = {
    Root: styled<Props | PaperProps | any>(Paper)`
        &&{
            width: 100%;
            height: 100px;
            display: flex;
            flex-direction: column;
            align-content: center;
            align-items: center;
            justify-items: center;
            
            ${(props: Props & {theme: ITheme}) => (props.header ?
                "background-image: url(" + props.header + ")":
                "background-color: " + props.theme.background.secondary)};
            background-size: cover;
            background-position: top center;
        }
    `,
};

const handleClick = (props: Props) => (e: any) => {
    e.preventDefault();
    props.handleClick({
        account: props.account,
        id: props.id,
    });
};

const UserCard: React.SFC<Props> = (props: Props) => (
    <Styled.Root header={props.header} onClick={handleClick(props)}>
        <Avatar src={props.avatar} />
        <Typography variant={"body1"}>{props.displayName}</Typography>
        <Typography variant={'caption'}>{props.screenName || ""}</Typography>
    </Styled.Root>
);

export const UserCard_ = UserCard;
export default pure(UserCard);
