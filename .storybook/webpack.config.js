const path = require("path");
const include = path.resolve(__dirname, '../');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = async ({config, mode}) => {
    const newConfig = {...config}
    newConfig.resolve = {
        extensions: [".css", ".ts", ".tsx", ".js"],
        alias: {
            "@styled": path.resolve(__dirname, "../src/Theme")
        }
    }

    newConfig.module.rules.unshift(...[
        {
            test: /\.tsx?$/,
            use: [
                {
                    loader: "ts-loader",
                    options: {
                        transpileOnly: true,
                        configFile: __dirname + "/../tsconfig.json"
                    },
                },
                {
                    loader: "react-docgen-typescript-loader"
                }
            ],
            exclude: /node_modules/,
            include
        },
        {
            test: /\.stories\.tsx?$/,
            loaders: [
                {
                    loader: require.resolve('@storybook/addon-storysource/loader'),
                    options: {parser: 'typescript'}
                }
            ],
            enforce: 'pre',
        }
    ])

    newConfig.plugins.push(new ForkTsCheckerWebpackPlugin({
        tsconfig: __dirname + "/../tsconfig.json"
    }))

    return newConfig;
}
