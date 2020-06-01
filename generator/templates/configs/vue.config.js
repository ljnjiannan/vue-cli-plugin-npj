const path = require('path');
const webpack = require('webpack')
const moment = require('moment')
const FileManagerPlugin = require('filemanager-webpack-plugin')
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const fs = require('fs')
var name = require('./package.json').name

module.exports = {
  publicPath: './',
  productionSourceMap: false,
  configureWebpack: config => {

    const date = moment().format('YYYYMMDDHHmmss');
    const productionGzipExtensions = /\.(js|css|txt|json|html|ico|svg)(\?.*)?$/i
    var plugins = [
      new webpack.IgnorePlugin({
        resourceRegExp: /^\.\/locale$/,
        contextRegExp: /moment$/
      })
    ]
    if (fs.existsSync('./public/vendor/')) {
      plugins.push(      
        new webpack.DllReferencePlugin({
          manifest: require('./public/vendor/base-manifest.json')
        })
      )
      plugins.push(
        new webpack.DllReferencePlugin({
          manifest: require('vant_mini-manifest.json')
        })
      )
    }
    if (process.env.NODE_ENV == 'production') {
      plugins.push(
        new FileManagerPlugin({  //初始化 filemanager-webpack-plugin 插件实例
          onEnd: {
            mkdir: [
              "zips"
            ],
            archive: [ //然后我们选择dist文件夹将之打包成dist.zip并放在根目录
              {source: './dist', destination: `./zips/${name}-${date}.zip`},
            ]
          }
        })
      )
      plugins.push(
        new CompressionWebpackPlugin({
          filename: '[path].gz[query]',
          algorithm: 'gzip',
          test: productionGzipExtensions,
          threshold: 10240,
          minRatio: 0.8
        })
      )
    }
    return {
      resolve: {
        alias: {
          "@": path.resolve(__dirname, 'src/'),
          "@view": path.resolve(__dirname, 'src/views'),
          "@components": path.resolve(__dirname, 'src/components'),
          "@assets": path.resolve(__dirname, 'src/assets')
        }
      },
      plugins,
      devtool: 'source-map',
    }
  },
  devServer: {},
  css: {
    loaderOptions: {
      less: {
        modifyVars: {}
      }
    }
    
  }
}
