import * as React from "react";
import { styled } from "@styled";
import { IUser, UserProperties } from "@tsuruclient/datatype";
import { UserCard } from "../../Card/UserCard";
import { Typography } from "@material-ui/core";

interface UserEventComponentProps {
    sourceUser: IUser[];
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
    `
};

export const UserEvent: React.FC<UserEventComponentProps> = (props: UserEventComponentProps) => {
    const sourceUsersDisplayName = props.sourceUser.reduce(
        (prev, curr, i, source) =>
            prev + curr[UserProperties.displayName] || "no name" + (source.length - 1 !== i ? ", " : ""),
        ""
    );
    return (
        <Styled.Root>
            <Typography>{sourceUsersDisplayName + " " + props.eventContext}</Typography>
            {props.sourceUser.map(v => (
                <UserCard
                    key={v[UserProperties.id]}
                    account={props.account}
                    id={v[UserProperties.id]}
                    displayName={v[UserProperties.displayName]}
                    screenName={v[UserProperties.screenName]}
                    avatar={v[UserProperties.avatarImage]}
                    header={v[UserProperties.headerImage]}
                />
            ))}
        </Styled.Root>
    );
};
