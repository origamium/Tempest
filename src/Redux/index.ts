import { debugActions } from "./Gears/debug/debug";
import { dataStoreActions } from "./Gears/dataStore";

export type RegisteredActions = debugActions | dataStoreActions;
