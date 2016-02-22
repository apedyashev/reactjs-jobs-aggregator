var path = require('path');
var webpack = require('webpack');
var nodeModulesPath = path.resolve(__dirname, 'node_modules');

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'webpack-hot-middleware/client',
    './index'
  ],
   resolve: {
    extensions: ["", ".js", ".jsx", '.less']
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [{
        test: /\.js$/,
        loaders: ['babel'],
        exclude: /node_modules/,
        include: __dirname,
        //query: {
        //  stage: 0,
        //  plugins: []
        //}
      },
      {
        test: /\.jsx?$/,
        loader: 'babel',
        include: /material-ui/
      },
      {
        test: /\.less$/,
        loaders: ['style', 'css', 'less'],
        include: /less/ 
      }
    ]
  }
};


// When inside Redux repo, prefer src to compiled version.
// You can safely delete these lines in your project.
var reduxSrc = path.join(__dirname, '..', '..', 'src');
var reduxNodeModules = path.join(__dirname, '..', '..', 'node_modules');
var fs = require('fs');
if (fs.existsSync(reduxSrc) && fs.existsSync(reduxNodeModules)) {
  // Resolve Redux to source
  module.exports.resolve = { alias: { 'redux': reduxSrc } };
  // Compile Redux from source
  module.exports.module.loaders.push({
    test: /\.js$/,
    loaders: ['babel'],
    include: reduxSrc
  });
}

if (process.env.HOT) {
  module.exports.module.loaders[0].query.plugins.push('react-transform');
  module.exports.module.loaders[0].query.extra = {
    'react-transform': [{
      target: 'react-transform-hmr',
      imports: ['react-native'],
      locals: ['module']
    }]
  };
}
