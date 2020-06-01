# vue-cli-plugin-npj
A vue project generator plugin

## 使用
包含preset和generator
```
vue create --preset ljnjiannan/vue-cli-plugin-npj <project-name>
```

## 项目结构说明
### 集成的第三方库
      "vant": "^2.8.3"
      "lodash": "^4.17.15"
      "axios": "^0.19.2"
      "moment": "^2.24.0",

      
### dllPlugin预编译说明
项目中配置了两个预编译库，其中base库包含了vue、vuex、vue-router、axios，vant_mini库包含其中部分常用vant-ui组件，组件配置在`./npj.conf.js`文件中。初始化项目或者修改了预编译组件配置后运行`npm run dll`命令执行预编译。


### entry说明
vue的入口文件为`./src/main.js`文件，从main.js文件中可以看到预先配置的三个prototype

```
Vue.prototype._ = lodash
Vue.prototype.$request = request
Vue.prototype.$urls = request.urls
```

以及预先导入的七个常用UI组件

```
Vue.use(Button)
Vue.use(Field)
Vue.use(Picker)
Vue.use(Popup)
Vue.use(Dialog)
Vue.use(Icon)
Vue.use(Toast)
```

### build说明
执行`npm run build`命令后会将`dist`文件夹下的文件自动压缩到zips目录下

