/*tslint:disable*/
import * as React from 'react';
import {storiesOf} from '@storybook/react';
import {text} from '@storybook/addon-knobs';
import {action} from '@storybook/addon-actions';
import centered from '@storybook/addon-centered';
import {ArticleType} from "@tsuruclient/datatype";

import {StatusCard} from "./StatusCard";
import {UserCard} from "./UserCard";

import Icons from '../../__testdata__/icon/icon';
import Headers from '../../__testdata__/header/header';
import icon from "../../__testdata__/icon/icon";

const sampleId = 'sample-id-0123456789';
const StoryPrefix = 'Common Components|Card';
storiesOf(StoryPrefix+"/StatusCard", module)
    .addDecorator(centered)
    .add('info', () => (
            <StatusCard
                accountKey={text('accountKey', 'accountid@example.org')}
                target={{
                    type: ArticleType.status,
                    id: text('id', sampleId),
                    text: text('status text', 'yeah'),
                    date: text('status date', '1234 56 78, 9:12.3'),
                    user: {
                        id: text('source user id', '123456789abcdef'),
                        screenName: text('screen name', 'arclisp'),
                        avatarImage: icon.simulacla,
                    },
                    isThread: false,
                }}
                handleClick={action('status clicked!')}/>
        ),
        {}
    )
;

storiesOf(StoryPrefix+"/AccountCard", module)
    .addDecorator(centered)
    .add('info', () => (
            <UserCard
                account={text('accountKey', 'accountid@example.org')}
                id={text('id', sampleId)}
                displayName={text("displayName", "シミュラクラ")}
                screenName={text("screenName", "twitter.com@arclisp")}
                avatar={Icons.origami}
                header={Headers.sample}
                handleClick={action('status clicked!')}/>
        ),
        {}
    )
;
