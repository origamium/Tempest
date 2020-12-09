import { Action } from "redux";
import { UIActionElement } from "../../Logics/DataFlow/UIActions/UIActionControl";
import { DataStoreType } from "./reducer";
import { ColumnControl } from "../../Logics/DataFlow/UI/ColumnControl";
import { nanoid } from "nanoid";

export enum columnActionIdentifier {
    ADD_COLUMN = "ADD_COLUMN",
    DELETE_COLUMN = "DELETE_COLUMN",
    MOVE_COLUMN = "MOVE_COLUMN",
}

export type ColumnSourceElement = { uiAction: UIActionElement; sourceKey: string; accountKey: string };

export interface AddColumnActionType extends Action {
    type: columnActionIdentifier.ADD_COLUMN;
    payload: {
        name: string;
        source: ColumnSourceElement[];
    };
}

export const addColumnAction = (name: string, source: ColumnSourceElement[]): AddColumnActionType => ({
    type: columnActionIdentifier.ADD_COLUMN,
    payload: {
        name,
        source,
    },
});

export const addColumnReducer = (
    state: DataStoreType | null = null,
    action: AddColumnActionType
): DataStoreType | null => {
    if (state) {
        const { name, source } = action.payload;
        return {
            ...state,
            columns: [
                ...state.columns,
                new ColumnControl(
                    {
                        id: nanoid(),
                        name,
                        accountId: source.map((v) => v.accountKey),
                        sourceElement: source,
                        muteId: [],
                        collapsed: false,
                        contentCollapse: 0,
                    },
                    {}
                ),
            ],
        };
    }
    return state;
};
