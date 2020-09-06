import { OpenDialogEvent, OpenDialogEventDetail } from "../CustomEvents";

type AddAccountStore = {};
const useAddAccount = (
    store,
    dispatcher
): {
    deployAccount: () => void;
} => {};

const useAddColumn = (
    store,
    dispatcher
): {
    deployColumn: () => void;
} => {};

export const useDialog = () => {
    window.addEventListener(OpenDialogEvent, ((e: CustomEvent<OpenDialogEventDetail>) => {
        switch (e.detail.target) {
            case "add-account":
                break;
            case "add-column":
                break;
            default:
                break;
        }
    }) as EventListener);
};
