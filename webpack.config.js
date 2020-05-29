const path = require('path')

const { VueLoaderPlugin } = require('vue-loader')

module.exports = {
  entry: './src/main.ts',
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/'
  },
  module: {
    // decides which files to load
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.ts$/,
        loader: 'ts-loader', 
        options: {
          appendTsSuffixTo: [/\.vue/]
        }
      }
    ]
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ],
  },
  plugins: [
    new VueLoaderPlugin()
  ],
  // auto update code on save
  devServer: {
    overlay: true
  }
}
