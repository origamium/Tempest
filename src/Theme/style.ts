// from https://www.styled-components.com/docs/api#typescript
import * as styledComponents from 'styled-components';
import { ThemedStyledComponentsModule } from 'styled-components';

import {ITheme} from './ITheme';
import Theme from './Theme';

const {
    default: styled,
    css,
    injectGlobal,
    keyframes,
    ThemeProvider
} = styledComponents as ThemedStyledComponentsModule<ITheme>;

export { css, injectGlobal, keyframes, ThemeProvider, Theme, ITheme};
export default styled;
