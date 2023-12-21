module.exports = {
  publicPath: "./",
  transpileDependencies: true,
  configureWebpack:{
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
