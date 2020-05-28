const FileManagerPlugin = require('filemanager-webpack-plugin')

module.exports = (api, projectOptions) => {
  api.configureWebpack(webpackConfig => {
    // 修改 webpack 配置
    // 或返回通过 webpack-merge 合并的配置对象
    var date = '1234'
    return {
      plugins: [
        new FileManagerPlugin({  //初始化 filemanager-webpack-plugin 插件实例
          onEnd: {
            delete: [   //首先需要删除项目根目录下的dist.zip
                './dist.zip',
            ],
            archive: [ //然后我们选择dist文件夹将之打包成dist.zip并放在根目录
              {source: './dist', destination: `./gyg-${date}.zip`},
            ]
          }
        }),
      ]
    }
  })
}