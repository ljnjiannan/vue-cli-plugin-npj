const path = require('path');
const webpack = require('webpack')
const moment = require('moment')
const FileManagerPlugin = require('filemanager-webpack-plugin')
const CompressionWebpackPlugin = require('compression-webpack-plugin');

module.exports = {
  publicPath: './',
  productionSourceMap: false,
  configureWebpack: config => {
    const date = moment().format('YYYYMMDDHHmmss');
    const productionGzipExtensions = /\.(js|css|txt|json|html|ico|svg)(\?.*)?$/i

    return {
      resolve: {
        alias: {
          "@": path.resolve(__dirname, 'src/'),
          "@view": path.resolve(__dirname, 'src/views'),
          "@components": path.resolve(__dirname, 'src/components'),
          "@assets": path.resolve(__dirname, 'src/assets')
        }
      },
      plugins: [
        new webpack.IgnorePlugin({
          resourceRegExp: /^\.\/locale$/,
          contextRegExp: /moment$/
        }),
        new FileManagerPlugin({  //初始化 filemanager-webpack-plugin 插件实例
          onEnd: {
            archive: [ //然后我们选择dist文件夹将之打包成dist.zip并放在根目录
              {source: './dist', destination: `./gyg-${date}.zip`},
            ]
          }
        }),
        new CompressionWebpackPlugin({
          filename: '[path].gz[query]',
          algorithm: 'gzip',
          test: productionGzipExtensions,
          threshold: 10240,
          minRatio: 0.8
        })
      ],
      devtool: 'source-map',
    }
  },
  devServer: {
    proxy: {}
  },
  css: {
    loaderOptions: {
      less: {
        modifyVars: {}
      }
    }
    
  }
}