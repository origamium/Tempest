/*eslint:disable*/
import React from "react";
import { storiesOf } from "@storybook/react";
import { text } from "@storybook/addon-knobs";
import centered from "@storybook/addon-centered/react";

// import Content from './Content';
import { Status } from "./Contents/Status";
import { Event } from "./Contents/Event";
import { UserEvent } from "./Contents/UserEvent";
import { User1, User2 } from "../../__testdata__/User";
import { Content } from "./Content";
import { IStatus } from "../../datatype/Contents/Article/Status";
import { IEvent } from "../../datatype/Contents/Article/Event";
import { ArticleType, EventType } from "../../datatype/Contents/Article/Enum";
import { IUICommonAttribute } from "../../datatype/UI/UICommonAttribute";

const Status1: IStatus = {
    article: {
        articleType: ArticleType.status,
    },
    id: "1234567",
    user: User1,
    date: Date.now().toString(),
    text:
        "129010398098510924805839240180539174851907937180935479157849012983457809170593741092759018237490179832471058012484",
    isThread: false,
};

const Event1: IEvent = {
    article: {
        articleType: ArticleType.event,
        eventType: EventType.followed,
    },
    id: "yeah",
    sourceUser: [User1],
};

const Event2: IEvent = {
    article: {
        articleType: ArticleType.event,
        eventType: EventType.reaction,
    },
    id: "yeah",
    sourceUser: [User1, User2, User1],
    target: Status1,
};

const UIColumnAttr: IUICommonAttribute = {
    account: "8372890750982",
    column: "3824984847479",
};

const SampleStatus: IStatus = {
    article: {
        articleType: ArticleType.status,
    },
    id: "arclisp",
    user: {
        id: "12345678",
    },
    text: text(
        "text",
        "1245690923480284340182304710735401485729304175984721905731928074589123705912470957140295701 #yeah https://superrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrlongurl.origamium.net"
    ),
    date: Date.now().toString(),
    isThread: false,
};

const StoryPrefix = "Common Components|Content";

storiesOf(StoryPrefix, module)
    .addDecorator(centered)
    .add("status", () => <Content uiCommonAttr={UIColumnAttr} target={SampleStatus} />)
    .add("event", () => <Event uiCommonAttr={UIColumnAttr} target={Event2} eventContext={"やりました"} />);

storiesOf(StoryPrefix + "/Element/Status", module)
    .addDecorator(centered)
    .add(
        "info",
        () => (
            <div style={{ border: "solid 1px black", width: "280px" }}>
                <Status {...UIColumnAttr} target={SampleStatus} />
            </div>
        ),
        {}
    );

storiesOf(StoryPrefix + "/Element/Event", module)
    .addDecorator(centered)
    .add("info", () => (
        <div style={{ border: "solid 1px black", width: "280px" }}>
            <Event uiCommonAttr={UIColumnAttr} eventContext={"retweeted you"} target={Event1} />
        </div>
    ))
    .add("Multiple source user", () => (
        <div style={{ border: "solid 1px black", width: "280px" }}>
            <Event uiCommonAttr={UIColumnAttr} eventContext={"liked your tweet"} target={Event2} />
        </div>
    ));

storiesOf(StoryPrefix + "/Element/UserEvent", module)
    .addDecorator(centered)
    .add("info", () => (
        <div style={{ border: "solid 1px black", width: "280px" }}>
            <UserEvent account={"moha"} column={"yeah"} eventContext={"followed you"} sourceUser={[User1, User2]} />
        </div>
    ));
