import * as React from "react";
import ReactDOM from "react-dom";
import { App } from "./App";
import { Provider } from "react-redux";
import * as serviceWorker from "./serviceWorker";
import { configureStore, sagaMiddleware } from "./Redux/Store/configureStore";
import { rootSaga } from "./Redux/rootSaga";
import { Theme, ThemeProvider } from "./Theme";
import "ress";
import { Auth0Provider } from "@auth0/auth0-react";
import localforage from "localforage";

localforage.config({
    driver: localforage.INDEXEDDB,
    name: "tempest",
    version: 0.1,
    storeName: "tempestlocalstore",
    description: "tempest client saved settings",
});

const store = configureStore();

sagaMiddleware.run(rootSaga);

ReactDOM.render(
    <Provider store={store}>
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

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

/*
 * snowpack用

// Hot Module Replacement (HMR) - Remove this snippet to remove HMR.
// Learn more: https://www.snowpack.dev/#hot-module-replacement
// @ts-ignore
if (import.meta.hot) {
    // @ts-ignore
    import.meta.hot.accept();
}

*/
