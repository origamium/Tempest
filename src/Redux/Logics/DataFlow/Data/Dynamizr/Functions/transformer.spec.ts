import { _reduce } from "./transformer";

const schemaset = {
    a: {
        NETFLIX: "netflix",
        HULU: "hulu",
        HBOMAX: "hbomax",
    },
    b: [
        {
            key: "_root",
            schema: {
                NETFLIX: "netflix",
                HULU: "hulu",
                HBOMAX: "hbomax",
            },
        },
    ],
    c: {
        ancestors: [
            {
                key: "prev",
                schema: {
                    id: "id",
                    created_at: "date",
                    in_reply_to_id: "in_reply_to_id",
                    in_reply_to_account_id: "in_reply_to_account_id",
                },
            },
        ],
        descendants: [
            {
                key: "after",
                schema: {
                    id: "id",
                    created_at: "date",
                    in_reply_to_id: "in_reply_to_id",
                    in_reply_to_account_id: "in_reply_to_account_id",
                },
            },
        ],
    },
};

const dataset = {
    a: { NETFLIX: "woo", HULU: "yee", HBOMAX: "yeah" },
    b: [
        { NETFLIX: "woo", HULU: "yee", HBOMAX: "yeah" },
        { NETFLIX: "nyan", HULU: "nya", HBOMAX: "waiwai" },
    ],
    c: {
        ancestors: [
            {
                id: "103188938570975982",
                created_at: "2019-11-23T19:44:00.124Z",
                in_reply_to_id: null,
                in_reply_to_account_id: null,
            },
            {
                id: "103188971072973252",
                created_at: "2019-11-23T19:52:23.398Z",
                in_reply_to_id: "103188938570975982",
                in_reply_to_account_id: "634458",
            },
            {
                id: "103188982235527758",
                created_at: "2019-11-23T19:55:08.208Z",
                in_reply_to_id: "103188971072973252",
                in_reply_to_account_id: "14715",
            },
        ],
        descendants: [
            {
                id: "103189026958574542",
                created_at: "2019-11-23T20:06:36.011Z",
                in_reply_to_id: "103189005915505698",
                in_reply_to_account_id: "634458",
            },
        ],
    },
};

describe("transform combined test", () => {
    /*
    test("simple object", () => {
        const result = _reduce({}, schemaset.a, dataset.a);
        expect(result).toEqual({
            hbomax: "yeah",
            hulu: "yee",
            netflix: "woo",
        });
    });
    test("simple array", () => {
        const result = _reduce([], schemaset.b, dataset.b);
        expect(result).toEqual({
            _root: [
                { hbomax: "yeah", hulu: "yee", netflix: "woo" },
                { hbomax: "waiwai", hulu: "nya", netflix: "nyan" },
            ],
        });
    });
    */
    test("simply combined", () => {
        const result = _reduce({}, schemaset.c, dataset.c);
        expect(result).toEqual({
            prev: [
                {
                    id: "103188938570975982",
                    date: "2019-11-23T19:44:00.124Z",
                    in_reply_to_id: null,
                    in_reply_to_account_id: null,
                },
                {
                    id: "103188971072973252",
                    date: "2019-11-23T19:52:23.398Z",
                    in_reply_to_id: "103188938570975982",
                    in_reply_to_account_id: "634458",
                },
                {
                    id: "103188982235527758",
                    date: "2019-11-23T19:55:08.208Z",
                    in_reply_to_id: "103188971072973252",
                    in_reply_to_account_id: "14715",
                },
            ],
            after: [
                {
                    id: "103189026958574542",
                    date: "2019-11-23T20:06:36.011Z",
                    in_reply_to_id: "103189005915505698",
                    in_reply_to_account_id: "634458",
                },
            ],
        });
    });
});
