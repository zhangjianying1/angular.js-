var webpack = require('webpack')
var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var dev = true;
module.exports = {
    entry: [
//        'webpack-dev-server/client?http://127.0.0.1:8080', // WebpackDevServer host and port
        'webpack/hot/only-dev-server',
        "./app/javascripts/app.js"
    ]
    ,
    output: {
        path: dev ? 'app/__build' : path.resolve(__dirname + '/app/__build/'),
        publicPath: '/',
        filename: 'app/__build/app.js'
    },
    module: {
        loaders: [
//            {test:/\.js$/, loaders: ["react-hot", "babel"], exclude: /(node_modules|bower_components)/,query: {presets: ['es2015']}},
            { test: /\.js[x]?$/, exclude: /node_modules/, loaders: ["react-hot", 'babel?presets[]=es2015'] },
            {test: /\.css$/, loader: "style!css"},
            {test: /\.scss$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader!sass-loader")},
            {test: /\.(jpg|png)$/, loader: "url?name=images/[hash:7]-[name].[ext]&limit=8192"}
        ]
    },
    resolve: {
        extensions :['', '.js', '.json']
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new ExtractTextPlugin("css/[name].css"),
        new webpack.NoErrorsPlugin()
    ]
}