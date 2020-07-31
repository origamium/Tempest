import localforage from "localforage";

export const SettingStore = localforage.createInstance({
    name: "SettingStore",
});

export enum dbKeys {
    account = "account",
    service = "service",
    provider = "provider",
    ui = "UI",
    content = "content",
    setting = "setting",
    credentials = "credentials",
}
