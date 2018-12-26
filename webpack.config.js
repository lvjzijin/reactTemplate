const path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');
var webpack = require('webpack');


const commonConfig = {
    entry: {
        app: [
            path.join(__dirname, 'src/index.js')
        ]
    },

    output: {
        path: path.join(__dirname, './dist'),
        filename: '[name].[chunkhash].js',
        chunkFilename: '[name].[chunkhash].js',
        publicPath : '/',
        libraryTarget: "umd"
    },
    module: {
        rules: [
            {
                oneOf: [
                    {
                        test: /\.(js|jsx)$/,
                        use: ['babel-loader?cacheDirectory=true'],
                        //include: path.join(__dirname, 'src')
                        exclude: /node_modules/
                    },
                    {
                        test: /\.(css|less)$/,
                        use: [
                            require.resolve('style-loader'),
                            {
                                loader: require.resolve('css-loader'),
                                options: {
                                    importLoaders: 1,
                                }
                            },
                            {
                                loader: require.resolve('postcss-loader'),
                                options: {
                                    // Necessary for external CSS imports to work
                                    // https://github.com/facebookincubator/create-react-app/issues/2677
                                    ident: 'postcss',
                                    plugins: () => [
                                        require('postcss-flexbugs-fixes'),
                                        autoprefixer({
                                            browsers: [
                                                '>1%',
                                                'last 4 versions',
                                                'Firefox ESR',
                                                'not ie < 9', // React doesn't support IE8 anyway
                                            ],
                                            flexbox: 'no-2009',
                                        }),
                                    ],
                                },
                            },
                            {
                                loader: require.resolve("less-loader"),
                                options: {
                                    javascriptEnabled: true
                                }

                            },
                        ]
                    },
                    {
                        test: /\.(png|jpe?g|gif|GIF|JPE?G|PNG|bmp)/,
                        loader: require.resolve('url-loader'),
                        options: {
                            limit: 10000
                        }
                    },
                    {
                        loader: require.resolve('file-loader'),
                        // Exclude `js` files to keep "css" loader working as it injects
                        // it's runtime that would otherwise processed through "file" loader.
                        // Also exclude `html` and `json` extensions so they get processed
                        // by webpacks internal loaders.
                        exclude: [/\.js$/, /\.html$/, /\.json$/],
                        options: {
                            name: 'static/media/[name].[hash:8].[ext]',
                        }
                    }
                ]
            }
        ]
    },
    resolve: {
        alias: {
            containers: path.join(__dirname, 'src/containers'),
            components: path.join(__dirname, 'src/components'),
            ucCommon: path.join(__dirname, 'src/common/service'),
            _: "underscore"
        },
        extensions: ['.js', '.json', '.jsx'],
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.join(__dirname, 'public/index.html')
        }),
        new webpack.HashedModuleIdsPlugin()  //优化缓存插件
    ],
    optimization: {
        runtimeChunk: 'single',
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all'
                }
            }
        }
    }
};

module.exports = commonConfig;