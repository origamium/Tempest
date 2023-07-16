import { IStatus } from "../../../datatype/Contents/Article/Status";
import { ArticleIdentifier, EventIdentifier } from "../../../datatype/Contents/Article/ArticleIdentifier";
import { User1, User2 } from "../../__testdata__/User";
import { IEvent } from "../../../datatype/Contents/Article/Event";
import { IUICommonAttribute } from "../../../datatype/UI/UICommonAttribute";
import { text } from "@storybook/addon-knobs";

export const Status1: IStatus = {
    article: {
        articleType: ArticleIdentifier.status,
    },
    id: "1234567",
    user: User1,
    date: Date.now().toString(),
    text: "129010398098510924805839240180539174851907937180935479157849012983457809170593741092759018237490179832471058012484",
    isThread: false,
};

export const Event1: IEvent = {
    article: {
        articleType: ArticleIdentifier.event,
        eventType: EventIdentifier.followed,
    },
    id: "yeah",
    sourceUser: [User1],
};

export const Event2: IEvent = {
    article: {
        articleType: ArticleIdentifier.event,
        eventType: EventIdentifier.reaction,
    },
    id: "yeah",
    sourceUser: [User1, User2, User1],
    target: Status1,
};

export const UIColumnAttr: IUICommonAttribute = {
    account: "8372890750982",
    column: "3824984847479",
};

export const SampleStatus: IStatus = {
    article: {
        articleType: ArticleIdentifier.status,
    },
    id: "arclisp",
    user: {
        id: "12345678",
    },
    text: text(
        "text",
        "1245690923480284340182304710735401485729304175984721905731928074589123705912470957140295701 #yeah https://superrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrlongurl.origamium.net",
    ),
    date: Date.now().toString(),
    isThread: false,
};
