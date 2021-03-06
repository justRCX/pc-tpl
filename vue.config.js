const path = require('path')

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  lintOnSave: false,
  // 修改 src 目录 为 examples 目录
  devServer: {
    proxy: {
      '/bs': {
        target: ' http://pc.tecqm.com',
        changeOrigin: true,
        pathRewrite: {
          '^/bs': '/',
        },
      },
    },
  },
  pages: {
    index: {
      entry: 'examples/main.js',
      template: 'public/index.html',
      filename: 'index.html',
    },
  },
  chainWebpack: config => {
    config.module
      .rule('js')
      .include.add(/packages/)
      .end()
      .include.add(/examples/)
      .end()
      .use('babel')
      .loader('babel-loader')
      .tap(options => {
        return options;
      });
  },
  transpileDependencies: []
}
