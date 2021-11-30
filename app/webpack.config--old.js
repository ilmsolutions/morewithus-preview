const webpack = require('webpack');
const PATH = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = env => {
   var environment = env && env.NODE_ENV ? env.NODE_ENV : 'development';
   var plugins = [];
   if(environment== 'production'){
    plugins.push(new UglifyJsPlugin({
        sourceMap: true
    }));       
   }

  return {
    mode: environment,
    entry: "./src/client.tsx",
    output: {
        filename: "bundle.js",
        path: __dirname + "/dist/assets/react"
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",
    module: {
        rules: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            { test: /\.tsx?$/, loader: "ts-loader" },

            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },

            //All files with a '.css' extension will be handled by style and css loaders
            //{test:/\.css$/,  exclude: /node_modules/,   use: [{loader: "style-loader"},{loader: "css-loader"}]}
            
            {test:/\.css$/, use: [MiniCssExtractPlugin.loader, 'css-loader']}
        ]      
    },
    plugins: [
         new CleanWebpackPlugin(['dist'])
        ,new MiniCssExtractPlugin({
            filename: "styles.css"
            ,publicPath:'/dist'
        })
        ,...plugins
    ],  
    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', '.css']
    },   
    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
    externals: {
        "react": "React",
        "react-dom": "ReactDOM"
        ,'react-router': 'ReactRouter'
    }
  };
};