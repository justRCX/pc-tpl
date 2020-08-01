function getAxiosAgent({ service }) {
  let request = function(parms) {
    return new Promise((resolve, reject) => {
      service(parms).then(res => {
        resolve(res.data)
      }).catch(err => {
        reject(err)
      })
    })
  }
  return request
}

function getAxiosPc(axios) {
  let request = function(parms) {
    return new Promise((resolve, reject) => {
      axios(parms).then(res => {
        resolve({
          ...res.data,
          status: res.data.code
        })
      }).catch(err => {
        reject(err)
      })
    })
  }
  return request
}
export { getAxiosAgent, getAxiosPc }
