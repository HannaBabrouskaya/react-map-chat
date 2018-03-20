var path = require("path");
var webpack = require("webpack");

module.exports = function(env) {
  var pack = require("./package.json");
  var ExtractTextPlugin = require("extract-text-webpack-plugin");
  var HtmlWebpackPlugin = require('html-webpack-plugin');
  var production = !!(env && env.production === "true");
  var babelSettings = {
    extends: path.join(__dirname, '/.babelrc')
  };

  var config = {
    entry: "./app.jsx",
    output: {
      path: path.join(__dirname, "public"),
      publicPath:"/public/",
      filename: "app.js"
    },
    devtool: "inline-source-map",
    module: {
      rules: [
        {
          test: /\.jsx$/,
          exclude:/\/node_modules\//,
          loader: "babel-loader?optional[]=runtime" + JSON.stringify(babelSettings),
          options: { presets: ['es2015'] }
        },
        {
          test: /\.(png|jpg|svg|gif)$/,
          loader: "url-loader?limit=25000"
        },
        {
          test: /\.(scss|css)$/,
          loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use:["css-loader", "sass-loader", "postcss-loader"]})
        },
        {
          test: /\.(woff|eot|ttf)$/,
          loader: 'url-loader?name=[path][name].[ext]'
        }
      ]
    },
    resolve: {
      extensions: [".js", ".jsx"],
      modules: ["./src", "node_modules"],
      alias:{
        "components":path.resolve(__dirname, "src/scripts/components")
      }
    },
    devServer: {
      contentBase: './',
      port: 9000  
    },
    plugins: [
      new ExtractTextPlugin("./style.css"),
      new webpack.DefinePlugin({
        VERSION: `"${pack.version}"`,
        APPNAME: `"${pack.name}"`,
        PRODUCTION : production
      }),
      new  webpack.optimize.UglifyJsPlugin({
        test: /\.(js|jsx)$/
      })
    ]
  };
  return config;
}