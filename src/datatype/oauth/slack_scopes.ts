export const scopes: string[] = [
    "channels:history",
    "channels:read",
    "channels:write",
    "chat:write:user",
    "groups:history",
    "groups:read",
    "groups:write",
    "im:history",
    "im:read",
    "im:write",
    "mpim:history",
    "mpim:read",
    "mpim:write",
    "emoji:read",
    "files:read",
    "files:write:user",
    "pins:read",
    "pins:write",
    "reactions:read",
    "links:read",
    "links:write",
    "usergroups:read",
    "usergroups:write",
    "dnd:read",
    "dnd:write",
    "reminders:read",
    "reminders:write",
    "search:read",
    "stars:read",
    "stars:write",
    "users:read",
    "users:read.email",
    "users:write",
    "users.profile:read",
    "users.profile:write",
    "team:read"
];

export const space_separeted_scopes: string = scopes
    .reduce((accm: string, curr: string): string => accm + " " + curr, "")
    .trim();
