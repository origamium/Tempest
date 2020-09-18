import * as React from "react";
import { Dispatch, useCallback, useContext } from "react";

export type DialogName = undefined | "add-account" | "add-column";

const DialogContext = React.createContext<{ key: DialogName; dispatch: Dispatch<DialogName> }>({
    key: undefined,
    dispatch: () => {},
});

export const DialogProvider: React.FC = ({ children }) => {
    const [state, dispatch] = React.useState<DialogName>();
    return <DialogContext.Provider value={{ key: state, dispatch }}>{children}</DialogContext.Provider>;
};

export const useDialog = (): [DialogName, Dispatch<DialogName>, () => void] => {
    const { key, dispatch } = useContext(DialogContext);
    const handleClose = useCallback(() => {
        dispatch(undefined);
    }, [dispatch]);
    return [key, dispatch, handleClose];
};
