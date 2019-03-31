import * as React from 'react';
import styled from 'styled-components';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import ThumbnailList from '../../Thumbnail/ThumbnailList';
import Text from '../../Text/Text';
import {IStatus, UserProperties} from "@data";
import {rendererEvents} from "@events";

export interface IStatusProps extends IStatus  {
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

export const Status: React.FunctionComponent<IStatusProps> = React.memo((props: IStatusProps) => {
    const {user, text, image, columnKey, accountKey} = props;

    const handleLinkClick = (href: string): void => {
        rendererEvents.handleLinkClick(accountKey, columnKey, href)
    };

    const handleAccountClick = (e): void => {
        rendererEvents.handleUserClick(accountKey, columnKey, user[UserProperties.id])
    };

    const screenName = (name?: string) => (
        name ? "@" + name : ""
    );

    return (
        <Styled.Root>
            <Styled.Body>
                {user[UserProperties.avatarImage] ?
                    <Avatar src={user[UserProperties.avatarImage]}
                        onClick={handleAccountClick} /> :
                    <Avatar onClick={handleAccountClick}>{"?"}</Avatar>}
                <Styled.Text>
                    <Typography variant="caption">
                        {(user[UserProperties.displayName] || "") + screenName(user[UserProperties.screenName])}
                    </Typography>
                    <Text variant="body1" text={(text || "")} handleLinkClick={handleLinkClick}/>
                </Styled.Text>
            </Styled.Body>
            {image ? <ThumbnailList accountKey={accountKey} columnKey={columnKey} lists={image}/>
                : <div />}
        </Styled.Root>
    )
});

export default Status;