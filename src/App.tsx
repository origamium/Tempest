import * as React from "react";
import styled from "styled-components";
import { Body } from "./Body";
import { Header } from "./Component/Header/Header";
import { TabDataProvider } from "./hooks/useTabs";
import { TempestDialog } from "./Component/Dialog/Dialog";

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
        <Styled.Root>
            <TabDataProvider value={undefined}>
                <Header />
                <Body />
                <TempestDialog />
            </TabDataProvider>
        </Styled.Root>
    );
};
