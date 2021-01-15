console.log('当前环境 ' + process.env.NODE_ENV)
console.log('当前环境接口地址 ' + process.env.VUE_APP_BASE_URL)

module.exports = {
	publicPath: './',
	outputDir: 'dist',
	assetsDir: './static',
    indexPath: 'index.html',
    productionSourceMap: false,
	devServer: {
		// host: '127.0.0.1', // 配置主机地址
		// port: process.env.NODE_ENV == 'production' ? 3000 : 8888, // 配置运⾏的端⼝
		// proxy: "接⼝地址",  跨域代理！ 【重要！】
		proxy: {
			// 配置多个！
			'/api': {
				target: 'http://localhost:8080/api',
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
	}
}
