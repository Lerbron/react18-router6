const proxyTestSetting = {
	"/api": {
    target: "https://cnodejs.org",
    changeOrigin: true
  }
	
}

const proxyDevSetting = {
	"/api": {
    target: "https://cnodejs.org",
    changeOrigin: true
  }

}

module.exports = {
	proxyTestSetting,
	proxyDevSetting
}