import React from "react";
import { Status } from "./Contents/Status";
import { Event } from "./Contents/Event";
import { UserEvent } from "./Contents/UserEvent";
import { IStatus } from "../../../datatype/Contents/Article/Status";
import { EventProperties, IEvent } from "../../../datatype/Contents/Article/Event";
import { ArticleIdentifier, EventIdentifier } from "../../../datatype/Contents/Article/ArticleIdentifier";
import { IUICommonAttribute } from "../../../datatype/UI/UICommonAttribute";
import { ArticleType } from "../../../datatype/Contents/Article/ArticleType";

export interface ContentProps extends IUICommonAttribute {
    measure: () => void;
    target: ArticleType;
}

export const Content: React.FC<ContentProps> = ({ target, ...rest }) => {
    return <Status target={target as IStatus} {...rest} />;
    switch (target.article.articleType) {
        case ArticleIdentifier.status:
            return <Status target={target as IStatus} {...rest} />;
        case ArticleIdentifier.event:
            switch ((target as IEvent)[EventProperties.article].eventType) {
                case EventIdentifier.reaction:
                    return <Event eventContext={"はい"} target={target as IEvent} {...rest} />;
                case EventIdentifier.followed:
                    // eslint-disable-next-line no-case-declarations
                    const sourceUser = (target as IEvent)[EventProperties.sourceUser];
                    return <UserEvent eventContext={"はい"} {...rest} sourceUser={sourceUser} />;
                default:
                    console.error("EventIdentifier dont matching: ", { target });
                    return <div />;
            }
        default:
            console.error("ArticleIdentifier dont matching: ", { target });
            return <div />;
    }
};
