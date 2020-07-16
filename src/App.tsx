import * as React from "react";
import { styled } from "./Theme";
import { Body } from "./Body";
import { Header } from "./Component/Header/Header";
import { useDispatch } from "react-redux";
import { requestInitializeAction } from "./Redux/Actions/dataStore";

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
    const dispatch = useDispatch();
    React.useEffect(() => {
        dispatch(requestInitializeAction());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Styled.Root>
            <Header />
            <Body />
        </Styled.Root>
    );
};
