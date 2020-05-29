import * as React from "react";
import { styled } from "../../../Theme";
import { Avatar, Typography } from "@material-ui/core";
import { ThumbnailList } from "../../Thumbnail";
import { Text } from "../../Text/Text";
import { IStatus } from "../../../datatype/Contents/Article/Status";
import { UserProperties } from "../../../datatype/Contents/User";
import { EntityWithIndices } from "twitter-text";

export interface IStatusProps {
    account: string;
    column: string;
    measure: () => void;
    target: IStatus;
}

const Styled = {
    Root: styled.div`
        height: 100%;
        padding: 0.5em;
    `,
    Body: styled.span`
        display: inline-flex;
        & > * {
            margin: 0 2px;
        }
    `,
    Text: styled(Typography)`
        overflow-x: hidden;
        word-break: break-all;
        word-wrap: break-word;
        overflow-wrap: break-word;
    `,
};

export const Status: React.FunctionComponent<IStatusProps> = (props) => {
    const { column, account, measure } = props;
    const { user, text, image } = props.target;

    const handleLinkClick = React.useCallback((href: EntityWithIndices): void => {
        //rendererEvents.handleLinkClick(account, column, href);
    }, []);

    const handleAccountClick = React.useCallback(() => {
        //rendererEvents.handleUserClick(account, column, user[UserProperties.id]);
    }, []);

    const screenName = React.useCallback((name?: string) => (name ? "@" + name : ""), []);

    return (
        <Styled.Root>
            <Styled.Body>
                {user[UserProperties.avatarImage] ? (
                    <Avatar src={user[UserProperties.avatarImage]} onClick={handleAccountClick} />
                ) : (
                    <Avatar onClick={handleAccountClick}>{"?"}</Avatar>
                )}
                <div>
                    <Styled.Text variant="caption">
                        {(user[UserProperties.displayName] || "") + screenName(user[UserProperties.screenName])}
                    </Styled.Text>
                    <Text variant="body1" text={text || ""} handleLinkClick={handleLinkClick} />
                </div>
            </Styled.Body>
            {image?.length > 0 ? (
                <ThumbnailList account={account} column={column} lists={image} measure={measure} />
            ) : (
                <div />
            )}
        </Styled.Root>
    );
};
