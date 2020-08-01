import commonHeader from './common-header/index.js'
import { couponList, couponListChoose } from './coupon-List/index.js'
import { CImg, imgContentAgent, imgContentPc } from './img-upload/index'
let components = [
	commonHeader,
	couponList,
	couponListChoose,
	CImg,
	imgContentAgent,
	imgContentPc,
]

import { getAxiosAgent, getAxiosPc } from './utils/request'
import init from './utils/get-config'
import { myImgDialogAgentFun } from './img-upload/img-content-agent.vue'
import { myDialogFun } from './img-upload/img-content-pc.vue'
const install = function(Vue, opts = {}) {
	// 判断是否安装
	if (install.installed) return
	init({
		router: opts.router,
		store: opts.store,
	})
	components.forEach((component) => {
		console.log(component.name, /name/)
		Vue.component(component.name, component)
	})
	Vue.prototype.$pcTpl = {
		from: opts.from || '',
		api: opts.api,
		router: opts.router,
		store: opts.store,
	}
	Vue.prototype.$pcTpl.imgChoose = opts.from ? myImgDialogAgentFun : myDialogFun
	Vue.prototype.$pcTpl.axios = opts.from
		? getAxiosAgent(opts.axios)
		: getAxiosPc(opts.axios)
}

// 判断是否是直接引入文件
/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
	install(window.Vue)
}
export default { install }
