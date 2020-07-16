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
import { Auth0Provider } from "@auth0/auth0-react";

Sentry.init({ dsn: "https://446c9a464ec844c2a5261438e9df8f52@o344655.ingest.sentry.io/5341100" });

ReactDOM.render(
    <Provider store={configureStore()}>
        <Auth0Provider
            domain="lisp.auth0.com"
            clientId="BmXHS2fMDer91hNjqLIEquULdS3EHib6"
            redirectUri={window.location.origin}
        >
            <ThemeProvider theme={Theme.Light}>
                <App />
            </ThemeProvider>
        </Auth0Provider>
    </Provider>,
    document.getElementById("root")
);

sagaMiddleware.run(rootSaga);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
