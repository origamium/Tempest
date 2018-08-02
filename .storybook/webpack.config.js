const path = require("path");
const include = path.resolve(__dirname, '../');

module.exports = {
	// Add '.ts' and '.tsx' as resolvable extensions.
	resolve: {
		extensions: [".ts", ".tsx", ".js"]
	},
	module: {
		rules: [
			{
				test: /\.tsx/,
				loader: 'babel-loader!ts-loader',
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
