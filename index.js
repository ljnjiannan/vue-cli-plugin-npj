const FileManagerPlugin = require('filemanager-webpack-plugin')

module.exports = (api, projectOptions) => {
  api.configureWebpack(() => {

    var plugins = [
      new webpack.IgnorePlugin({
        resourceRegExp: /^\.\/locale$/,
        contextRegExp: /moment$/
      })
    ]

    const date = moment().format('YYYYMMDDHHmmss');
    const productionGzipExtensions = /\.(js|css|txt|json|html|ico|svg)(\?.*)?$/i
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
      plugins
    }
  })

  api.registerCommand('create', args => {
    console.log('create')
    console.log(args)
    console.log(api)
    console.log(projectOptions)
  })
}