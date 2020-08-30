export const OpenDialogEvent = "openDialog" as const;
export type OpenDialogEventDetail = "add-account" | "add-column";

export const OpenDialogEventDispatcher = (action: OpenDialogEventDetail) => {
    const newEvent = new CustomEvent(OpenDialogEvent, { detail: { target: action } });
    window.dispatchEvent(newEvent);
};
