const path = require("path");
const include = path.resolve(__dirname, '../');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = {
	// Add '.ts' and '.tsx' as resolvable extensions.
	resolve: {
		extensions: [".css", ".ts", ".tsx", ".js"],
        alias: {
            "@styled": path.resolve(__dirname, "../src/Theme")
        }
	},
	module: {
		rules: [
		    {
                test: /\.css$/,
                include,
                use: [ {
                    loader: 'style-loader'
                }, {
                    loader: 'css-loader'
                } ]
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/,
                include,
                use: [
                    {
                        loader: 'url-loader'
                    },
                ]
            },
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
        ]
	},
    plugins: [
        new ForkTsCheckerWebpackPlugin({
            tsconfig: __dirname + "/../tsconfig.json"
        })
    ]
};
