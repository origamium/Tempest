import {configure} from '@storybook/react';
import {setOptions} from '@storybook/addon-options';

const req = require.context('../src', true, /.stories.tsx$/);

function loadStories() {
	req.keys().forEach(filename => req(filename));
}

setOptions({
    hierarchySeparator: /\/|\./,
    hierarchyRootSeparator: /\|/,
});

configure(loadStories, module);
