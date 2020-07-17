import localforage from "localforage";

export const SettingStore = localforage.createInstance({
    name: "SettingStore",
});

export enum dbKeys {
    ui = "UI",
    account = "account",
    service = "service",
    provider = "provider",
}
