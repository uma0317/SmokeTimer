const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: [
    'vuetify'
  ],
  pluginOptions: {
    electronBuilder: {
      preload: 'src/preload.js',
      builderOptions: {
        mac: {
          icon: 'src/assets/app.icns',
        }, win: {
          icon: 'src/assets/icon.ico',
        },
      }
    }
  }
})
