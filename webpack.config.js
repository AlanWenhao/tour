const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    entry: path.resolve(__dirname, 'src/index.js'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [{
                    loader: 'babel-loader',
                }]
            },
            {
                test: /\.css$/,
                use: [
                    { loader: MiniCssExtractPlugin.loader },
                    "css-loader", // translates CSS into CommonJS
                    "postcss-loader"
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    { loader: MiniCssExtractPlugin.loader },
                    "css-loader", // translates CSS into CommonJS
                    "sass-loader", // compiles Sass to CSS, using Node Sass by default
                    "postcss-loader"
                ]
            },
            {
                test: /\.less$/,
                use: [
                    { loader: MiniCssExtractPlugin.loader },
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'less-loader',
                        options: {
                            modifyVars: {
                                '@primary-color': '#ff0000',
                                '@link-color': '#ff0000',
                                '@border-radius-base': '2px',
                            },
                            javascriptEnabled: true
                        }
                    },
                    "postcss-loader"
                ]
            },
            {
                test: /\.(jpg|png|bmp|gif|svg|ttf|woff|woff2|eot)/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 10240,
                        // outputPath: '',
                        // name: 'dist/img/[name].[hash:8].[ext]'
                    }
                }]
            },
            {
                test: /\.(html|htm)$/,
                use: 'html-withimg-loader'
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src/index.html'),
            filename: 'index.html'
        }),
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src/')
        }
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        historyApiFallback: true,
        compress: true,
        port: 3001,
        stats: { children: false }
    },
    devtool: 'eval-source-map'
}