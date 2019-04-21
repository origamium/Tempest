import { configure, addDecorator } from '@storybook/react';
import { withOptions } from '@storybook/addon-options';
import { withInfo } from "@storybook/addon-info";
import { withNotes } from "@storybook/addon-notes";
import { withKnobs } from "@storybook/addon-knobs";
const req = require.context('../src', true, /.stories.tsx$/);
import '!style-loader!css-loader!../src/reset.css';

addDecorator(withOptions({
    name: 'tsuruclient/ui',
    hierarchySeparator: /\/|\./,
    hierarchyRootSeparator: /\|/,
}));
addDecorator(withNotes);
addDecorator(withInfo);
addDecorator(withKnobs);

function loadStories() {
	req.keys().forEach(filename => req(filename));
}
configure(loadStories, module);
