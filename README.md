## 珠海航展票务系统

### 技术栈

```
基于vue2 + vue-router + vuex + ES6 + sass + axios
```

### 使用项目

```
1.克隆项目：      git clone https://git.oschina.net/yt200/ticketmanager.git
2.安装nodejs
3.安装依赖：      npm install
4.启动服务：      npm run dev
5.发布代码：      npm run build
```

### 功能

- [x] 异步加载，能够使用浏览器后退前进还原数据
- [x] 权限控制
- [x] 页面跳转，不再执行此页面的ajax请求回调方法
- [x] 记住密码，浏览器不弹窗
- [x] 动态面包屑

### 文件目录
```
  ├── Makefile
  ├── README.md
  ├── .editorconfig                        // 项目编码规范
  ├── .gitignore
  ├── .eslintrc.js                         // js 检查工具
  ├── .babelrc                             // es6 语法
  ├── build
  │   ├── build.js
  │   ├── check-versions.js
  │   ├── dev-client.js
  │   ├── dev-server.js
  │   ├── utils.js
  │   ├── webpack.base.conf.js
  │   ├── webpack.dev.conf.js
  │   └── webpack.prod.conf.js
  ├── config
  │   ├── dev.env.js                       // 测试环境
  │   ├── index.js                         // 启动服务相关配置
  │   └── prod.env.js                      // 生产环境
  ├── favicon.ico                          // icon
  ├── index.html                           // 程序入口html文件
  ├── package.json                         // 配置项目相关信息，通过执行 npm init 命令创建
  └── src                                  // 开发主要目录
      ├── api                              // api
      │   ├── api.js                       // 定义相关的api接口
      │   ├── handleApiErr.js              // 统一处理api相关错误
      │   └── httpCode.js                  // 根据http状态码或者后台返回的code,提示不同的错误
      ├── app.js                           // 程序入口文件，加载各种公共组件
      ├── app.vue                          // 页面入口文件
      ├── assets                           // 静态资源文件
      │   ├── images                       // 图片
      │   └── scss                         // sass文件
      ├── components                       // 公共组件
      │   ├── breadcrumb.vue               // 面包屑
      │   ├── educe.vue                    // 导出
      │   ├── index.js                     // export 组件
      │   ├── pagination.vue               // 分页
      │   ├── scrollTop.vue                // 返回顶部
      │   └── upload.vue                   // 上传
      ├── filters                          // 自定义过滤器
      ├── pages                            // 页面
      │   ├── common                       // 公共页面
      │   │   ├── 404.vue                  // 404
      │   │   ├── abstract.vue             // 页面内容公共组件
      │   │   ├── header.vue               // 页面头部
      │   │   ├── login.vue                // 登录
      │   │   └── sidebar.vue              // 侧边栏
      │   └── modules                      // 页面模块
      ├── router                           // 路由文件
      └── utils                            // 工具函数
```
