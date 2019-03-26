const path = require("path");
const include = path.resolve(__dirname, '../');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = {
	// Add '.ts' and '.tsx' as resolvable extensions.
	resolve: {
		extensions: [".css", ".ts", ".tsx", ".js"],
        alias: {
		    "@data": path.resolve(__dirname, "../lib/data"),
		    "@events": path.resolve(__dirname, "../lib/events"),
            "@styled": path.resolve(__dirname, "../src/Theme")
        }
	},
	module: {
		rules: [
		    {
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader' ]
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/,
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
                            transpileOnly: true
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
        new ForkTsCheckerWebpackPlugin()
    ]
};
