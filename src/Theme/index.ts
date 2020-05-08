// from https://www.styled-components.com/docs/api#typescript
import * as styledComponents from "styled-components";
import { ITheme, IThemeSet } from "./ITheme";
import { Theme } from "./Theme";

const {
    default: _styled,
    css,
    createGlobalStyle,
    keyframes,
    ThemeProvider,
} = styledComponents as styledComponents.ThemedStyledComponentsModule<IThemeSet>;

export { css, createGlobalStyle, keyframes, ThemeProvider, Theme };
export type { ITheme, IThemeSet };
export const styled = _styled;
