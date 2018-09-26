/*tslint:disable*/
import * as React from 'react';
import { storiesOf } from "@storybook/react";
import centered from '@storybook/addon-centered';
import { withInfo } from "@storybook/addon-info";
import { withKnobs, text, number } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";

import Form from './Form';
import { Field_ } from "./Atom/Field";

const StoryNamePrefix = "Common Components|Form/";

const sampleAccountId = "arclisp@twitter.com";
const sampleId = 'arclisp@twitter.com:1:01';

storiesOf(StoryNamePrefix + "Atom/Field", module)
    .addDecorator(centered)
    .addDecorator(withKnobs)
    .add('info', withInfo("")(
        () => (
            <Field_ id={text("id", sampleId)} value={text('value', "yeah")} handleChange={action('field onChange')}/>
        )
    ))

storiesOf("Common Components|Form", module)
    .addDecorator(centered)
    .addDecorator(withKnobs)
    .add('info', withInfo("")(
        () => (
            <Form account={text('account id', sampleAccountId)}
                  id={text("id", sampleId)}
                  maxTextLength={number("max text length", 140)}
                  handleFileUpload={action('request file upload')}
                  requestPost={action('request post!')}/>
        )
    ))
