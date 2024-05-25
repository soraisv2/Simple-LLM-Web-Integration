const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
  // devServer: {
  //   proxy: {
  //     '/api': {
  //       target: 'http://127.0.0.1:5000',  // Adresse de votre backend Flask
  //       changeOrigin: true,
  //       pathRewrite: {
  //         '^/api': ''  // Supprimer le préfixe /api de l'URL de la requête
  //       }
  //     }
  //   }
  // }
})
