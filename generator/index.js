var fs = require("fs");
var path = require('path')

// var requestDir = path.resolve("./","templates/request")

var renderDir = {
  './public/index.html': './templates/public/index.html',
  './npj.conf.js': './templates/configs/npj.conf.js',
  './vue.config.js': './templates/configs/vue.config.js',
  './webpack.dll.conf.js': './templates/configs/webpack.dll.conf.js',
  './src/main.js': './templates/main.js',
  'src/request/index.js': 'templates/request/index.js',
  'src/request/urls.js': 'templates/request/urls.js'
}

module.exports = (api, options, rootOptions) => {
  // 修改 `package.json` 里的字段
  api.extendPackage({
    dependencies: {
      "vant": "^2.8.3",
      "lodash": "^4.17.15",
      "axios": "^0.19.2",
      "moment": "^2.24.0",
    },
    devDependencies: {
      "clean-webpack-plugin": "^3.0.0",
      "filemanager-webpack-plugin": "^2.0.5",
      "compression-webpack-plugin": "^3.0.0",
    },
    scripts: {
      "dll": "webpack -p --progress --config ./webpack.dll.conf.js"
    }
  })

  api.render("./templates")

}
