import React from "react";
import ReactDOM from "react-dom";
import { App } from "./App";
import { Provider } from "react-redux";
import * as Sentry from "@sentry/react";
import * as serviceWorker from "./serviceWorker";
import { configureStore, sagaMiddleware } from "./Redux/Store/configureStore";
import { rootSaga } from "./Redux/Sagas/rootSaga";
import { Theme, ThemeProvider } from "./Theme";
import "ress";

Sentry.init({ dsn: "https://446c9a464ec844c2a5261438e9df8f52@o344655.ingest.sentry.io/5341100" });

ReactDOM.render(
    <Provider store={configureStore()}>
        <ThemeProvider theme={Theme.Light}>
            <App />
        </ThemeProvider>
    </Provider>,
    document.getElementById("root")
);

sagaMiddleware.run(rootSaga);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
