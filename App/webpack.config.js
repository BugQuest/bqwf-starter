const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const RemoveEmptyScriptsPlugin = require('webpack-remove-empty-scripts');

module.exports = {
    entry: {
        'dist/css/app': './Assets/scss/app.scss',
        'dist/js/app': './Assets/js/app.js',
        'admin/dist/js/admin-options-test': './Assets/js/admin-options-test.js',
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './Assets/'),
            '@framework': path.resolve(__dirname, '../vendor/bugquest/web-framework/Assets/')
        },
        extensions: ['.js', '.scss'], // facultatif
    },
    output: {
        path: path.resolve(__dirname, '../htdocs/cms'),
        filename: '[name].js',
        clean: false,
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
