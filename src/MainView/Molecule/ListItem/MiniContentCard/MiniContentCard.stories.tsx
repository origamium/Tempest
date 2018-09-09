/*tslint:disable*/
import * as React from 'react';
import {storiesOf} from '@storybook/react';
import {withKnobs, text} from '@storybook/addon-knobs';
import {action} from '@storybook/addon-actions';
import centered from '@storybook/addon-centered';
import {withInfo} from "@storybook/addon-info";
import {Theme, ThemeProvider} from '../../../../Theme/style'

import {StatusCard_} from "./StatusCard";
import {UserCard_} from "./UserCard";

import Icons from '../../../../__testdata__/icon/icon';
import Headers from '../../../../__testdata__/header/header';

const sampleId = 'sample-id-0123456789';

storiesOf("MainView|Content/Card/StatusCard", module)
    .addDecorator(centered)
    .addDecorator(withKnobs)
    .add('info', withInfo("")(
        () => (
            <ThemeProvider theme={Theme.Light}>
                <StatusCard_
                    account={text('account', 'accountid@example.org')}
                    target={{
                        id: text('id', sampleId),
                        text: text('status text', 'yeah'),
                        date: text('status date', '1234 56 78, 9:12.3'),
                        user: {
                            id: text('source user id', '123456789abcdef'),
                            screenName: text('screen name', 'arclisp'),
                        }
                    }}
                    handleClick={action('status clicked!')}/>
            </ThemeProvider>
        )
    ))
;

storiesOf("MainView|Content/Card/AccountCard", module)
    .addDecorator(centered)
    .addDecorator(withKnobs)
    .add('info', withInfo("")(
        () => (
            <ThemeProvider theme={Theme.Light}>
                <UserCard_
                    account={text('account', 'accountid@example.org')}
                    id={text('id', sampleId)}
                    displayName={text("displayName", "シミュラクラ")}
                    screenName={text("screenName", "twitter.com@arclisp")}
                    avatar={Icons.origami}
                    header={Headers.sample}
                    handleClick={action('status clicked!')}/>
            </ThemeProvider>
        )
    ))
;
