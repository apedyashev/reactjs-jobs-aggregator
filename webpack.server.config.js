//http://jlongster.com/Backend-Apps-with-Webpack--Part-I
var webpack = require('webpack');
var path = require('path');
var fs = require('fs');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var nodeModules = {};
fs.readdirSync('node_modules')
    .filter(function(x) {
        return ['.bin'].indexOf(x) === -1;
    })
    .forEach(function(mod) {
        nodeModules[mod] = 'commonjs ' + mod;
    });

module.exports = {
    devtool: 'cheap-module-eval-source-map',
    entry: './server.js',
    target: 'node',
    output: {
        path: path.join(__dirname, 'build'),
        filename: 'backend.js'
    },
    externals: nodeModules,
    resolve: {
        extensions: ["", ".js", ".jsx", '.less', '.css']
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
              //loader: 'isomorphic-style-loader!css-loader!less-loader',
              loader: ExtractTextPlugin.extract("isomorphic-style-loader", "css-loader!less-loader"),
              include: /less/
            },
            //{
            //    test: /\.less$/,
            //    loaders: ['style', 'css', 'postccs', 'less'],
            //    include: /less/
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
}