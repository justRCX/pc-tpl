let index = 0
/***
 *
 * 获取请求的UUID，指定长度和进制,如
 * getUUID(8, 2)   //"01001010" 8 character (base=2)
 * getUUID(8, 10) // "47473046" 8 character ID (base=10)
 * getUUID(8, 16) // "098F4D35"。 8 character ID (base=16)
 *
 */
function getUUID(len, radix) {
	var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split(
		'',
	)
	var uuid = [],
		i
	radix = radix || chars.length
	if (len) {
		for (i = 0; i < len; i++) uuid[i] = chars[0 | (Math.random() * radix)]
	} else {
		var r
		uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-'
		uuid[14] = '4'
		for (i = 0; i < 36; i++) {
			if (!uuid[i]) {
				r = 0 | (Math.random() * 16)
				uuid[i] = chars[i == 19 ? (r & 0x3) | 0x8 : r]
			}
		}
	}
	return uuid.join('')
}
export default class CNPrint {
	constructor($message) {
		if (!window.CNPrintSocket || !this.scocketIsOpen()) {
			// this.initSocket()
		}
		this.$message = $message
		this.printSuccessCb = null
		this.callback = null
	}

	scocketIsOpen() {
		let readyState = window.CNPrintSocket ? window.CNPrintSocket.readyState : 3
		return readyState == 1 || readyState == 0
	}
	offSocket() {
		window.CNPrintSocket && window.CNPrintSocket.close()
	}
	socketOnMessage() {
		let __socket = window.CNPrintSocket
		__socket.onmessage = (event) => {
			const data = JSON.parse(event.data)
			console.log(data, /cb/)
			switch (data.cmd) {
				case 'getPrinters':
					// '获取打印机列表以及默认打印机'
					this.callback &&
						this.callback({
							list: data.printers,
							defaultPrinter: data.defaultPrinter,
						})
					break
				case 'print':
					if (data.status === 'success') {
						// 请求调取后台接口,打印回调
						this.printSuccessCb && this.printSuccessCb(data)
					} else {
						console.log(data)
						this.$message.error(`打印失败${data.msg}`)
					}
					break
				default:
			}
		}
	}
	socketOnOpen() {
		return new Promise((resolve, reject) => {
			try {
				let __socket = window.CNPrintSocket
				__socket.onopen = () => {
					resolve()
				}
			} catch (err) {
				console.log(err, /cuowuxinxi111/)
			}
		})
	}
	socketOnError() {
		let __socket = window.CNPrintSocket
		__socket.onerror = (event) => {
			console.log(event)
			this.$message.error(
				`连接失败,未连接到菜鸟云打印组件，请安装或重启组件后刷新页面再尝试`,
			)
		}
	}
	initSocket() {
		try {
			//如果是https的话，端口是13529
			let isHttps = window.location.protocol.indexOf('https') >= 0
			window.CNPrintSocket = new WebSocket(
				isHttps ? 'wss://localhost:13529' : 'ws://localhost:13528',
			)
			this.socketOnOpen()
			this.socketOnError()
			this.socketOnMessage()
		} catch (e) {
			reject(e)
			console.log(e, /cuowuxinxi/)
			this.$message.error(
				`连接错误,未连接到菜鸟云打印组件，请安装或重启组件后刷新页面再尝试`,
			)
		}
	}
	getData(dataArr) {
		return dataArr.map((item) => {
			const documentID = this.getUniId() // 自定义模板打印要保证documentID唯一
			return {
				documentID,
				contents: [JSON.parse(item)],
			}
		})
	}
	getUniId() {
		return Date.now() + Math.floor(Math.random() * 100) + index++
	}
	getPrintList(cb) {
		try {
			let readyState = window.CNPrintSocket
				? window.CNPrintSocket.readyState
				: 3
			this.callback = cb
			var request = {
				requestID: getUUID(8, 16),
				version: '1.0',
				cmd: 'getPrinters',
			}
			if (readyState == 1) {
				window.CNPrintSocket.send(JSON.stringify(request))
				return
			} else if (readyState == 2 || readyState == 3) {
				this.initSocket()
			}
			this.socketOnOpen().then(() => {
				window.CNPrintSocket.send(JSON.stringify(request))
			})
		} catch (error) {
			console.log(error)
			this.$message.error(
				`连接错误,未连接到菜鸟云打印组件，请安装或重启组件后刷新页面再尝试`,
			)
		}
	}

	sendCmd(
		cmd,
		extraRequest,
		printer,
		callback,
		preview = false,
		previewType = 'image',
	) {
		try {
			this.printSuccessCb = callback
			let request = {
				version: '1.0',
				requestID: getUUID(8, 16),
				cmd,
			}
			let otherData = this.getData(extraRequest)
			// previewType, // 生成的预览文件格式 image|pdf
			let task = {
				taskID: getUUID(8, 10),
				printer,
				preview, // 预览或者打印 true: 预览 false: 打印
				previewType,
				documents: otherData,
			}
			if (extraRequest) {
				request = {
					...request,
					task: {
						...task,
					},
				}
			}
			console.log(request, /request/)
			window.CNPrintSocket.send(JSON.stringify(request))
		} catch (error) {
			console.log(error)
			this.$message.error(
				`连接错误,未连接到菜鸟云打印组件，请安装或重启组件后刷新页面再尝试打印`,
			)
		}
	}
}
