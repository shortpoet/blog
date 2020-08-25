const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin');
const dotenv = require("dotenv").config({path: __dirname + '/.env'});
console.log(dotenv.parsed);
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
// https://stackoverflow.com/questions/30030031/passing-environment-dependent-variables-in-webpack
// https://veerasundar.com/blog/2019/01/how-to-inject-environment-values-in-javascript-app-with-webpack/
// https://stackoverflow.com/questions/28572380/conditional-build-based-on-environment-using-webpack

const environmentPlugin = new webpack.DefinePlugin({
  "process.env": dotenv.parsed
})

module.exports = {
  // https://webpack.js.org/configuration/entry-context/#root
  context: path.resolve(__dirname, './'),
  entry: './src/main.ts',
  output: process.env.NODE_ENV == 'production'
    ? { 
      path: process.env.DOCKER == '1'
        ? path.resolve(__dirname, './dist')
        : path.resolve(__dirname, '../docs/'),
      publicPath: '/dist/'
    }
    : {
      publicPath: '/dist/'
    }
    ,
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
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new VueLoaderPlugin(),
    vueBundlerBuildFeatureFlagsPlugin,
    copyWebpackPlugin,
    environmentPlugin
  ],
  devServer: {
    overlay: true,
    historyApiFallback: true
  }
}
