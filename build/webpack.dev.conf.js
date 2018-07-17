'use strict'            //开发环境下配置文件
const utils = require('./utils')     //引入函数工具库
const webpack = require('webpack')   //引入webpack
const config = require('../config')  //引入config下index.js配置
const merge = require('webpack-merge')  //合并webpack配置
const path = require('path')
const baseWebpackConfig = require('./webpack.base.conf')    //webpack基本配置
const CopyWebpackPlugin = require('copy-webpack-plugin')    //拷贝插件
const HtmlWebpackPlugin = require('html-webpack-plugin')    //生成html插件
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')  //提示插件
const portfinder = require('portfinder')   //查找可用端口号

const HOST = process.env.HOST     //host
const PORT = process.env.PORT && Number(process.env.PORT)   //端口

//合并基本webpack配置
const devWebpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: config.dev.devtool,

  // these devServer options should be customized in /config/index.js
  //开发配置
  devServer: {
    clientLogLevel: 'warning',
    historyApiFallback: {
      rewrites: [
        { from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, 'index.html') },
      ],
    },
    hot: true,      //热更新
    contentBase: false, // since we use CopyWebpackPlugin.
    compress: true,     //一切服务都启用gzip压缩
    host: HOST || config.dev.host,
    port: PORT || config.dev.port,    //端口号 默认8080
    open: config.dev.autoOpenBrowser, //是否自动打开浏览器
    //是否在浏览器以遮罩形式显示报错信息
    overlay: config.dev.errorOverlay
      ? { warnings: false, errors: true }
      : false,
    publicPath: config.dev.assetsPublicPath,
    proxy: config.dev.proxyTable,     //代理
    quiet: true, // 是否在控制台打印警告或错误  true为不打印
    watchOptions: {    //监视文件配置
      poll: config.dev.poll,
    },
    disableHostCheck: true
  },
    //插件配置
  plugins: [
    new webpack.DefinePlugin({
      'process.env': require('../config/dev.env')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    //动态生成html文件
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.dev.assetsSubDirectory,
        ignore: ['.*']
      }
    ])
  ]
})

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config
      devWebpackConfig.devServer.port = port

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
        },
        onErrors: config.dev.notifyOnErrors
        ? utils.createNotifierCallback()
        : undefined
      }))

      resolve(devWebpackConfig)
    }
  })
})
