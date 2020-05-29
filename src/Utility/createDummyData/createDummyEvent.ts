import { IEvent } from "../../datatype/Contents/Article/Event";
import { ArticleIdentifier, EventIdentifier } from "../../datatype/Contents/Article/ArticleIdentifier";
import { nanoid } from "nanoid";
import { createDummyUser } from "./createDummyUser";
import { createDummyStatus } from "./createDummyStatus";

export const createDummyFollowedEvent = (): IEvent => ({
    id: nanoid(10),
    article: { articleType: ArticleIdentifier.event, eventType: EventIdentifier.followed },
    sourceUser: Array.from({ length: Math.floor(Math.random() * 10) })
        .fill(null)
        .map(() => createDummyUser()),
});

export const createDummyReactionEvent = (): IEvent => ({
    id: nanoid(10),
    article: { articleType: ArticleIdentifier.event, eventType: EventIdentifier.reaction },
    sourceUser: Array.from({ length: Math.floor(Math.random() * 10) })
        .fill(null)
        .map(() => createDummyUser()),
    target: createDummyStatus(),
});
