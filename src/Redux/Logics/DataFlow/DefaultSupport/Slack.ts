export const SLACK_CLIENT_ID = process.env.SLACK_CLIENT_ID;

export const slack_scopes: string[] = [
    "channels:history",
    "channels:read",
    "channels:write",
    "chat:write",
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
    "files:write",
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
    "team:read",
];

export const slack_scope_str: string = slack_scopes
    .reduce((accm: string, curr: string): string => accm + " " + curr, "")
    .trim()
    .replace(/\s/g, ",");

export const slackAuthorizeUrl = (state: string): string =>
    `https://slack.com/oauth/v2/authorize?state=${state}&client_id=${SLACK_CLIENT_ID}&user_scope=${slack_scope_str}`;
