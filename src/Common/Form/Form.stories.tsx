/*tslint:disable*/
import * as React from 'react';
import { storiesOf } from "@storybook/react";
import centered from '@storybook/addon-centered';
import { text, number } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";

import Form from './Form';
import { Field } from "./Field";
// import icon from "../../__testdata__/icon/icon";

const StoryNamePrefix = "Common Components|Form";

const sampleAccountId = "arclisp@twitter.com";
const sampleId = 'arclisp@twitter.com:1:01';

class FormReplyComponent extends React.Component {
    handleReplyUpdate = ({handleAddReply}) => {
        handleAddReply({
            id: text('id', sampleId),
            text: text('status text', 'To see a World in a Grain of Sand And a Heaven in a Wild Flower, Hold Infinity in the palm of your hand And Eternity in an hour.'),
            date: text('status date', '1234 56 78, 9:12.3'),
            user: {
                id: text('source user id', '123456789abcdef'),
                screenName: text('screen name', 'arclisp'),
                avatarImage: "https://www.poets.org/sites/default/files/styles/286x289/public/images/biographies/wblake.jpg?itok=EbtI4Ba0",
            }
        });
    };

    render(){
        return (
            <div style={{width: "320px"}}>
            <Form account={text('account id', sampleAccountId)}
                  column={text('column id', '123456')}
                  maxTextLength={number("max text length", 140)}
                  handleClickReply={action('reply source clicked!')}
                  requestPost={action('request post!')}
                  registerColumn={this.handleReplyUpdate}/>
            </div>
        )
    }
}

storiesOf(StoryNamePrefix + "/Field", module)
    .addDecorator(centered)
    .add('info',() => (
        <Field id={text("id", sampleId)} value={text('value', "yeah")} handleChange={action('field onChange')}/>
    ),
        {}
    )
;
storiesOf(StoryNamePrefix, module)
    .addDecorator(centered)
    .add('simple info', () => (
        <Form account={text('account id', sampleAccountId)}
            column={text('column id', '123456')}
            maxTextLength={number("max text length", 140)}
            handleClickReply={action('reply source clicked!')}
            requestPost={action('request post!')}
            registerColumn={action('registered!')}/>
        ),
        {})
    .add('need file upload procedure',() => (
        <Form account={text('account id', sampleAccountId)}
            column={text('column id', '123456')}
            maxTextLength={number("max text length", 140)}
            handleFileUpload={action('file upload procedure')}
            handleClickReply={action('reply source clicked!')}
            requestPost={action('request post!')}
            registerColumn={action('registered!')}/>
        ),
        {})
    .add('reply data', () => (
        <FormReplyComponent/>
    ),
        {})
;
