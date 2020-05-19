import React from "react";
import { Status } from "./Contents/Status";
import { Event } from "./Contents/Event";
import { UserEvent } from "./Contents/UserEvent";
import { IStatus } from "../../datatype/Contents/Article/Status";
import { EventProperties, IEvent } from "../../datatype/Contents/Article/Event";
import { ArticleType, EventType } from "../../datatype/Contents/Article/Enum";
import { IUICommonAttribute } from "../../datatype/UI/UICommonAttribute";

export interface ContentProps extends IUICommonAttribute {
    target: IStatus | IEvent;
}

export const Content: React.FC<ContentProps> = ({ target, ...rest }) => {
    switch (target.article.articleType) {
        case ArticleType.status:
            return <Status target={target as IStatus} {...rest} />;
        case ArticleType.event:
            switch ((target as IEvent)[EventProperties.article].eventType) {
                case EventType.reaction:
                    return <Event eventContext={"はい"} target={target as IEvent} {...rest} />;
                case EventType.followed:
                    // eslint-disable-next-line no-case-declarations
                    const sourceUser = (target as IEvent)[EventProperties.sourceUser];
                    return <UserEvent eventContext={"はい"} {...rest} sourceUser={sourceUser} />;
                default:
                    console.error("EventType dont matching: ", { target });
                    return <div />;
            }
        default:
            console.error("ArticleType dont matching: ", { target });
            return <div />;
    }
};
