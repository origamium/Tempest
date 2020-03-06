import {ArticleType, EventType} from "./Enum";

export interface Article {
    articleType: ArticleType;
    eventType?: EventType;
}

export interface EventArticle extends Article{
    articleType: ArticleType.event,
    eventType: EventType
}
