const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const webpack = require('webpack')

// from console warning
// https://github.com/vuejs/vue-next/tree/master/packages/vue#bundler-build-feature-flags
// https://webpack.js.org/plugins/define-plugin/
// const vueBundlerBuildFeatureFlagsPlugin = new webpack.DefinePlugin({
//   '__VUE_OPTIONS_API__': JSON.stringify(true),
//   '__VUE_PROD_DEVTOOLS_': JSON.stringify(false)
// });

module.exports = {
  entry: './src/main.ts',
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        // exclude: /node_modules/
      },
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        options: {
          appendTsSuffixTo: [/\.vue/]
        },
        // exclude: /node_modules/
      },
      {
        test: /\.css$/i,
        use: [
          'style-loader',
          'css-loader',
        ]
      }
    ]
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new VueLoaderPlugin(),
    // vueBundlerBuildFeatureFlagsPlugin
  ],
  devServer: {
    overlay: true,
    historyApiFallback: true
  }
}
