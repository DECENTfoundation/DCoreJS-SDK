const Webpack = require('webpack');
const Path = require("path");
const Glob = require('glob');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const VENDOR_LIBS = [
    'lodash', 'material-ui', 'moment', 'qs', 'react', 'react-dom', 'react-dropzone', 'react-modal',
    'react-redux', 'react-router', 'react-router-dom', 'redux', 'redux-auth-wrapper', 'redux-observable',
    'redux-thunk', 'reflect-metadata', 'rxjs', 'inversify', 'inversify-inject-decorators', 'axios', 'http-status-codes'
]

module.exports = function config(env) {
    let CONFIG = {
        mode: env,
        entry: { bundle: "./src/index.tsx", vendor: VENDOR_LIBS },
        output: {
            path: Path.resolve(__dirname, "dist"),
            publicPath: "/",
            filename: "[name].[hash].js"
        },
        devtool: 'eval-source-map',
        node: { console: false, fs: 'empty', net: 'empty', tls: 'empty' },
        module: {
            rules: [{
                test: /\.tsx?$/,
                loader: "awesome-typescript-loader",
                include: [Path.join(__dirname, 'config'), Path.join(__dirname, 'src')]
            },
            {
                test: /\.(jpg|png|svg|cur|gif)$/,
                loader: 'file-loader?name=public/images/[name].[ext]',
            },
            {
                test: /\.(eot|ttf|woff|woff2)$/,
                loader: 'file-loader?name=public/fonts/[name].[ext]',
            }]
        },
        resolve: {
            extensions: [".ts", ".tsx", ".js", ".json"],
            alias: {
            }
        },
        optimization: {
            minimize: false,
            runtimeChunk: {
                name: 'vendor'
            },
            splitChunks: {
                cacheGroups: {
                    default: false,
                    commons: {
                        test: /node_modules/,
                        name: 'vendor',
                        chunks: 'initial',
                        minSize: 1
                    }
                }
            }
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: 'index.html',
            }),
            new ExtractTextPlugin('[name].[chunkhash].css'),
        ],
    };

    switch (env) {
        case 'development': {
            CONFIG.devServer = {
                port: '3001',
                historyApiFallback: true,
                publicPath: '/',
            }
            CONFIG.module.rules.push({
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    use: ['css-loader', {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true,
                        },
                    }, 'resolve-url-loader', {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true,
                                includePaths: Glob.sync('node_modules').map((d) => Path.join(__dirname, d)),
                            },
                        },
                    ],
                }),
            })
            return CONFIG;
        }
        case 'production': {
            CONFIG.devtool = false;
            CONFIG.output.publicPath = './';
            CONFIG.module.rules.push({
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    use: ['css-loader', 'resolve-url-loader', {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true,
                            includePaths: Glob.sync('node_modules').map((d) => Path.join(__dirname, d)),
                        },
                    }],
                }),
            })
            CONFIG.plugins.push(...[
                new BundleAnalyzerPlugin(),
                // Minify CSS
                new Webpack.LoaderOptionsPlugin({
                    minimize: true,
                }),
                new UglifyJsPlugin({
                    exclude: 'bundle'
                })
            ])

            return CONFIG;
        }
        default:
            throw new Error(`Unsupported environment ${env}`);
    }
}