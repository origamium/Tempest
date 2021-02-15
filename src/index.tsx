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
// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from "firebase/app";
// If you are using v7 or any earlier version of the JS SDK, you should import firebase using namespace import
// import * as firebase from "firebase/app"

// If you enabled Analytics in your project, add the Firebase SDK for Analytics
import "firebase/analytics";

// Add the Firebase products that you want to use
import "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyD6VaIyeLLFksZloTeKZ4VMrVLEh6s26ao",
    authDomain: "tempest-303711.firebaseapp.com",
    projectId: "tempest-303711",
    storageBucket: "tempest-303711.appspot.com",
    messagingSenderId: "94271144358",
    appId: "1:94271144358:web:cc4368093cdf5ea9514f67",
    measurementId: "G-W1SW2L925F",
};

firebase.initializeApp(firebaseConfig);

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
