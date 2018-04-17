var webpack = require('webpack')
var path = require('path')

var BUILD_DIR = path.resolve(__dirname + '/build')
var APP_DIR = path.resolve(__dirname + '/app')

var config = {
  entry: ["babel-polyfill", APP_DIR + '/index.js']
, output: {
    path: BUILD_DIR
  , filename: 'bundle.js'
  , publicPath: ''
  }
, resolve: {
    extensions: ['', '.js', '.jsx']
  }
, devtool: 'inline-source-map'
, devServer: {
    inline: true
  , contentBase: BUILD_DIR
  , port: 3333
  , historyApiFallback: true
  }
, module: {
    loaders: [
      {
        test: /\.jsx?/
      , include: APP_DIR
      , loader: 'babel'
      , query: {
          presets: ['stage-0', 'es2015', 'react']
        }
      }
      ,
      {
        test: /\.css$/
      , loader: 'style-loader!css-loader'  
      }
      ,
      {
        test: /\.(png|jpg)$/,
        loader: 'url-loader'
      }
    ]
  }
}

module.exports = config
