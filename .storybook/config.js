import {configure} from '@storybook/react';
import { setOptions } from '@storybook/addon-options';
import '../src/reset.css';
const req = require.context('../src', true, /.stories.tsx$/);

setOptions({
    name: 'tsuruclient/ui',
    hierarchySeparator: /\/|\./,
    hierarchyRootSeparator: /\|/,
});

function loadStories() {
	req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
