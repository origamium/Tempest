/*eslint:disable*/
import React from 'react';
import {storiesOf} from '@storybook/react';
import {text} from '@storybook/addon-knobs';
import centered from '@storybook/addon-centered';

// import Content from './Content';
import {Status} from './Contents/Status';
import { ArticleType, EventType, IEvent, IStatus, IUICommonAttribuite } from "@tsuruclient/datatype";
import {Event} from './Contents/Event';
import {UserEvent} from './Contents/UserEvent';
import { User1, User2 } from "../../__testdata__/User";

const Status1: IStatus = {
    type: ArticleType.status,
    id: "1234567",
    user: User1,
    date: Date.now().toString(),
    text: "129010398098510924805839240180539174851907937180935479157849012983457809170593741092759018237490179832471058012484",
    isThread: false
}

const Event1: IEvent = {
    type: ArticleType.event,
    id: "yeah",
    eventName: EventType.reaction,
    sourceUser: [User1]
}

const Event2: IEvent = {
    type: ArticleType.event,
    id: "yeah",
    eventName: EventType.reaction,
    sourceUser: [User1, User2, User1],
    target: Status1
}

const UIColumnAttr: IUICommonAttribuite = {
    account: "8372890750982",
    column: "3824984847479"
}

const StoryPrefix = "Common Components|Status";
storiesOf(StoryPrefix+"/Status", module)
    .addDecorator(centered)
    .add('info',() => (
        <div style={{border: "solid 1px black", width: "280px"}}>
            <Status
                {...UIColumnAttr}
                type={ArticleType.status}
                id={"arclisp"}
                user={{
                    id: "12345678",
                }}
                text={text('text', "1245690923480284340182304710735401485729304175984721905731928074589123705912470957140295701 #yeah https://superrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrlongurl.origamium.net")}
                date={Date.now().toString()}
                isThread={false}/>
        </div>
    ), {})
;

storiesOf(StoryPrefix+"/Event", module)
    .addDecorator(centered)
    .add('info', () => (
        <div style={{border: "solid 1px black", width: "280px"}}>
            <Event {...UIColumnAttr} eventContext={"retweeted you"} {...Event1}/>
        </div>
    ))
    .add('Multiple source user', () => (
      <div style={{border: "solid 1px black", width: "280px"}}>
          <Event {...UIColumnAttr} eventContext={"liked your tweet"} {...Event2}/>
      </div>
  ))
;

storiesOf(StoryPrefix+"/UserEvent", module)
    .addDecorator(centered)
    .add('info', () => (
        <div style={{border: "solid 1px black", width: "280px"}}>
            <UserEvent account={"moha"} column={"yeah"} eventContext={"followed you"} {...User1}/>
        </div>
    ))
