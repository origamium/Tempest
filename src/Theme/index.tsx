// from https://www.styled-components.com/docs/api#typescript
import * as React from "react";
import * as styledComponents from "styled-components";
import { ITheme, IThemeSet } from "./ITheme";
import { Theme } from "./Theme";
import deepmerge from "deepmerge";

const {
    default: _styled,
    css,
    createGlobalStyle,
    keyframes,
    ThemeProvider: ThemeProvider_,
} = styledComponents as styledComponents.ThemedStyledComponentsModule<ITheme>;

export { css, createGlobalStyle, keyframes, Theme };
export type { ITheme, IThemeSet };
export const styled = _styled;

export type ThemeProviderProps = {
    theme: ITheme | keyof typeof Theme;
};

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ theme: theme_, children }) => {
    const theme = React.useMemo<ITheme>(
        () => (typeof theme_ === "string" ? Theme[theme_] : (deepmerge(Theme.Light, theme_) as ITheme)),
        [theme_]
    );

    return <ThemeProvider_ theme={theme}>{children}</ThemeProvider_>;
};

export const ThemeProviderDecorator = (storyFn: any) => <ThemeProvider theme={"Light"}>{storyFn()}</ThemeProvider>;
