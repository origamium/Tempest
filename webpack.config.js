module.exports = {
    mode: "production",
    output: {
        library: '@tsuruclient/ui',
        libraryTarget: 'umd',
        filename: 'dist.js',
    },
    resolve: {
        // Add `.ts` and `.tsx` as a resolvable extension.
        extensions: [".ts", ".tsx", ".js"]
    },
    module: {
        rules: [
            { test: /\.tsx?$/, loader: "ts-loader" }
        ]
    },
    plugins: []
}
