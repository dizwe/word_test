var webpack = require('webpack');

module.exports = {
  entry: ['react-hot-loader/patch', './src/index.js'] ,

  output: {
      path: __dirname + '/public/',
      filename: 'bundle.js',
      publicPath: '/'
  },

  devServer: {
      hot: true,
      inline: true,
      host: '13.209.114.196',
      port: 4000,
      contentBase: __dirname + '/public/',
      historyApiFallback: true,
  },

  module:{
      loaders: [
          {
              test: /.js$/,
              loader: 'babel-loader',
              exclude: /node_modules/,
              query: {
                  cacheDirectory: true,
                  presets: ['es2015', 'react'],
                  plugins: ["react-hot-loader/babel"]
              }
          },
          {
            test: /\.css$/,
            loader: 'style!css-loader'
          }
      ]
  },

  plugins: [
      new webpack.HotModuleReplacementPlugin()
  ]
};
