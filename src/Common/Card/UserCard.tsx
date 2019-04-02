import * as React from 'react';
import { Paper, Avatar } from "@material-ui/core";
import { PaperProps } from "@material-ui/core/Paper";
import Typography from '@material-ui/core/Typography';
import styled, {ThemeInterface} from '../../Theme/style'

type Props = {
    account: string,
    id: string,
    displayName?: string,
    screenName?: string,
    avatar?: string,
    header?: string,
    handleClick?: Function,
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
            padding: 0.4em 0;
            
            ${(props: Props & {theme: ThemeInterface}) => (props.header ?
                "background-image: url(" + props.header + ")":
                "background-color: white")};
            background-size: cover;
            background-position: top center;
        }
    `,
};

const handleClick = (props: Props) => (e: any) => {
    e.preventDefault();
    if(props.handleClick){
        props.handleClick({
            account: props.account,
            id: props.id,
        });
    }
};

export const UserCard: React.FunctionComponent<Props> = React.memo((props: Props) => (
    <Styled.Root header={props.header} onClick={handleClick(props)}>
        {props.avatar ? <Avatar src={props.avatar} /> : <Avatar>{"?"}</Avatar>}
        <Typography variant={"body1"}>{props.displayName || ""}</Typography>
        <Typography variant={'caption'}>{props.screenName || ""}</Typography>
    </Styled.Root>
));

export default UserCard;
