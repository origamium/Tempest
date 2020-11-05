module.exports = {
    presets: [
        [
            "@babel/env",
            {
                targets: {
                    browsers: [">0.1% in JP, not IE < 11, not op_mini all"],
                },
                useBuiltIns: "usage",
                corejs: 3,
            },
        ],
        "@babel/preset-react",
        ["@babel/preset-typescript", { allExtensions: true, isTSX: true }],
    ],
    plugins: [
        "babel-plugin-styled-components",
        "@babel/plugin-proposal-object-rest-spread",
        "@babel/plugin-syntax-dynamic-import",
        "@babel/plugin-proposal-class-properties",
    ],
    env: {
        production: {
            plugins: [["react-remove-properties", { properties: ["data-testid"] }]],
        },
        test: {
            presets: [["@babel/preset-env", { targets: { node: "current" } }]],
        },
    },
};
