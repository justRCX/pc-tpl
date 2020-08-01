let popUpConfig = {
  router: null,
  store: null
}
let init = function(options) {
  if (!options.router) {
    return popUpConfig
  } else {
    popUpConfig = { ...popUpConfig, ...options }
  }
}
export default init
