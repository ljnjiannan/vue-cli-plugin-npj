
module.exports = (api, options, rootOptions) => {
  // 修改 `package.json` 里的字段
  api.extendPackage({
    dependencies: {
      "vant": "^2.8.3",
      "lodash": "^4.17.15",
      "axios": "^0.19.2",
      "moment": "^2.24.0",
      "vue-router": "^3.2.0",
      "vuex": "^3.4.0"
    },
    devDependencies: {
      "clean-webpack-plugin": "^3.0.0"
    },
    scripts: {
      "dll": "webpack -p --progress --config ./webpack.dll.conf.js",
      "generator": "vue invoke vue-cli-plugin-npj --projectMode generator --name",
    }
  })

  if (options.projectMode == 'signle project') {
    // 创建单项目
    api.render("./templates")
  } else if (options.projectMode == 'multi project') {
    // 创建多项目聚合
    api.render("./templates-multi")
    api.extendPackage({
      scripts: {
        "serve-project": "vue-cli-service serve src/project",
        "build-project": "vue-cli-service build src/project",
      }
    })
  } else if (options.projectMode == 'generator') {
    // 在已生成的聚合项目中生成新的节点项目
    var projectName = options.name
    if (projectName != true) {
      var newFiles = []
      for (var item of projectFilePaths) {
        newFiles[`src/${projectName}/${item}`] = `./templates-new/${item}`
      }
      api.render(newFiles)      
      api.extendPackage({
        scripts: {
          "serve-project": `vue-cli-service serve src/${projectName}`,
          "build-project": `vue-cli-service build src/${projectName}`,
        }
      })
    }
    
  }


}
