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
  },
  "/s3": {
    target: "https://test-cn-socraticlab-recording.s3.cn-north-1.amazonaws.com.cn",
    pathRewrite: { '^/s3': '' },
    changeOrigin: true
  }

}

module.exports = {
	proxyTestSetting,
	proxyDevSetting
}