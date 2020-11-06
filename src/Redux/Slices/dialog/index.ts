import { Action } from "redux";

export enum dialogKeys {
    addAccount = "add-account",
    addColumn = "add-column",
}

export enum dialogActionsIdentifier {
    OPEN_DIALOG = "OPEN_AUTHORIZATION_DIALOG",
    CLOSE_DIALOG = "CLOSE_DIALOG",
    NEXT_DIALOG_PAGE = "NEXT_DIALOG_PAGE",
    PREV_DIALOG_PAGE = "PREV_DIALOG_PAGE",
    DIALOG_ERROR = "DIALOG_ERROR",
}

export interface OpenDialogAction extends Action {
    type: dialogActionsIdentifier.OPEN_DIALOG;
    payload: {
        dialogKey: dialogKeys;
    };
}

export const openDialogAction = (dialogKey: dialogKeys): OpenDialogAction => ({
    type: dialogActionsIdentifier.OPEN_DIALOG,
    payload: {
        dialogKey,
    },
});

export interface CloseDialogAction extends Action {
    type: dialogActionsIdentifier.CLOSE_DIALOG;
}

export const closeDialogAction = (): CloseDialogAction => ({
    type: dialogActionsIdentifier.CLOSE_DIALOG,
});

export interface NextPageAction extends Action {
    type: dialogActionsIdentifier.NEXT_DIALOG_PAGE;
}

export const nextPageAction = (): NextPageAction => ({
    type: dialogActionsIdentifier.NEXT_DIALOG_PAGE,
});

export interface PrevPageAction extends Action {
    type: dialogActionsIdentifier.PREV_DIALOG_PAGE;
}

export const prevPageAction = (): PrevPageAction => ({
    type: dialogActionsIdentifier.PREV_DIALOG_PAGE,
});

export type dialogStoreActions = OpenDialogAction | CloseDialogAction | NextPageAction | PrevPageAction;
