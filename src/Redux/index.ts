import { debugActions } from "./Slices/debug";
import { dataStoreActions } from "./Slices/dataStore";

export type RegisteredActions = debugActions | dataStoreActions;
