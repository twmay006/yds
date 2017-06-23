/* eslint-disable */
// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

module.exports = {
    build: {
        env: require('./prod.env'),
        index: path.resolve(__dirname, '../dist/index.html'),
        assetsRoot: path.resolve(__dirname, '../dist'),
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        productionSourceMap: false,
        // Gzip off by default as many popular static hosts such as
        // Surge or Netlify already gzip all static assets for you.
        // Before setting to `true`, make sure to:
        // npm install --save-dev compression-webpack-plugin
        productionGzip: false,
        productionGzipExtensions: ['js', 'css']
      },
    dev: {
        env: require('./dev.env'),
        port: 9999,
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        proxyTable: {
            '/clubmanager':{
                // target: 'http://101.200.213.220:8081',
                // target: 'http://119.146.222.165:9003',
                target: 'http://192.168.0.190:9000',
                // target: 'http://192.168.0.125:9004',
                // target: 'http://192.168.0.181:9000',
                // target: 'http://192.168.0.71:9000',
                changeOrigin: true,
                // proxyTimeout:600,
                headers: {                      //添加请求头
                    'domainname': 'hyzx.sportgoing.com',
                    // 'domainname': 'hjmain.sportgoing.com',
                    // 'domainname': 'hsqwtzx.sportgoing.com',
                    // 'clubId': '-tpughi1hf31qp4ea7c4oec917fcqvsu'
                },
                pathRewrite: {
                    '^/clubmanager': '/clubmanager'
                }
            }
        },
        // CSS Sourcemaps off by default because relative paths are "buggy"
        // with this option, according to the CSS-Loader README
        // (https://github.com/webpack/css-loader#sourcemaps)
        // In our experience, they generally work as expected,
        // just be aware of this issue when enabling this option.
        cssSourceMap: false
    }
}
