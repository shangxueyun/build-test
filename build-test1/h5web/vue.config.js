module.exports = {
	devServer: {
		proxy: {
			'/wx': {
				target: process.env.VUE_APP_BASEURL,
				// target: 'http://test.unioncotton.com/',
				ws: false, //开启websocket代理
				changeOrigin: true, //虚拟服务器收发请求，解决跨域
				pathRewrite: {
					'^/wx ': '/wx'
				}
			},
		},
		disableHostCheck: true
	}
}

