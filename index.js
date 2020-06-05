const FileManagerPlugin = require('filemanager-webpack-plugin')
const webpack = require('webpack')
const moment = require('moment')
const path = require('path');
const fs = require('fs')
const CompressionWebpackPlugin = require('compression-webpack-plugin');
var name = require('./package.json').name


function productionCommand() {
  var agrs = process.env.npm_config_argv
  if (agrs) {
    var argv = JSON.parse(agrs).cooked
    if (argv && argv.length > 1 && argv[0] == 'run') {
      var command = argv[1]
      if (command && command.split('-').length) {
        var cmdStart = command.split('-')[0]
        var commandName = name
        if (command.split('-').length > 1) {
          commandName = command.split('-')[1]
        }
        if (cmdStart === 'build') {
          return {
            production: true,
            name: commandName
          }
        }
      }
    }
  }

  return {
    production: false,
    name: name
  }
}

module.exports = (api, projectOptions) => {
  api.configureWebpack(() => {
    var plugins = [
      new webpack.IgnorePlugin({
        resourceRegExp: /^\.\/locale$/,
        contextRegExp: /moment$/
      })
    ]
    if (fs.existsSync(path.resolve('public/vendor/'))) {
      plugins.push(      
        new webpack.DllReferencePlugin({
          manifest: require(path.resolve('public/vendor/base-manifest.json'))
        })
      )
      plugins.push(
        new webpack.DllReferencePlugin({
          manifest: require(path.resolve('public/vendor/vant_mini-manifest.json'))
        })
      )
    }

    const date = moment().format('YYYYMMDDHHmmss');
    const command = productionCommand()
    if (command.production) {
      plugins.push(
        new FileManagerPlugin({  //初始化 filemanager-webpack-plugin 插件实例
          onEnd: {
            mkdir: [
              "zips"
            ],
            archive: [ //然后我们选择dist文件夹将之打包成dist.zip并放在根目录
              {source: './dist', destination: `./zips/${command.name}-${date}.zip`},
            ]
          }
        })
      )
      plugins.push(
        new CompressionWebpackPlugin({
          filename: '[path].gz[query]',
          algorithm: 'gzip',
          test: /\.(js|css|txt|json|html|ico|svg)(\?.*)?$/i,
          threshold: 10240,
          minRatio: 0.8
        })
      )
    }
    return {
      plugins
    }
  })

}