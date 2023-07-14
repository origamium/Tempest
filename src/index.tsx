import * as React from "react";
import ReactDOM from "react-dom";
import { App } from "./App";
import { Theme, ThemeProvider } from "./Theme";
import "ress";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

ReactDOM.render(
    <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={Theme.Light}>
            <App />
        </ThemeProvider>
    </QueryClientProvider>,
    document.getElementById("root"),
);
