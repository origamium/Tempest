/*tslint:disable*/
import * as React from 'react';
import { storiesOf } from "@storybook/react";
import centered from '@storybook/addon-centered';
import { withInfo } from "@storybook/addon-info";
import {boolean, withKnobs} from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import {Thumbnail} from "./Thumbnail";

import origamiIcon from '../../__testdata__/icon/origami.png';
import simulaculaIcon from '../../__testdata__/icon/simulacla.jpg';

import {withNotes} from "@storybook/addon-notes";
import {ThumbnailList} from "./ThumbnailList";

const box = (story) => <div style={{width: "50vw"}}>{story()}</div>;

storiesOf('Common Components|Thumbnail', module)
    .addDecorator(centered)
    .addDecorator(withKnobs)
    .add('Thumbnail info', withNotes('')(
        withInfo('')(
            () => <Thumbnail
                source={origamiIcon}
                index={1}
                handleClick={action('image is clicked!')}
                handleDelete={action('delete button is clicked!')} />)))
    .add('Thumbnail no deletable', withNotes('')(
        () => <Thumbnail
            source={origamiIcon}
            index={1}
            handleClick={action('image is clicked!')} />
    ))

storiesOf('Common Components|ThumbnailList', module)
    .addDecorator(centered)
    .addDecorator(withKnobs)
    .addDecorator(box)
    .add('ThumbnailList info', withNotes('')(
        withInfo('')(
            () => <div style={{width: "50vw", height: "50vh"}}>
                <ThumbnailList
                    account={''}
                    columnKey={''}
                    lists={[origamiIcon, simulaculaIcon, simulaculaIcon]}
                    isDeletable={boolean('isDeletable', true)}
                    handleClick={action('Thumbnail Clicked')}
                    handleDelete={action('Thumbnail delete clicked!')} />
            </div>
        )
    ))
