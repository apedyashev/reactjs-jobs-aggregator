/* eslint prefer-template: "off", object-shorthand: "off" */
const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');

// App files location
const PATHS = {
  app: path.resolve(__dirname, '../src'),
  styles: path.resolve(__dirname, '../src'),
  build: path.resolve(__dirname, '../build'),
};

const plugins = [
  // Shared code
  new webpack.optimize.CommonsChunkPlugin('vendor', 'js/vendor.bundle.js'),
  // Avoid publishing files when compilation fails
  new webpack.NoErrorsPlugin(),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('development'),
    __DEV__: JSON.stringify(JSON.parse(process.env.DEBUG || 'false')),
  }),
  new webpack.optimize.OccurenceOrderPlugin(),
];

const sassLoaders = [
  'style-loader',
  'css-loader?sourceMap',
  'postcss-loader',
  'sass-loader?outputStyle=expanded',
];

module.exports = {
  env: process.env.NODE_ENV,
  entry: {
    app: path.resolve(PATHS.app, 'main.js'),
    vendor: ['react'],
  },
  output: {
    path: PATHS.build,
    filename: 'js/[name].js',
    publicPath: '/',
  },
  stats: {
    colors: true,
    reasons: true,
  },
  resolve: {
    // We can now require('file') instead of require('file.jsx')
    extensions: ['', '.js', '.jsx', '.scss'],
    alias: {
      actions: PATHS.app + '/actions',
      components: PATHS.app + '/components',
      store: PATHS.app + '/store',
      reducers: PATHS.app + '/reducers',
      helpers: PATHS.app + '/helpers',
      sagas:  PATHS.app + '/sagas',
      services:  PATHS.app + '/services',
    },
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['react-hot', 'babel'],
        include: PATHS.app,
      },
      {
        test: /\.scss$/,
        loader: sassLoaders.join('!'),
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader?modules&importLoaders=1!postcss-loader',
      },
      // Inline base64 URLs for <=8k images, direct URLs for the rest
      {
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/,
        loader: 'url-loader?limit=8192',
      },
    ],
  },
  plugins: plugins,
  postcss: function postcssInit() {
    return [
      autoprefixer({
        browsers: ['last 2 versions'],
      }),
      require('postcss-nested'),
    ];
  },
  devServer: {
    contentBase: path.resolve(__dirname, '../src'),
    port: 3000,
    historyApiFallback: true,
  },
  devtool: 'eval',
};
