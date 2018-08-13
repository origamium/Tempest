// theme.ts
export interface ITheme {
    background: {
        primary: string,
        secondary: string,
    },
    text: {
        sizeMag: number,
        color: {
            default: string,
            secondary: string,
            alert: string,
            disabled: string,
        },
    },
    button: {
        generalButton: {
            contained: boolean, // false => outlined button
            color: {
                default: string,
                secondary: string,
                alert: string,
                disabled: string,
            }
        },
    },
    divider: string,
};

export default interface IThemeSet {
    [key: string] : ITheme
};
