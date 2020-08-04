import Vue from "vue";
import init from './get-config'
let instances = [];
let _destory = function(item) {
  if (item) {
    item.$destroy();
    item.$el && document.body.removeChild(item.$el);
    let index = instances.findIndex(itemEl => itemEl.$options.name == item.$options.name);
    if (index >= 0) {
      instances.splice(index, 1);
    }
  }
}
let destoryAll = function() {
  instances.forEach(item => {
    item.visible = false
  });
}

class myDialog {
  constructor(case1, options) {
    if (!case1.name) {
      throw new Error("目标组件必传,且name必填,并确保其唯一性");
    }
    this.case = case1;
    this.vm = "";
    this.removeInstance = () => {
      this.vm.visible = false;
    }
  }
  popup(options) {
    let { router, store } = init({})
    router.afterEach(item => { this.removeInstance() })
    return new Promise((resolve, reject) => {
      let constructor = Vue.extend(this.case);
      let vm = new constructor({
        data: { ...options },
        router,
        store
      });
      let exit = instances.find(item => item.$options.name == this.case.name);

      if (exit) {
        _destory(exit);
      }
      this.vm = vm;
      vm.$mount();
      document.body.appendChild(vm.$el);
      vm.visible = true;
      instances.push(vm);
      vm.$on("destory", obj => {
        _destory(vm);
        reject({
          type: 'destory',
          data: obj || ''
        })
      });
      vm.$on("sure", res => {
        vm.visible = false;
        resolve(res);
      });
      vm.$on("cancel", error => {
        vm.visible = false;
        reject({
          type: 'cancel',
          data: error || '用户取消操作'
        });
      });
    });
  }
}

export default myDialog;
export { destoryAll }
