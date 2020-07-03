import React from "react";
import { styled } from "./Theme";

const Styled = {
    Root: styled.div`
        width: 100vw;
        height: 100vh;
        background-color: azure;
    `,
};

export const App: React.FC = () => {
    return <Styled.Root>はい</Styled.Root>;
};
