const proxyTestSetting = {
	'/api/': {
		target: 'https://www.baidu.com',
		changeOrigin: true,
	},
	
}

const proxyDevSetting = {
	'/api/': {
		target: 'https://www.baidu.com',
		changeOrigin: true,
	},

}

module.exports = {
	proxyTestSetting,
	proxyDevSetting
}