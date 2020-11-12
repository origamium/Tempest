import { dialogActionsIdentifier, dialogKeys, dialogStoreActions } from "./index";

export type DialogStoreType = {
    open: dialogKeys;
    page: number;
};

export const dialogReducer = (
    state: DialogStoreType | null = null,
    action: dialogStoreActions
): DialogStoreType | null => {
    switch (action.type) {
        case dialogActionsIdentifier.OPEN_DIALOG:
            return {
                open: action.payload.dialogKey,
                page: 1,
            };
        case dialogActionsIdentifier.CLOSE_DIALOG:
            return null;
        case dialogActionsIdentifier.NEXT_DIALOG_PAGE:
            return state ? { ...state, page: state.page + 1 } : null;
        case dialogActionsIdentifier.PREV_DIALOG_PAGE:
            return state && state.page > 0 ? { ...state, page: state.page - 1 } : null;
        default:
            return state;
    }
};
