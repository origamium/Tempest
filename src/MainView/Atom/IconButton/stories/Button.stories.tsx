/*tslint:disable*/
import * as React from 'react';
import {storiesOf} from '@storybook/react';
import {withNotes} from "@storybook/addon-notes";
import {withKnobs, color, text, number, boolean} from '@storybook/addon-knobs';
import {action} from '@storybook/addon-actions';
import centered from '@storybook/addon-centered';
import {withInfo} from "@storybook/addon-info";

import IconButtonHoC from '../ReactionButtonHoCs/IconButtonHoC';
import CheckIcon from '@material-ui/icons/Check';
import {FavoriteButton, RepeatButton, ReplyButton} from '../IconButton';

const HoCNote = `
This Component is HoC.  
So, Look STORYSOURCE.
`;

const sampleId = 'sample-id-0123456789';
const negativeColor = "#7D7D7D";

storiesOf('Button/IconButton', module)
    .addDecorator(centered)
    .addDecorator(withKnobs)
    .add('Info',
        withNotes(HoCNote)(
            withInfo("IconButtonHoC is Higher-Order Components.")(
                () => IconButtonHoC(CheckIcon)({
                    id: text('id',sampleId),
                    style: {
                        activeColor: color("active color", "#4E66FF"),
                        negativeColor: color("negative color", negativeColor),
                        size: number("size", 32),
                    },
                    active: boolean('active', true),
                    handleClick: action('clicked'),
                })
            )));

storiesOf('Button/IconButton/Buttons', module)
    .addDecorator(centered)
    .addDecorator(withKnobs)
    .add('Reply Button', () =>
        <ReplyButton
            id={text('id',sampleId)}
            style={{
                activeColor: color("active color", "#49A4EF"),
                negativeColor: color("negative color", negativeColor),
                size: number("size", 32),
            }}
            active={boolean('active', true)}
            handleClick={action('clicked')}/>)
    .add('Repeat Button', () =>
        <RepeatButton
            id={text('id',sampleId)}
            style={{
                activeColor: color("active color", "#4EBD67"),
                negativeColor: color("negative color", negativeColor),
                size: number("size", 32),
            }}
            active={boolean('active', true)}
            handleClick={action('clicked')}/>)
    .add('Fanorite Button', () =>
        <FavoriteButton
            id={text('id',sampleId)}
            style={{
                activeColor: color("active color", "#D2255F"),
                negativeColor: color("negative color", negativeColor),
                size: number("size", 32),
            }}
            active={boolean('active', true)}
            handleClick={action('clicked')}/>)
    ;
