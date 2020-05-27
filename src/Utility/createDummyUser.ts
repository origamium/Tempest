import { IUser } from "../datatype/Contents/User";
import { nanoid } from "nanoid";

export const createDummyUser = (): IUser => ({
    id: nanoid(16),
    screenName: nanoid(Math.floor(Math.random() * 100)),
    displayName: nanoid(10),
    providerDomain: nanoid(10),
});
