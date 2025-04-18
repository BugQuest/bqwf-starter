const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const RemoveEmptyScriptsPlugin = require('webpack-remove-empty-scripts');

module.exports = {
    entry: {
        'dist/css/app': '@/scss/app.scss',
        'dist/js/app': '@/js/app.js',
        'admin/dist/js/admin-options-test': '@/js/admin-options-test.js',
        'admin/dist/css/admin': '@framework/scss/admin.scss',
        'admin/dist/css/admin-light': '@framework/scss/admin-light.scss',
        'admin/dist/js/admin': '@framework/js/admin.js',
        'admin/dist/js/admin-options-images': '@framework/js/admin-options-images.js',
        'dist/js/global': '@framework/js/global.js'
    },
    resolve: {
        alias: {
            '@framework': path.resolve(__dirname, '../vendor/bugquest/web-framework/Assets/'),
            '@': path.resolve(__dirname, './Assets/'),
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
