const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader')

module.exports = {
  entry: './src/main.ts',
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/'
  },
  plugins: [
    // new HtmlWebpackPlugin({
    //     // hash: true,
    //     filename: 'index.html',
    //     template: path.resolve(__dirname, './src/index.html'),
    //     // chunks: ['main']
    // })
  ],
  module: {
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
    new VueLoaderPlugin()
  ],
  devServer: {
    // contentBase: path.join(__dirname, "./dist"),
    // publicPath: '/',
    overlay: true,
    historyApiFallback: true,
    watchOptions: {
      // necessary for docker but not for host
      poll: true
    }
  },
}
