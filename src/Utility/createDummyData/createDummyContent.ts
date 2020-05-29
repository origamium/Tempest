import { createDummyStatus } from "./createDummyStatus";
import { createDummyFollowedEvent, createDummyReactionEvent } from "./createDummyEvent";
import { randomPick } from "../randomPick";
import { IStatus } from "../../datatype/Contents/Article/Status";
import { IEvent } from "../../datatype/Contents/Article/Event";

export const createDummyContent = () =>
    randomPick<() => IStatus | IEvent>([createDummyReactionEvent, createDummyFollowedEvent, createDummyStatus])();
