const path = require('path')
const webpack = require('webpack')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

//const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
    mode: 'development',
    devtool: 'source-map',
    entry: {
        polyfill: 'babel-polyfill',
        app: './src/client/index.js',
    },
    output: {
        libraryTarget: 'var',
        library: 'Client'
    },
    module: {
        // rules: [{
        //         test: /\.(png|jpg|gif|svg)$/,
        //         exclude: [
        //             path.resolve(__dirname, './node_modules'),
        //         ],
        //         use: {
        //             loader: 'file-loader',
        //             options: {
        //                 name: '[path][name]-[hash].[ext]',
        //                 outputPath: '../',
        //                 publicPath: '/dist',
        //             },
        //         }
        //     },
        rules: [{
                test: /\.(png|jpg)$/,
                loader: "url-loader",
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'eslint-loader',
                options: {

                }
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: './src/client/views/index.html',
            filename: 'index.html'
        }),
        new CleanWebpackPlugin({
            dry: false,
            verbose: true,
            cleanStaleWebpackAssets: true,
            protectWebpackAssets: false
        }),
        new CopyWebpackPlugin([
            { from: './src/client/img', to: 'img' }
        ]),
        //new BundleAnalyzerPlugin()
    ]
}