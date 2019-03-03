const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const path = require('path');

module.exports = (env) => {

  return {
    entry: [
      './src/index'
    ],
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
      libraryTarget: 'commonjs2',
      publicPath: '/dist/'
    },
    optimization: {
      minimizer: [
        new UglifyJsPlugin({
          uglifyOptions: {
            mangle: true,
          },
          cache: true,
          parallel: true,
          sourceMap: true
        })
      ]
    },
    module: {
      rules: [
        {
          test: /\.(js)$/,
          exclude: /(node_modules)/,
          loader: 'babel-loader'
        },
        {
          test: /\.css$/,
          use: [
            {
              loader: "style-loader"
            },
            {
              loader: "css-loader",
              options: {
                modules: true
              }
            }
          ]
        },
        {
          test: /\.(png|svg|jpg|gif)$/,
          use: [
            {
              loader: 'url-loader',
              options:{
                fallback: "file-loader",
                name: "[name][md5:hash].[ext]",
                outputPath: 'assets/',
                publicPath: '/assets/'
              }
            }
          ]
        }
      ]
    },
    resolve: {
      alias: {
        'react': path.resolve(__dirname, './node_modules/react'),
        'react-dom': path.resolve(__dirname, './node_modules/react-dom'),
        'assets': path.resolve(__dirname, 'assets')
      }
    },
    externals: {
      react: {          
          commonjs: "react",
          commonjs2: "react",
          amd: "React",
          root: "React"
      },
      "react-dom": {
          commonjs: "react-dom",
          commonjs2: "react-dom",
          amd: "ReactDOM",
          root: "ReactDOM"
      }
    }  
  }
}