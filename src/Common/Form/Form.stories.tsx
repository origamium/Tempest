/*tslint:disable*/
import * as React from 'react';
import { storiesOf } from "@storybook/react";
import centered from '@storybook/addon-centered';
import { withInfo } from "@storybook/addon-info";
import { withKnobs, text, number } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";

import Form from './Form';
import { Field_ } from "./Field";

const StoryNamePrefix = "Common Components|Form";

const sampleAccountId = "arclisp@twitter.com";
const sampleId = 'arclisp@twitter.com:1:01';

storiesOf(StoryNamePrefix + "/Field", module)
    .addDecorator(centered)
    .addDecorator(withKnobs)
    .add('info', withInfo("")(
        () => (
            <Field_ id={text("id", sampleId)} value={text('value', "yeah")} handleChange={action('field onChange')}/>
        )
    ))

storiesOf(StoryNamePrefix, module)
    .addDecorator(centered)
    .addDecorator(withKnobs)
    .add('simple info', withInfo("")(
        () => (
            <Form account={text('account id', sampleAccountId)}
                  columnId={text('column id', '123456')}
                  maxTextLength={number("max text length", 140)}
                  handleClickReply={action('reply source clicked!')}
                  requestPost={action('request post!')}/>
        )
    ))
    .add('need file upload procedure' ,withInfo("")(
        () => (
            <Form account={text('account id', sampleAccountId)}
                  columnId={text('column id', '123456')}
                  maxTextLength={number("max text length", 140)}
                  handleFileUpload={action('file upload procedure')}
                  handleClickReply={action('reply source clicked!')}
                  requestPost={action('request post!')}/>
        )
    ))
