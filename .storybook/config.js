import { configure, addDecorator } from '@storybook/react';
import { setOptions } from '@storybook/addon-options';
import { withInfo } from "@storybook/addon-info";
import { withNotes } from "@storybook/addon-notes";
import { withKnobs } from "@storybook/addon-knobs";
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

addDecorator(withNotes);
addDecorator(withInfo);
addDecorator(withKnobs);
configure(loadStories, module);
