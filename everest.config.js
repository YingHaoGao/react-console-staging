module.exports = {
  baseURL: '/cmdb',
  pages: {
    index: {
      entry: './src/index.js',
      template: './public/index.html'
    }
  },
  themes: ['white', 'blue'],
  alias: {
    '@': './src'
  },
  proxy: {
    context: ['/tenant/**', '/api/**', '/notify/**', '/frontend/**', '/boss/**'],
    // target: 'http://newprod.dev.cn/crm/api'
    target: 'http://219.141.190.198/'
  }
}