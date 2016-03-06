var path = require('path');
var webpack = require('webpack');
var nodeModulesPath = path.resolve(__dirname, 'node_modules');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'webpack-hot-middleware/client',
    './index'
  ],
   resolve: {
    extensions: ["", ".js", ".jsx", '.less', '.css']
  },
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new ExtractTextPlugin("bundle.css")
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
      // TODO: just for reference. delete this in the future
      //{
      //  test: /\.jsx?$/,
      //  loader: 'babel',
      //  include: /material-ui/
      //},
      {
        test: /\.css$/,
        loader: 'isomorphic-style-loader!css-loader?modules&importLoaders=1!postcss-loader'
      },
      {
        test: /\.less/,
        //loader: 'style-loader!css-loader!less-loader',
        loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader"),
        include: /less/
      },
      //{
      //  test: /\.less$/,
      //  loaders: ['style', 'css', 'postccs', 'less'],
      //  include: /less/
      //},
      {
        test: /\.scss$/,
        loaders: [
          'isomorphic-style-loader',
          'css-loader?modules&localIdentName=[name]_[local]_[hash:base64:3]',
          'postcss-loader'
        ]
      }
    ]
  },
  postcss: function () {
    return [
      require("postcss-import"),
    ];
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
