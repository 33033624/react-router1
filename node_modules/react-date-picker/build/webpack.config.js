'use strict';

var devEntry = require('./devEntry');

module.exports = {
  entry: devEntry,
  output: {
    publicPath: '/assets'
  },
  module: {
    loaders: require('./loaders.config')
  },
  externals: {
    // 'react': 'React'
  },
  resolve: {
    // Allow to omit extensions when requiring these files
    extensions: ['', '.js', '.jsx']
  }
}
