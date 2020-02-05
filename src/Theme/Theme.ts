/* tslint:disable */
import { ITheme } from "./ITheme";

const Light: ITheme = {
    background: {
        primary: "#fbfbfb",
        secondary: "#d5d5d5"
    },
    text: {
        sizeMag: 1,
        color: {
            default: "#222",
            secondary: "#554ee0",
            alert: "#bc3e3e",
            disabled: "#bababa"
        }
    },
    button: {
        generalButton: {
            contained: true, // false => outlined button
            color: {
                default: "#eaeaea",
                secondary: "#2B98F0",
                alert: "#d61237",
                disabled: "#D1D1D1"
            }
        }
    },
    divider: "#393939"
};

const Dark: ITheme = {
    background: {
        primary: "#303030",
        secondary: "#232323"
    },
    text: {
        sizeMag: 1.0,
        color: {
            default: "#f7f7f7",
            secondary: "#1725c4",
            alert: "#7a0d0d",
            disabled: "#bcbcbc"
        }
    },
    button: {
        generalButton: {
            contained: false,
            color: {
                default: "#666666",
                secondary: "#2737e8",
                alert: "#80161d",
                disabled: "#353535"
            }
        }
    },
    divider: "#8f8f8f"
};

export default {
    Light,
    Dark
};
