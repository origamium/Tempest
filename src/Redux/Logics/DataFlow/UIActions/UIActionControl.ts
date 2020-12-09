import { Exportable } from "../../HelperType/Exportable";
import { TransformSchema } from "../Data/Dynamizr/Interfaces/TransformData";

export type UIActionElement = {
    targetApiKey: string;
    targetContentKey: string;
    name: string;
    description?: string;
    schema: TransformSchema;
    dataPoolKey: string;
    dataPoolSourceKey?: string;
};

export type UIActionsObject = {
    account: {
        getInfo: UIActionElement;
        getNewSource?: UIActionElement;
    };
    sources: {
        [key: string]: UIActionElement;
    };
    threads?: {
        [key: string]: UIActionElement;
    };
};

export class UIActionControl implements Exportable<UIActionsObject> {
    private _uiActions: UIActionsObject;
    constructor(source: UIActionsObject) {
        this._uiActions = source;
    }

    public addSource(source: { [key: string]: UIActionElement }): UIActionControl {
        return new UIActionControl({ ...this._uiActions, sources: { ...this._uiActions.sources, ...source } });
    }

    get sources() {
        return { ...this._uiActions.sources, ...this._uiActions.threads };
    }

    get accountListUIActions() {
        return [this._uiActions.account.getInfo];
    }

    export() {
        return this._uiActions;
    }
}
