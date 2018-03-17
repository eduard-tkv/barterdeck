var webpack = require('webpack')
var path = require('path')

var BUILD_DIR = path.resolve(__dirname + '/build')
var APP_DIR = path.resolve(__dirname + '/app')

var config = {
  entry: ['webpack-dev-server/client?http://localhost:8080', APP_DIR + '/index.js']
, output: {
    path: BUILD_DIR
  , filename: 'bundle.js'
  , publicPath: '/'
  }
, resolve: {
    extensions: ['', '.js', '.jsx']
  }
, devtool: 'source-map'
, devServer: {
  proxy: {
    '/api': {
      target: 'https://35.164.214.160',
      secure: false
    }
  }
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
