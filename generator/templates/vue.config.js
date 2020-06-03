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
  configureWebpack: () => {
    var plugins = []
    if (fs.existsSync('./public/vendor/')) {
      plugins.push(      
        new webpack.DllReferencePlugin({
          manifest: require('./public/vendor/base-manifest.json')
        })
      )
      plugins.push(
        new webpack.DllReferencePlugin({
          manifest: require('./public/vendor/vant_mini-manifest.json')
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
