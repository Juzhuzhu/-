const {defineConfig} = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true,
    lintOnSave: false,
    devServer: {
        port: 8091,
    }
    /*devServer: {
        // Paths
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        proxy: {     //axios跨域处理
            '/api': {       //此处并非和url一致 任意取 但要与 Vue.prototype.HOME 的值一样
                target: 'http://127.0.0.1:8081/', // 你的数据连接
                changeOrigin: true, //允许跨域  关键
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }*/
})
