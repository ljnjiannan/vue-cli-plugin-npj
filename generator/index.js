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
    './public/': './templates/public/*',
    './': './templates/configs/*'
  })

}
