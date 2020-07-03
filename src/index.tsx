import React from "react";
import ReactDOM from "react-dom";
import { App } from "./App";
import { Provider } from "react-redux";
import * as serviceWorker from "./serviceWorker";
import { configureStore, sagaMiddleware } from "./Redux/store/store";
import { rootSaga } from "./Redux/sagas/rootSaga";
import { Theme, ThemeProvider } from "./Theme";
import "ress";

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
