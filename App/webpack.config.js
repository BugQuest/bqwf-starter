const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const RemoveEmptyScriptsPlugin = require('webpack-remove-empty-scripts');

module.exports = {
    entry: {
        'css/app': '@/scss/app.scss',
        'js/app': '@/js/app.js',
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
};
