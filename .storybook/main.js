const path = require("path");

module.exports = {
    stories: ["../src/**/*.stories.tsx"],
    addons: ["@storybook/addon-actions", "@storybook/addon-links"],
    webpackFinal: async config => {
        // do mutation to the config
        config.module.rules.push({
            test: /\.(ts|tsx)$/,
            use: [
                {
                    loader: require.resolve("babel-loader")
                },
                {
                    loader: require.resolve("react-docgen-typescript-loader")
                }
            ]
        }, {
            test: /\.scss$/,
            loaders: [
                require.resolve('style-loader'),
                {
                    loader: require.resolve('css-loader'),
                    options: {
                        importLoaders: 1,
                        modules: true,
                        localIdentName: '[name]__[local]___[hash:base64:5]',
                    },
                },
                require.resolve('sass-loader')
            ],
        });
        config.resolve.extensions.push(".ts", ".tsx");
        return config;
    },
};
