const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const path = require('path');
const resolve = require('path').resolve;

const config = {
  devtool: 'eval-source-map',
  entry: __dirname + '/js/index.jsx',
  output:{
    path: resolve('./public/'),
    filename: 'bundle.js',
    publicPath: resolve('./public/')
  },
  // webpack-dev-server configuration
  devServer: {    // Can be omitted unless you are using 'docker' 
    host: '0.0.0.0',    // This is where webpack-dev-server serves your bundle which is created in memory.
    // To use the in-memory bundle,
    // your <script> 'src' should point to the bundle
    // prefixed with the 'publicPath', e.g.:
    //   <script src='http://localhost:9001/assets/bundle.js'>
    //   </script>
    publicPath: '/public/',    // The local filesystem directory where static html files
    // should be placed.
    // Put your main static html page containing the <script> tag
    // here to enjoy 'live-reloading'
    // E.g., if 'contentBase' is '../views', you can
    // put 'index.html' in '../views/main/index.html', and
    // it will be available at the url:
    //   https://localhost:9001/main/index.html
    contentBase: path.resolve(__dirname, "./views"),    // 'Live-reloading' happens when you make changes to code
    // dependency pointed to by 'entry' parameter explained earlier.
    // To make live-reloading happen even when changes are made
    // to the static html pages in 'contentBase', add 
    // 'watchContentBase'
    watchContentBase: true,    
    compress: true,
    port: 8081
 },
 plugins: [new HtmlWebpackPlugin({
  favicon: "./css/images/favicon.ico" 
 })],
 resolve: {
  extensions: ['.js','.jsx','.css']
 },
 module: {
  rules: [
  {
    test: /\.(js|jsx)$/,
    exclude: /(node_modules|bower_components)/,
    loader: 'babel-loader',
    options: {
        presets: ['react', 'es2015'],
        plugins: ['transform-class-properties']
    }
  },
  {
    test: /\.css$/i,
    use: ['style-loader', 'css-loader']
  },
  {
    test: /\.(png|svg|jpe?g|gif)$/i,
    loader: 'file-loader',
    options: {
      publicPath: 'public',
    }
  }]
 }
};

module.exports = config;
