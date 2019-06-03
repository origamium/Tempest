import { ArticleType, EventType, IEvent, IStatus, IUICommonAttribuite } from "@tsuruclient/datatype";
import { Status } from "./Contents/Status";

export interface ContentProps extends IUICommonAttribuite {
    articleType: ArticleType;
    eventType?: EventType;
    article: IStatus | IEvent
}

export const Content = (props: ContentProps) => {
    switch (props.articleType) {
        case ArticleType.status:
            return <Status/>
    }
}
