import React, { createContext } from "react";
import { IUICommonAttribuite, IUser } from "@tsuruclient/datatype";
import { User1 } from "./User";

const ColumnAttrContextSkeleton: IUICommonAttribuite = {
    account: "0",
    column: "0"
};
const ColumnAttrContext = createContext<IUICommonAttribuite>(ColumnAttrContextSkeleton);
const ColumnAttrProvider = ColumnAttrContext.Provider;

const OwnerContextSkeleton: IUser = { id: "0" };
const OwnerContext = createContext<IUser>(OwnerContextSkeleton);
const OwnerContextProvider = OwnerContext.Provider;

const _ColumnContextProviderForStorybook = ({ children }: { children: JSX.Element }) => (
    <ColumnAttrProvider value={{ account: "902", column: "90420904289" }}>
        <OwnerContextProvider value={User1}>{children}</OwnerContextProvider>
    </ColumnAttrProvider>
);

export const ColumnContextProviderForStorybook = story => (
    <_ColumnContextProviderForStorybook>{story()}</_ColumnContextProviderForStorybook>
);
