module.exports = {
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaVersion: 2018,
        project: "./tsconfig.json",
        sourceType: "module",
        createDefaultProgram: true,
    },
    env: {
        es6: true,
        browser: true,
        node: true,
    },
    extends: [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:prettier/recommended",
        "prettier/@typescript-eslint",
        "plugin:jest/recommended"
    ],
    plugins: ["@typescript-eslint", "react-hooks", "jest"],
    settings: {
        react: {
            version: "detect",
        },
        node: {
            tryExtensions: [".ts", ".tsx", ".js", ".jsx", ".json", ".node"],
        },
    },
    rules: {
        "react-hooks/rules-of-hooks": "error",
        "react-hooks/exhaustive-deps": "warn",
    },
    overrides: [
        {
            files: ["**/*.ts", "**/*.tsx"],
            rules: {
                "no-console": ["warn", { allow: ["info", "warn", "error"] }],
                "no-unused-vars": 0,
                "@typescript-eslint/no-unused-vars": [2, { args: "none" }],
                "@typescript-eslint/no-require-imports": 2,
                "@typescript-eslint/no-var-requires": 2,
                "@typescript-eslint/consistent-type-assertions": 2,
                "@typescript-eslint/no-unnecessary-type-assertion": 2,
                "@typescript-eslint/restrict-plus-operands": 2,
                "@typescript-eslint/return-await": "error",
                "@typescript-eslint/explicit-function-return-type": "off",
                "react/prop-types": "off",
            },
        },
        {
            files: ["**/__tests__/**", "**/*.test.tsx", "**/*.test.ts"],
            env: {
                jest: true,
            },
            rules: {
                "no-invalid-this": 0,
            },
        },
    ],
};
