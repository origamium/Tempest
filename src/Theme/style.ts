// from https://www.styled-components.com/docs/api#typescript
import * as styledComponents from "styled-components";

import ThemeInterface from "./ITheme";
import Theme from "./Theme";

const {
    default: styled,
    css,
    createGlobalStyle,
    keyframes,
    ThemeProvider
} = styledComponents as styledComponents.ThemedStyledComponentsModule<ThemeInterface>;

export { css, createGlobalStyle, keyframes, ThemeProvider, Theme };
export default styled;
