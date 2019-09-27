/* tslint: disable */
import * as React from 'react';
import {storiesOf} from '@storybook/react';
import {text} from '@storybook/addon-knobs';
import {action} from '@storybook/addon-actions';
import centered from '@storybook/addon-centered';

import {Text_ as Text} from './Text';

const StoryPrefix = 'Common Components|Text';
const initText = `はい #no https://google.com @arclisp`;


storiesOf(StoryPrefix, module)
    .addDecorator(centered)
    .add('info',() => (
        <Text text={text('source', initText)} handleLinkClick={action('clicked')}/>
    ),
    {}
    )
    .add('too long url', () => (
        <Text text={'https://superloooooooooooooooooooooooooooooooooooooooooooongurl.origamium.net/'} handleLinkClick={action('clicked')}/>
    ));
