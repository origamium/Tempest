import * as React from "react";
import { styled } from "@styled";
import { EventProperties, IEvent, UserProperties } from "@tsuruclient/datatype";
import { Typography } from "@material-ui/core";
import { StatusCard } from "../../Card/StatusCard";

interface EventComponentProps {
    account: string;
    column: string;
    target: IEvent;
    eventContext: string;
}

const Styled = {
    Root: styled.div`
        width: 100%;
        display: flex;
        flex-direction: column;
        padding: 0.5em;
    `,
    Header: styled.div`
        align-self: flex-start;
    `,
    Body: styled.div`
        padding: 0.2em 0;
    `
};

export const Event: React.FC<EventComponentProps> = (props: EventComponentProps) => {
    const target = props.target[EventProperties.target];

    const headingText: string =
        props[EventProperties.sourceUser][0][UserProperties.displayName] +
        (props[EventProperties.sourceUser].length > 1 ? " and some user " : " ") +
        props.eventContext;

    return (
        <Styled.Root>
            <Styled.Header>
                <Typography>{headingText}</Typography>
            </Styled.Header>
            {target && (
                <Styled.Body>
                    {" "}
                    <StatusCard account={props.account} target={target} />{" "}
                </Styled.Body>
            )}
        </Styled.Root>
    );
};
