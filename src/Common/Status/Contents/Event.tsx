import * as React from "react";
import styled from "@styled/style";
import { EventProperties, IEvent } from "@data/src/Contents/Article/Event";
import { Typography } from "@material-ui/core";
import { StatusCard } from "../../Card/StatusCard";

interface EventComponentProps extends IEvent {
    account: string,
    column: string,
}

const Styled = {
    Root: styled.div`
       width: 100%;
       display: flex;
       flex-direction: column;
    `,
    Header: styled.div`
        align-self: flex-start;
`,
    Body: styled.div`
        padding: 0.2em 1em;
`,
};

export const Event: React.FC<EventComponentProps> = React.memo((props: EventComponentProps) => {
    const target = props[EventProperties.target];
    return (
        <Styled.Root>
            <Styled.Header>
                <Typography>{"woaaaa"}</Typography>
            </Styled.Header>
            <Styled.Body>
                {target ?
                <StatusCard
                    accountKey={props.account}
                    target={target}
                    /> : null }
            </Styled.Body>
        </Styled.Root>
    )
})
