var fs = require("fs");
var path = require('path')

var requestDir = "./templates/request"

var renderDir = {
  './public/index.html': './templates/public/index.html',
  './npj.config.js': './templates/configs/npj.conf.js',
  './webpack.dll.conf.js': './templates/configs/webpack.dll.conf.js',
  './src/main.js': './templates/main.js',
  './src/conf.js': './templates/conf.js',
}

var requestList = fs.readdirSync(requestDir);
for (var item of requestList) {
  var tarFile = path.join('./src/request',item)
  var srcFile = path.join(requestDir,item)
  renderDir[tarFile] = srcFile
}

module.exports = (api, options, rootOptions) => {
  // 修改 `package.json` 里的字段
  api.extendPackage({
    dependencies: {
      "vant": "^2.8.3",
      "lodash": "^4.17.15",
      "axios": "^0.19.2"
    },
    devDependencies: {
      "clean-webpack-plugin": "^3.0.0",
    },
    scripts: {
      "dll": "webpack -p --progress --config ./webpack.dll.conf.js"
    }
  })

  api.render(renderDir)

}
