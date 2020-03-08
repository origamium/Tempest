import { IStatus } from "./Status";
import { IUser } from "../User";
import { EventArticle } from "./Article";

export enum EventProperties {
    article = "article",
    id = "id",
    sourceUser = "sourceUser",
    target = "target"
}

export interface IEvent {
    [EventProperties.article]: EventArticle;
    [EventProperties.id]: string;
    [EventProperties.sourceUser]: IUser[];
    [EventProperties.target]?: IStatus;
}
