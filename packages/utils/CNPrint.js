let index = 0
export default class CNPrint {
	constructor() {
		if (!window.CNPrintSocket || !this.scocketIsOpen()) {
			this.initSocket()
		}
		this.printer = {}
	}
	scocketIsOpen() {
		let readyState = window.CNPrintSocket ? window.CNPrintSocket.readyState : 3
		return readyState == 1 || readyState == 0
	}
	offSocket() {
		window.CNPrintSocket && window.CNPrintSocket.close()
	}
	initSocket() {
		//如果是https的话，端口是13529
		let isHttps = window.location.protocol.indexOf('https') >= 0
		window.CNPrintSocket = new WebSocket(
			isHttps ? 'wss://localhost:13529' : 'ws://localhost:13528',
		)
		let __socket = window.CNPrintSocket
		try {
			__socket.onmessage = (event) => {
				const data = JSON.parse(event.data)
				const cb = JSON.parse(data.requestID.split('#')[1] || `{}`) // 回调数据
				switch (data.cmd) {
					case 'getPrinters':
						// '获取打印'
						this.printer = {
							list: data.printers,
							defaultPrinter: data.defaultPrinter,
						}
						this[cb.method](...cb.params)
						break
					case 'print':
						if (data.status === 'success') {
							// 请求调取后台接口,打印回调
						} else {
							this.$Message.error(`打印失败${data.msg}`)
						}
						break
					default:
				}
			}
		} catch (e) {
			console.log(e)
			console.error('连接菜鸟云打印组件失败')
		}
	}
	sendCmd(cmd, extraRequest) {
		try {
			let request = {
				version: '1.0',
				requestID: Date.now() + Math.random() + index++,
				cmd,
			}
			if (extraRequest) {
				request = {
					...request,
					...extraRequest,
				}
			}
			window.CNPrintSocket.send(JSON.stringify(request))
		} catch (error) {
			this.$Message.error(
				`连接错误,未连接到菜鸟云打印组件，请安装或重启组件后刷新页面再尝试打印`,
			)
		}
	}
}
