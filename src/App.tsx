import React from "react";
import { styled, ThemeProvider } from "./Theme";
import { Provider } from "react-redux";
import { configureStore } from "./Redux/Store/configureStore";
import { Auth0Provider } from "@auth0/auth0-react";
import { Body } from "./Body";
import { Header } from "./Component/Header/Header";

const Styled = {
    Root: styled.div`
        width: 100vw;
        height: 100vh;
        display: flex;
        flex-direction: column;
    `,
    Body: styled.main`
        flex: 1 1 auto;
    `,
};

export const App: React.FC = () => {
    return (
        <Auth0Provider
            domain="lisp.auth0.com"
            clientId="BmXHS2fMDer91hNjqLIEquULdS3EHib6"
            redirectUri={window.location.origin}
        >
            <Provider store={configureStore()}>
                <ThemeProvider theme={"Light"}>
                    <Styled.Root>
                        <Header />
                        <Body />
                    </Styled.Root>
                </ThemeProvider>
            </Provider>
        </Auth0Provider>
    );
};
