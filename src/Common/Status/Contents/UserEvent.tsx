import * as React from "react";
import {styled} from "@styled";
import { IUser, UserProperties } from "@tsuruclient/datatype";
import { UserCard } from "../../Card/UserCard";
import { Typography } from "@material-ui/core";

interface UserEventComponentProps extends IUser {
    eventContext: string;
    account: string;
    column: string;
}

const Styled = {
    Root: styled.div`
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        padding: 0.5em;
        
        & > * {
            margin: 0.4em 0;
        }
    `,
}

export const UserEvent: React.FC<UserEventComponentProps> = React.memo((props: UserEventComponentProps) => {
    return (
        <Styled.Root>
            <Typography>{props[UserProperties.displayName] + " " + props.eventContext}</Typography>
            <UserCard
                account={props.account}
                id={props[UserProperties.id]}
                displayName={props[UserProperties.displayName]}
                screenName={props[UserProperties.screenName]}
                avatar={props[UserProperties.avatarImage]}
                header={props[UserProperties.headerImage]}
            />
        </Styled.Root>
    );
})

export default UserEvent;
