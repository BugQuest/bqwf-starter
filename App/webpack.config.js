const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const RemoveEmptyScriptsPlugin = require('webpack-remove-empty-scripts');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');


module.exports = {
    entry: {
        'css/app': '@/scss/app.scss',
        'js/app': '@/js/app.js',
        'js/admin/admin-options-test': '@/js/admin-options-test.js',
    },
    resolve: {
        alias: {
            '@framework': path.resolve(__dirname, '../vendor/bugquest/web-framework/Assets/'),
            '@': path.resolve(__dirname, './Assets/'),
        },
        extensions: ['.js', '.scss'],
    },
    output: {
        path: path.resolve(__dirname, '../htdocs/dist'),
        filename: '[name].js',
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
        ],
    },
    plugins: [
        new RemoveEmptyScriptsPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name].css',
        }),
    ],
    mode: 'development',
    devtool: 'source-map',
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    compress: true,
                    mangle: true,
                    format: {
                        comments: false,
                    },
                },
                extractComments: false,
            }),
            new CssMinimizerPlugin(),
        ],
    },
};
