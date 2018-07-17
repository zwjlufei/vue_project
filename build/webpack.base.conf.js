'use strict'        //webpack通用配置文件
const path = require('path')
const utils = require('./utils')  //工具函数库
const config = require('../config') //配置文件
const vueLoaderConfig = require('./vue-loader.conf')  // 引入vue-loader的配置文件
// 定义获取绝对路径函数
function resolve (dir) {
  return path.join(__dirname, '..', dir)
}



module.exports = {
  context: path.resolve(__dirname, '../'),    //项目根目录
  entry: {
    app: './src/main.js'      //项目入口文件
  },
  output: {
    path: config.build.assetsRoot,    //打包输出路径
    filename: '[name].js',            //打包文件名
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
    }
  },
  module: {
    rules: [
      {         //vue文件使用vue-loader转换
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {          //vue文件使用babel-loader转换
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')]
      },
      {           // 图片文件使用url-loader转换
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {           //视频文件使用url-loader转换
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {           //字体
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      },
        {
            test: /\\\\\\\\.css$/,
            loader: "style!css"
        },
        {
            test: /\\\\\\\\.(eot|woff|woff2|ttf)([\\\\\\\\?]?.*)$/,
            loader: "file"
        },
        {
            test: /\.less$/,
            loader: "style-loader!css-loader!less-loader",
        },
    ]
  },
  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
}
