
const CompressionPlugin = require('compression-webpack-plugin')



console.log('当前环境 ' + process.env.NODE_ENV)
console.log('当前环境接口地址 ' + process.env.VUE_APP_BASE_URL)

// const cdn = {
//     css: [],
//     js: ['https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.29.1/moment.min.js']
// }

module.exports = {
    publicPath: './',
    outputDir: 'dist',
    assetsDir: './static',
    indexPath: 'index.html',
    productionSourceMap: false,
    filenameHashing: false,
    devServer: {
        // host: '127.0.0.1', // 配置主机地址
        // port: process.env.NODE_ENV == 'production' ? 3000 : 8888, // 配置运⾏的端⼝
        // proxy: "接⼝地址",  跨域代理！ 【重要！】
        proxy: {
            // 配置多个！
            '/api': {
                // target: 'http://localhost:8080/api',
                target: 'http://bitclib.jingshicorp.com:18030',
                ws: true,
                changeOrigin: true,
                pathWrite: {
                    '^/api': ''
                }
            }
        }
    },

    css: {
        loaderOptions: {
            // 向 CSS 相关的 loader 传递选项
            less: {
                javascriptEnabled: true
            }
        }
    },
    configureWebpack: {
        externals: {
            // vue: "Vue",
            // "vue-router": "VueRouter",
            // vuex: "Vuex",
            moment: 'moment'
        },
        plugins: [
            //提供带 Content-Encoding 编码的压缩版的资源
            new CompressionPlugin({
                algorithm: 'gzip',
                test: /\.js$|\.html$|\.css/,// 匹配文件名
                // test: /\.(js|css)$/,         
                threshold: 10240,            // 对超过10k的数据压缩
                deleteOriginalAssets: false, // 不删除源文件
                minRatio: 0.8                // 压缩比
            }),
        ]

    }
}
