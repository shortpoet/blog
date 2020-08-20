const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin');

// from console warning
// https://github.com/vuejs/vue-next/tree/master/packages/vue#bundler-build-feature-flags
// https://webpack.js.org/plugins/define-plugin/
const vueBundlerBuildFeatureFlagsPlugin = new webpack.DefinePlugin({
  '__VUE_OPTIONS_API__': JSON.stringify(true),
  '__VUE_PROD_DEVTOOLS_': JSON.stringify(false)
});

// https://stackoverflow.com/a/33374807/12658653
const copyWebpackPlugin = new CopyWebpackPlugin({
  patterns: [
    { from: 'static' }
  ]
})

module.exports = {
  // https://webpack.js.org/configuration/entry-context/#root
  context: path.resolve(__dirname, './'),
  entry: './src/main.ts',
  output: {
    path: process.env.DOCKER
      ? path.resolve(__dirname, './dist')
      : path.resolve(__dirname, '../docs/'),
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
    extensions: ['.tsx', '.ts', '.js'],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new VueLoaderPlugin(),
    vueBundlerBuildFeatureFlagsPlugin,
    copyWebpackPlugin
  ],
  devServer: {
    overlay: true,
    historyApiFallback: true
  }
}
