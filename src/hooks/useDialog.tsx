import * as React from "react";
import { Dispatch, useCallback, useContext } from "react";

export const OpenDialogEvent = "openDialog";

export type DialogName = undefined | "add-account" | "add-column";

type OpenDialogEventDetail = {
    target: undefined | "add-account" | "add-column";
};

export const OpenDialogEventDispatcher = (action: DialogName) => {
    const newEvent = new CustomEvent(OpenDialogEvent, { detail: { target: action } });
    window.dispatchEvent(newEvent);
};

const DialogContext = React.createContext<{ key: DialogName; dispatch: Dispatch<DialogName> }>({
    key: undefined,
    dispatch: () => {},
});

export const DialogProvider: React.FC = ({ children }) => {
    const [state, dispatch] = React.useState<DialogName>();

    const openDialogEventHandler = React.useCallback<EventListener>(
        ((e: CustomEvent<OpenDialogEventDetail>) => {
            dispatch(e.detail.target);
        }) as EventListener,
        []
    );

    React.useEffect(() => {
        window.addEventListener(OpenDialogEvent, openDialogEventHandler);
        return () => {
            window.removeEventListener(OpenDialogEvent, openDialogEventHandler);
        };

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return <DialogContext.Provider value={{ key: state, dispatch }}>{children}</DialogContext.Provider>;
};

export const useDialog = (): [DialogName, Dispatch<DialogName>, () => void] => {
    const { key, dispatch } = useContext(DialogContext);
    const handleClose = useCallback(() => {
        dispatch(undefined);
    }, [dispatch]);
    return [key, dispatch, handleClose];
};
