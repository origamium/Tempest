import * as React from "react";
import { styled } from "../../../Theme";
import { Typography } from "@material-ui/core";
import { StatusCard } from "../../Card/StatusCard";
import { UserProperties } from "../../../datatype/Contents/User";
import { EventProperties, IEvent } from "../../../datatype/Contents/Article/Event";
import { IUICommonAttribute } from "../../../datatype/UI/UICommonAttribute";

interface EventComponentProps extends IUICommonAttribute {
    target: IEvent;
    eventContext: string;
}

const Styled = {
    Root: styled.div`
        display: flex;
        flex-direction: column;
        width: 100%;
        padding: 0.5em;
    `,
    Header: styled.div`
        align-self: flex-start;
    `,
    Body: styled.div`
        padding: 0.2em 0;
    `,
};

export const Event: React.FC<EventComponentProps> = (props) => {
    const target = props.target[EventProperties.target];

    const headingText = React.useMemo(() => {
        return (
            props.target[EventProperties.sourceUser].reduce(
                (prev, curr, i, source) =>
                    prev + (curr[UserProperties.displayName] || "no name") + (source.length - 1 !== i ? ", " : " "),
                ""
            ) + props.eventContext
        );
    }, [props.eventContext, props.target]);

    return (
        <Styled.Root>
            <Styled.Header>
                <Typography>{headingText}</Typography>
            </Styled.Header>
            {target && (
                <Styled.Body>
                    <StatusCard account={props.account} target={target} />
                </Styled.Body>
            )}
        </Styled.Root>
    );
};
