import { Exportable } from "../../HelperType/Exportable";
import { TransformSchema } from "../Data/Dynamizr/Interfaces/TransformData";

export type UIActionElement = {
    targetApiKey: string;
    targetContentKey: string;
    name: string;
    description?: string;
    schema: TransformSchema;
};

export type UIActionsTemplate = {
    account: {
        getInfo: UIActionElement;
        sources: {
            [key: string]: UIActionElement;
        };
        threads: {
            [key: string]: UIActionElement;
        };
    };
};

export class UIActions implements Exportable<any> {
    private readonly uiActions: UIActionsTemplate;
    constructor(source: UIActionsTemplate) {
        this.uiActions = source;
    }

    get accountInfo() {
        return this.uiActions.account.getInfo;
    }
}
