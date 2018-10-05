/*tslint:disable*/
import * as React from 'react';
import { storiesOf } from "@storybook/react";
import centered from '@storybook/addon-centered';
import { withInfo } from "@storybook/addon-info";
import { withKnobs, text, number } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import {Thumbnail} from "./Thumbnail";

import origamiIcon from '../../__testdata__/icon/origami.png';

storiesOf('Common Components|Thumbnail', module)
    .addDecorator(centered)
    .addDecorator(withKnobs)
    .add('Thumbnail info', () => <Thumbnail source={origamiIcon} index={1}/>)
