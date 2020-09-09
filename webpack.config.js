const path = require("path");
const packagejson = require("./package.json");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const Dotenv = require("dotenv-webpack");

module.exports = (_, { mode = "development" }) => {
    const config = {
        mode,
        target: "web",
        entry: {
            index: "./src/index.tsx",
        },
        output: {
            path: path.resolve(__dirname, "build"),
            filename: "[name].[hash].js",
            chunkFilename: "static/js/[name].[hash].chunk.js",
            libraryTarget: "umd",
            umdNamedDefine: true,
        },
        devtool: "",
        resolve: {
            extensions: [".js", ".jsx", ".ts", ".tsx"],
        },
        performance: {
            hints: "warning",
        },
        module: {
            rules: [
                { test: /\.tsx?$/, use: ["babel-loader"], exclude: [/node_modules/] },
                {
                    test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
                    use: {
                        loader: "file-loader",
                        options: {
                            name() {
                                if (process.env.NODE_ENV === "development") {
                                    return "[path][name].[ext]";
                                }

                                return "[hash].[ext]";
                            },
                            outputPath: "static/img",
                        },
                    },
                },
                {
                    test: /\.css$/i,
                    use: [MiniCssExtractPlugin.loader, { loader: "css-loader", options: { importLoaders: 1 } }],
                },
            ],
        },
        optimization: {
            mangleWasmImports: true,
            mergeDuplicateChunks: true,
            minimize: true,
            nodeEnv: "production",
            splitChunks: {
                chunks: "all",
            },
            runtimeChunk: {
                name: "runtime",
            },
        },
        plugins: [
            new ForkTsCheckerWebpackPlugin(),
            new webpack.ProgressPlugin(),
            new CleanWebpackPlugin(),
            new MiniCssExtractPlugin({
                filename: "static/styles/[name].[hash].css",
                chunkFilename: "static/styles/[id].[hash].css",
            }),
            new HtmlWebpackPlugin({
                title: packagejson.name,
                description: packagejson.description,
                template: path.resolve(__dirname, "public/index.html"),
            }),
        ],
    };

    if (mode === "development") {
        config.devtool = "inline-source-map";

        config.output = {
            path: path.resolve(__dirname, "build"),
            filename: "[name].js",
        };

        config.devServer = {
            contentBase: path.resolve(__dirname, "build"),
        };

        config.module.rules.push({
            loader: "source-map-loader",
            test: /\.js$/,
            exclude: /node_modules/,
            enforce: "pre",
        });

        config.devServer = {
            historyApiFallback: true,
            contentBase: path.resolve(__dirname, "public"),
            stats: {
                colors: true,
                hash: true,
                version: true,
                timings: true,
                chunks: true,
                errors: true,
                errorDetails: true,
                warnings: false,
                publicPath: false,
            },
            // allowedHosts: []
        };
        config.optimization = {
            mangleWasmImports: true,
            mergeDuplicateChunks: true,
            minimize: false,
            nodeEnv: "development",
            splitChunks: {
                cacheGroups: {
                    vendors: {
                        test: /node_modules/,
                        name: "vendor",
                        enforce: true,
                        chunks: "all",
                    },
                },
            },
        };

        config.plugins.push(new webpack.HotModuleReplacementPlugin(), new Dotenv());
    }

    return config;
};
