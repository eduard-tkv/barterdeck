var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname + '/build')
var APP_DIR = path.resolve(__dirname + '/app')

var config = {
  entry: APP_DIR + '/index.js'
, output: {
    path: BUILD_DIR
  , filename: 'bundle.js'
  , publicPath: '/'
  }
, resolve: {
    extensions: ['', '.js', '.jsx']
  }
, module: {
  loaders: [
    {
      test: /\.jsx?/
    , include: APP_DIR
    , loader: 'babel'
    , query: {
        presets: ['es2015', 'stage-0', 'react']
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
, plugins: [
		new webpack.optimize.UglifyJsPlugin({minimize: true})
	]
}

module.exports = config
