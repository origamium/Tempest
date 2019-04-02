/*tslint:disable*/
import * as React from 'react';
import { storiesOf } from "@storybook/react";
import centered from '@storybook/addon-centered';
import {AccountIcon} from "./AccountIcon";
import * as origamiIcon from '../__testdata__/icon/origami.png'
import { IUser } from "@data";

const User1: IUser = {
    id: "123456",
    screenName: "arclisp",
    displayName: "東武鉄道遅延伝説2019",
    providerDomain: 'twitter.com',
    avatarImage: origamiIcon,
    headerImage: undefined,
    introduction: undefined,
    location: undefined,
    userWebPageUrl: undefined,
    pinnedObject: undefined
}

const StoryPrefix = 'Sidebar|';

storiesOf(StoryPrefix+'AccountIcon', module)
    .addDecorator(centered)
    .add('info', () => (
        <AccountIcon {...User1}/>
    ))
