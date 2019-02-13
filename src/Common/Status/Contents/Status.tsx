import * as React from 'react';
import styled from 'styled-components';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import ThumbnailList from '../../Thumbnail/ThumbnailList';
import {IStatus, UserProperties} from "../../../../lib/data";

export type StatusProps = IStatus & {
    accountKey: string,
    columnKey: string,
};

const Styled = {
    Root: styled.div`
        display: flex;
        flex-direction: column;
        padding: 6px;
    `,
    Body: styled.div`
        display: flex;
        & > * {
            margin: 0 2px;
        }
    `,
    Text: styled.section`
        word-wrap : break-word;
        overflow-wrap: break-word;
        overflow-x: hidden;
    `,
};

export const Status: React.FunctionComponent<StatusProps> = React.memo((props: StatusProps) => {
    const {user, text, image, columnKey, accountKey} = props;
    return (
        <Styled.Root>
            <Styled.Body>
                {user[UserProperties.avatarImage] ?
                    <Avatar src={user[UserProperties.avatarImage]}/> :
                    <Avatar>{"?"}</Avatar>}
                <Styled.Text>
                    <Typography variant="caption">{user[UserProperties.displayName] + "@" + user[UserProperties.screenName]}</Typography>
                    <Typography variant="body1">{text || ""}</Typography>
                </Styled.Text>
            </Styled.Body>
            {image ? <ThumbnailList accountKey={accountKey} columnKey={columnKey} lists={image}/>
                : <div />}
        </Styled.Root>
    )
});

export default Status;
