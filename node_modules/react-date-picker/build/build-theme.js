'use strict';

var ExtractTextPlugin = require('extract-text-webpack-plugin')
var path = require('path');

module.exports = function(themeName){

  var entry = {
    index: './style/theme/' + themeName + '/index.styl'
  };

  return {
    entry: entry,
    output: {
      path: path.resolve('./theme/'),
      filename: themeName + '.css'
    },
    module: {
      loaders: [
        {
          test: /\.styl$/,
          loader: ExtractTextPlugin.extract('style-loader', 'css-loader!stylus-loader')
        }
      ]
    }
    ,
    plugins: [
      new ExtractTextPlugin(themeName + '.css')
    ]
  }
}
