import commonHeader from './common-header/index.js'
import MZText from './MZText/index.js'
import MZWhite from './MZWhite/index.js'
import PicAd from './PicAD/index.js'
import Goods from './Goods/index.js'
import couponList from './coupon-List/index.js'
import couponListChoose from './coupon-List/couponListChoose.js'
import CImg from './img-upload/c-img.vue'
import imgContentAgent from './img-upload/img-content-agent.vue'
import imgContentPc from './img-upload/img-content-pc.vue'
import goodsOnShelves from './choose-list/index.js'
let components = [
	commonHeader,
	MZText,
	MZWhite,
	PicAd,
	Goods,
	couponList,
	couponListChoose,
	CImg,
	imgContentAgent,
	imgContentPc,
	goodsOnShelves,
]

import { getAxiosAgent, getAxiosPc } from './utils/request'
import init from './utils/get-config'
import { myImgDialogAgentFun } from './img-upload/img-content-agent.vue'
import { myDialogFun } from './img-upload/img-content-pc.vue'
import myDialog from './utils/popup'
import { goodsOnShelvesInstance } from './choose-list/src/goods.vue'
import CNPrint from './utils/CNPrint'
console.log(CNPrint, /aaa/)

const install = function(Vue, opts = {}) {
	// 判断是否安装
	if (install.installed) return
	init({
		router: opts.router,
		store: opts.store,
	})
	components.forEach((component) => {
		Vue.component(component.name, component)
	})
	Vue.prototype.$pcTpl = {
		from: opts.from || '',
		api: opts.api,
		router: opts.router,
		store: opts.store,
		vue: Vue,
	}

	Vue.prototype.$pcTpl.goodsOnShelvesInstance = goodsOnShelvesInstance
	Vue.prototype.$pcTpl.myDialog = myDialog
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
export { CNPrint }
