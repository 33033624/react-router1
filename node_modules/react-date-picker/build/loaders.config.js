'use strict';

module.exports = [
  {
    test: /\.jsx$/,
    exclude: /node_modules/,
    loader: 'babel'
  },
  {
    test: /\.jsx$/,
    exclude: /node_modules/,
    loader: 'babel'
  },
  {
    test: /\.json$/,
    loader: 'json'
  },
  {
    test: /\.styl$/,
    loader: 'style!css!autoprefixer!stylus'
  },
  {
    test: /\.css$/,
    loader: 'style!css!autoprefixer'
  },
  {
    test: /\.png$/,
    loader: 'url?mimetype=image/png'
  }
]
