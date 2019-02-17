/*tslint:disable*/
import * as React from 'react';
import {storiesOf} from '@storybook/react';
import {text} from '@storybook/addon-knobs';
import centered from '@storybook/addon-centered';
//import {Theme, ThemeProvider} from '../../Theme/style'

// import Content from './Content';
import Status from './Contents/Status';
import {ArticleType} from "../../../lib/data";
// import Event from './Contents/Event';
// import UserEvent from './Contents/UserEvenet';

const StoryPrefix = "Common Components|Status";
storiesOf(StoryPrefix+"/Status", module)
    .addDecorator(centered)
    .add('info',() => (
        <div style={{border: "solid 1px black", width: "280px"}}>
            <Status
                accountKey={""}
                columnKey={""}
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
