const path = require('path');
const zlib = require("zlib");

const HtmlWebpackPlugin = require("html-webpack-plugin");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

const TerserPlugin = require("terser-webpack-plugin");

const CompressionPlugin = require("compression-webpack-plugin");

module.exports = {
    entry: "./src/scripts/index.js",
    module: {
        rules: [
            {
                test: /\.md$/,
                use: [
                    {
                        loader: 'html-loader'
                    },
                    {
                        loader: 'markdown-loader',
                    },
                ]
            },
            {
                test: /\.css$/,
                use: [
                    "style-loader",
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            esModule: false,
                        },
                    },
                    "css-loader",
                ],
            },
        ],
    },
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin(),
            new CssMinimizerPlugin(),
        ],
        splitChunks: {
            cacheGroups: {
                defaultVendors: {
                    chunks: "all",
                    name: "vendors",
                    test: /[\\/]node_modules[\\/]/,
                },
            },
        },
    },
    output: {
        filename: './js/[name].bundle.js',
        path: path.join(__dirname, 'dist'),
    },
    plugins: [
        new MiniCssExtractPlugin({
            chunkFilename: "./css/[name].bundle.css",
            filename: "./css/[name].css",
        }),
        new HtmlWebpackPlugin({
            favicon: "./src/html/favicon.ico",
            template: "./src/html/index.html",
        }),
        new CompressionPlugin({
            algorithm: "brotliCompress",
            compressionOptions: {
                params: {
                    [zlib.constants.BROTLI_PARAM_QUALITY]: 11,
                },
            },
            filename: "[path][base].br",
            minRatio: Number.MAX_SAFE_INTEGER,
            test: /\.js$|\.css$|\.html$|\.jpg$|\.svg$|\.eot$|\.ttf$|\.woff$|\.woff2$/,
        }),
        new CompressionPlugin({
            algorithm: "gzip",
            filename: "[path][base].gz",
            minRatio: Number.MAX_SAFE_INTEGER,
            test: /\.js$|\.css$|\.html$|\.jpg$|\.svg$|\.eot$|\.ttf$|\.woff$|\.woff2$/,
        }),
    ],
}