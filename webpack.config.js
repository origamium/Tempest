const path = require("path")

module.exports = {
    mode: "production",
    output: {
        library: '@tsuruclient/ui',
        libraryTarget: 'umd',
        filename: 'dist.js',
    },
    resolve: {
        // Add `.ts` and `.tsx` as a resolvable extension.
        extensions: [".ts", ".tsx", ".js"],
        alias: {
            "@styled": path.resolve(__dirname, "../src/Theme")
        }
    },
    module: {
        rules: [
            { test: /\.tsx?$/, loader: "ts-loader" }
        ]
    },
    plugins: []
}
