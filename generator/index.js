module.exports = (api, options, rootOptions) => {
  // 修改 `package.json` 里的字段
  api.extendPackage({
    dependencies: {
      "vant": "^2.8.3",
      "lodash": "^4.17.15",
      "axios": "^0.19.2"
    },
    scripts: {
      "dll": "webpack -p --progress --config ./webpack.dll.conf.js"
    }
  })

  api.render({
    './public/index.html': './templates/public/index.html',
    './npj.config.js': './templates/configs/npj.config.js',
    './webpack.dll.conf.js': './templates/webpack.dll.conf.js'
  })

}
