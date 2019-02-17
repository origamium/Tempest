const path = require("path");
const include = path.resolve(__dirname, '../');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
	// Add '.ts' and '.tsx' as resolvable extensions.
	resolve: {
		extensions: [".css", ".ts", ".tsx", ".js"],
        plugins: [new TsconfigPathsPlugin({})],
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
                    require.resolve("ts-loader"),
                    require.resolve("react-docgen-typescript-loader"),
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
	}
};
