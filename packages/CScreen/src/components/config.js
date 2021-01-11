let config = {
	socketUrl:
		window.location.host == 'pc.tecqm.com'
			? 'wss://mp.tecqm.club:9502'
			: 'wss://mp.wkdao.com:9502',
}
if (process.env.NODE_ENV == 'development') {
	// 开发
	config = {
		socketUrl: 'wss://mp.tecqm.club:9502',
	}
}

export { config }
