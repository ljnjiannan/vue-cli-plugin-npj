# vue-cli-plugin-npj

## 使用
包含preset和generator
```
vue create --preset ljnjiannan/vue-cli-plugin-npj <project-name>
```

### 选择创建模式

创建项目时有单项目和多项目聚合两种模式选择
```
? Choose project mode (Use arrow keys)
❯ signle project 
  multi project 
  
```
#### 模式说明
*单项目：*即传统的项目结构，只是在项目中集成了常用的组件和配置
*多项目聚合：*即将多个相同类型的项目放在同一项目目录下，共用依赖、组件和资源文件等。使用场景举例：为多家医院开发流感调查表。调查表都会有相同的组件和相似的业务，但每家医院又有各自的需求。


#### 为聚合项目添加子项目

```
// 在项目目录下运行
yarn generator <sub-project-name>

// 运行子项目
yarn serve-<sub-project-name>
// 编译打包子项目
yarn build-<sub-project-name>
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

