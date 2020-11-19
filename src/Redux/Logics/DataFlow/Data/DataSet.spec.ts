/*

describe("dynamizr working tests", () => {
    test("exactly data normalize", () => {
        const result = instance.normalize("statusList", data);
        expect(result.entities).toHaveProperty("users");
        expect(result.entities).toHaveProperty("contents");
        expect(result.result).toEqual(["240558470661799936", "240556426106372096", "240539141056638977"]);
    });
});
*/

import { DataSetControl } from "./DataSetControl";
import Twitter from "../DefaultSupport/Twitter";
import twitterData from "../testdata/twitter/home_timeline.json";
import Mastodon from "../DefaultSupport/Mastodon";

const twitterInstance = new DataSetControl(Twitter.service.dataSet);
const mastodonInstance = new DataSetControl(Mastodon.Service.dataSet);

describe("dynamizr test", () => {
    /*
    test("dynamic parse test", async () => {
        const result = await twitterInstance.parseResponseData("statusList", {
            json: async () => {
                return Promise.resolve(twitterData);
            },
            ok: () => true,
        } as any);
        expect(result.entities).toHaveProperty("users");
        expect(result.entities).toHaveProperty("contents");
        expect(result.result).toEqual(["240558470661799936", "240556426106372096", "240539141056638977"]);
    });
*/
    test("static parse test", async () => {
        const result = await mastodonInstance.parseResponseData("oauth_token", {
            json: async () => {
                return Promise.resolve({
                    access_token: "ZA-Yj3aBD8U8Cm7lKUp-lm9O9BmDgdhHzDeqsY8tlL0",
                    token_type: "Bearer",
                    scope: "read write follow push",
                    created_at: 1573979017,
                });
            },
            ok: () => true,
        } as any);

        expect(result).toEqual({
            scope: "read write follow push",
            token: "ZA-Yj3aBD8U8Cm7lKUp-lm9O9BmDgdhHzDeqsY8tlL0",
            token_type: "Bearer",
        });
    });
});
