'use strict';

var ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = function(file){

  var entry = {};
  entry[file] = './style/' + file + '.styl';
  return {
    entry: entry,
    output: {
      filename: file + '.css'
    },
    module: {
      loaders: [
        {
          test: /\.styl$/,
          loader: ExtractTextPlugin.extract('style', 'css!autoprefixer!stylus')
        }
      ]
    }
    ,
    plugins: [
      new ExtractTextPlugin('[name].css')
    ]
  }
}
