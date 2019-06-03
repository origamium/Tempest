import * as React from "react";
import styled from "styled-components";
import { Avatar, Typography } from "@material-ui/core";
import { ThumbnailList } from "../../Thumbnail/ThumbnailList";
import Text from "../../Text/Text";
import { IStatus, IUICommonAttribuite, UserProperties } from "@tsuruclient/datatype";
import { rendererEvents } from "@tsuruclient/events";

export interface IStatusProps extends IStatus, IUICommonAttribuite {}

const Styled = {
    Root: styled.div`
        display: flex;
        flex-direction: column;
        padding: 0.5em;
    `,
    Body: styled.div`
        display: flex;
        & > * {
            margin: 0 2px;
        }
    `,
    Text: styled.section`
        word-wrap: break-word;
        overflow-wrap: break-word;
        overflow-x: hidden;
    `
};

export const Status: React.FunctionComponent<IStatusProps> = (props: IStatusProps) => {
    const { user, text, image, column, account } = props;

    const handleLinkClick = (href: string): void => {
        rendererEvents.handleLinkClick(account, column, href);
    };

    const handleAccountClick = (e): void => {
        rendererEvents.handleUserClick(account, column, user[UserProperties.id]);
    };

    const screenName = (name?: string) => (name ? "@" + name : "");

    return (
        <Styled.Root>
            <Styled.Body>
                {user[UserProperties.avatarImage] ? (
                    <Avatar src={user[UserProperties.avatarImage]} onClick={handleAccountClick} />
                ) : (
                    <Avatar onClick={handleAccountClick}>{"?"}</Avatar>
                )}
                <Styled.Text>
                    <Typography variant="caption">
                        {(user[UserProperties.displayName] || "") + screenName(user[UserProperties.screenName])}
                    </Typography>
                    <Text variant="body1" text={text || ""} handleLinkClick={handleLinkClick} />
                </Styled.Text>
            </Styled.Body>
            {image ? <ThumbnailList account={account} column={column} lists={image} /> : <div />}
        </Styled.Root>
    );
};
