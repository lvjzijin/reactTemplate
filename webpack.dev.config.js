const path = require('path');
const merge = require('webpack-merge');
const commonConfig = require('./webpack.config');

const devConfig = {
    mode: 'development',
    /*入口*/
    entry: {
        app: [
            'react-hot-loader/patch',
            path.join(__dirname, 'src/index.js')
        ]
    },
    /*输出到dist文件夹，输出文件名称为bundle.js*/
    output: {
        /*这里本来应该是[chunkhash]的，但是由于[chunkhash]和react-hot-loader不兼容。只能妥协*/
        filename: '[name].[hash].js',
    },
    devServer: {
        contentBase: path.join(__dirname, './dist'),
        port: 8000,
        historyApiFallback: true,
    }
};
module.exports = merge({
    customizeArray(a,b,key){
        if(key=== 'entry.app'){
            return b;
        }
        return undefined;
    }
})(commonConfig, devConfig);