const proxyTestSetting = {
	'/api/': {
		target: 'https://testapi.nques.thenextstone.com',
		changeOrigin: true,
	},
	"/file/": {
		target: 'https://testapi.nques.thenextstone.com',
		changeOrigin: true
	},
	"/connect/": {
		target: 'https://testauth.nques.thenextstone.com/',
		changeOrigin: true
	},
	"/signalr-hubs": {
		target: 'https://testapi.nques.thenextstone.com',
		changeOrigin: true,
		ws: true
	}
}

const proxyDevSetting = {
	'/api/': {
		target: 'https://api.nques.thenextstone.com',
		changeOrigin: true,
	},
	"/file/": {
		target: 'https://api.nques.thenextstone.com',
		changeOrigin: true
	},
	"/connect/": {
		target: 'https://auth.nques.thenextstone.com/',
		changeOrigin: true
	},
	"/signalr-hubs": {
		target: 'https://api.nques.thenextstone.com',
		changeOrigin: true,
		ws: true
	}
}

module.exports = {
	proxyTestSetting,
	proxyDevSetting
}