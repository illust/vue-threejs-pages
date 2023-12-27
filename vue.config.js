const path = require("path");

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
  ? 'https://github.com/illust/vue-threejs-pages' // note the trailing slash
  : '/',
  transpileDependencies: true,
  configureWebpack:{
    resolve: {
      alias: {
        "@": resolve("src")
      }
    },
    module: {
      rules: [
        {
          test: /\.(glb|gltf)$/i,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 10000,
              },
            },
          ],
        },
      ],
    },
  }
}
