import * as React from 'react';
import {storiesOf} from '@storybook/react';
import {withNotes} from "@storybook/addon-notes";
import {withKnobs, text} from '@storybook/addon-knobs';
import {action} from '@storybook/addon-actions';
import centered from '@storybook/addon-centered';
import {withInfo} from "@storybook/addon-info";

import IconButtonHoC from './ReactionButtonHoCs/IconButtonHoC';
import CheckIcon from '@material-ui/icons/Check';
import {RepeatButton_} from './RepeatButton';

const HoCNote = `
This Component is HoC.  
So, Look STORYSOURCE.
`;



storiesOf('Button/IconButton', module)
    .addDecorator(centered)
    .addDecorator(withKnobs)
    .add('Info',
        withNotes(HoCNote)(
            withInfo("IconButtonHoC is Higher-Order Components.")(
                () => IconButtonHoC(CheckIcon)({
                    handleClick: action('clicked'),
                    id: text('id','sampleid-0123456789')
                })
            )))

storiesOf('Button/IconButton/Buttons', module)
    .addDecorator(centered)
    .add('RepeatButton', () => <RepeatButton_ id={text('id','sampleid-0123456789')} handleClick={action('clicked')}/>);
