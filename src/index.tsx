import * as React from "react";
import ReactDOM from "react-dom";
import { App } from "./App";
import { Theme, ThemeProvider } from "./Theme";
import "ress";

ReactDOM.render(
    <ThemeProvider theme={Theme.Light}>
        <App />
    </ThemeProvider>,
    document.getElementById("root")
);
