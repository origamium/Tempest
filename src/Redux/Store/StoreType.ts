import { DataStoreType } from "../Slices/dataStore/reducer";
import { DialogStoreType } from "../Slices/dialog/reducer";

export type StoreType = {
    dataStore: DataStoreType | null;
    dialog: DialogStoreType | null;
};
