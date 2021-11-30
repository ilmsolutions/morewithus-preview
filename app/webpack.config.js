const webpack = require('webpack');
const PATH = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin')
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = env => {
   var environment = env && env.NODE_ENV ? env.NODE_ENV : 'development';
   var plugins = [];
   if(environment == 'production'){
     plugins.push(new UglifyJsPlugin({
        sourceMap: false
    }));
   }

  return {
    entry: {
      app:  ["babel-polyfill", "./src/client.tsx"]
      //,reactjs:['react', 'react-dom', 'react-router']
    },
    output: {
        filename   : 'bundle.[name].js',
        path: __dirname + "/dist/assets/react",
        publicPath: "/assets/react/"
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",
    module: {
        rules: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            { test: /\.tsx?$/, loader: "awesome-typescript-loader" },

            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },

            //All files with a '.css' extension will be handled by style and css loaders
            //{test:/\.css$/,  exclude: /node_modules/,   use: [{loader: "style-loader"},{loader: "css-loader"}]}
            
            {test:/\.css$/, loader: ExtractTextPlugin.extract({fallback: "style-loader",
                                                               use: "css-loader", publicPath: "/dist"})}
        ]      
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify(environment)
            }
          }) 
          ,new CleanWebpackPlugin(['dist'])           
          ,...plugins                
        ,new ExtractTextPlugin("styles.css")
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
        "react-dom": "ReactDOM",
        "react-router": "ReactRouter"
    }
    , node: {
        fs: 'empty'
    }
  };
};