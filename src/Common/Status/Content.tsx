import React from "react";
import { ArticleType, EventProperties, EventType, IEvent, IStatus, IUICommonAttribuite } from "@tsuruclient/datatype";
import { Status } from "./Contents/Status";
import { Event } from "./Contents/Event";
import { UserEvent } from "./Contents/UserEvent";

export interface ContentProps {
    uiCommonAttr: IUICommonAttribuite;
    target: IStatus | IEvent;
}

export const Content: React.FC<ContentProps> = (props: ContentProps) => {
    switch (props.target.article.articleType) {
        case ArticleType.status:
            return <Status target={props.target as IStatus} {...props.uiCommonAttr} />;
        case ArticleType.event:
            switch ((props.target as IEvent)[EventProperties.article].eventType) {
                case EventType.reaction:
                    return <Event eventContext={"はい"} target={props.target as IEvent} {...props.uiCommonAttr} />;
                case EventType.followed:
                    // eslint-disable-next-line no-case-declarations
                    const sourceUser = (props.target as IEvent)[EventProperties.sourceUser];
                    return <UserEvent eventContext={"はい"} {...props.uiCommonAttr} sourceUser={sourceUser} />;
                default:
                    console.error("EventType dont matching: ", { props });
                    return <div />;
            }
        default:
            console.error("ArticleType dont matching: ", { props });
            return <div />;
    }
};
