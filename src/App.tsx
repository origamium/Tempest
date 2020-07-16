import React from "react";
import { styled } from "./Theme";
import { Auth0Provider } from "@auth0/auth0-react";

const Styled = {
    Root: styled.div`
        width: 100vw;
        height: 100vh;
        background-color: azure;
    `,
};

export const App: React.FC = () => {
    return (
        <Auth0Provider
            domain="lisp.auth0.com"
            clientId="BmXHS2fMDer91hNjqLIEquULdS3EHib6"
            redirectUri={window.location.origin}
        >
            <Styled.Root>はい</Styled.Root>;
        </Auth0Provider>
    );
};
