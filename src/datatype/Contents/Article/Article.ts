import { ArticleIdentifier, EventIdentifier } from "./ArticleIdentifier";

export interface Article {
    articleType: ArticleIdentifier;
    eventType?: EventIdentifier;
}

export interface EventArticle extends Article {
    articleType: ArticleIdentifier.event;
    eventType: EventIdentifier;
}
