/*tslint:disable*/
import * as React from 'react';
import {storiesOf} from '@storybook/react';
import {withKnobs/*, text*/} from '@storybook/addon-knobs';
//import {action} from '@storybook/addon-actions';
import centered from '@storybook/addon-centered';
import {withInfo} from "@storybook/addon-info";
//import {Theme, ThemeProvider} from '../../Theme/style'

// import Content from './Content';
import Status from './Contents/Status';
import {ArticleType} from "../../../lib/data";
// import Event from './Contents/Event';
// import UserEvent from './Contents/UserEvenet';

const StoryPrefix = "Common Components|Status";
storiesOf(StoryPrefix+"/Status", module)
    .addDecorator(centered)
    .addDecorator(withKnobs)
    .add('info', withInfo("")(
    () => (
        <div style={{border: "solid 1px black"}}>
            <Status accountKey={""} columnKey={""}
                type={ArticleType.status}
                id={"arclisp"}
                user={{
                    id: "12345678",
                }}
                text={"yeah"}
                date={Date.now().toString()}
                isThread={false}/>
        </div>
    )
))
