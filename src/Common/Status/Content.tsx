import React from "react";
import { Status } from "./Contents/Status";
import { Event } from "./Contents/Event";
import { UserEvent } from "./Contents/UserEvent";
import { IStatus } from "../../datatype/Contents/Article/Status";
import { EventProperties, IEvent } from "../../datatype/Contents/Article/Event";
import { ArticleType, EventType } from "../../datatype/Contents/Article/Enum";
import { IUICommonAttribute } from "../../datatype/UI/UICommonAttribute";

export interface ContentProps {
    uiCommonAttr: IUICommonAttribute;
    target: IStatus | IEvent;
}

export const Content: React.FC<ContentProps> = (props) => {
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
