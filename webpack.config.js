const path = require('path');

const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const DynamicCdnWebpackPlugin = require('dynamic-cdn-webpack-plugin');

const VUEJS_VERSION = '2.5.16';

const NODE_ENV = process.env.NODE_ENV;

const setPath = function(folderName) {
  return path.join(__dirname, folderName);
}
const isProd = function() {
  return (process.env.NODE_ENV === 'production') ? true : false;
}
const buildingForLocal = () => {
  return (NODE_ENV === 'development');
};

const setPublicPath = () => {
  let env = NODE_ENV;
  if (env === 'production') {
    return 'https://your-host.com/production/';
  } else if (env === 'staging') {
    return 'https://your-host.com/staging/';
  } else {
    return '/';
  }
};

const extractHTML = new HtmlWebpackPlugin({
  title: 'History Search',
  filename: 'index.html',
  template: 'src/tpl/tpl.ejs',
  inject: true,
  environment: process.env.NODE_ENV,
  isLocalBuild: buildingForLocal(),
  imgPath: (!buildingForLocal()) ? 'assets' : 'src/assets',
  minify: {
    removeAttributeQuotes: true,
    collapseWhitespace: true,
    html5: true,
    minifyCSS: true,
    removeComments: true,
    removeEmptyAttributes: true
  },
});

const dynamicCDN = new DynamicCdnWebpackPlugin({
  resolver: name => {
    return {
      'vue': {
        var: 'Vue',
        name: 'Vue.js',
        url: 'https://cdn.jsdelivr.net/npm/vue@'+VUEJS_VERSION+'/dist/vue.min.js',
        version: VUEJS_VERSION
      }
    }[name];
  }
});

const config = {
  mode: buildingForLocal() ? 'development' : 'production',

  //entry: {
  //  app: './src/main.ts'
  //},

  optimization:{
    runtimeChunk: false,
    splitChunks: {
      chunks: "all", //Taken from https://gist.github.com/sokra/1522d586b8e5c0f5072d7565c2bee693
    }
    //splitChunks: {
    //  cacheGroups: {
    //    default: {
    //      chunks: 'initial',
    //      name: 'bundle',
    //      priority: -20,
    //      reuseExistingChunk: true,
    //    },
    //    vendor: {
    //      chunks: 'initial',
    //      name: 'vendor',
    //      priority: -10,
    //      test: /node_modules\/(.*)\.js/
    //    }
    //  }
    //}
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        exclude: /node_modules|vue\/src/,
        options: {
          appendTsSuffixTo: [/\.vue$/]
        }
      },
      {
       test: /\.vue$/,
       loader: 'vue-loader'
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader"
        ]
      },
      {
        test: /\.scss$/,
        use: !buildingForLocal() ?
            [
              MiniCssExtractPlugin.loader,
              "css-loader", 'sass-loader'
            ] :
            [{
                loader: "style-loader" // creates style nodes from JS strings
              }, {
                loader: "css-loader" // translates CSS into CommonJS
              }, {
                loader: "sass-loader" // compiles Sass to CSS
              }]
      },
      //{
      //  test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
      //  loader: 'url-loader',
      //  options: {
      //    limit: 10000,
      //    name: 'dist/img/[name].[hash:7].[ext]'
      //  }
      //},
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'file-loader',
        query: {
          name: 'img/[name].[ext]?[hash]',
          useRelativePath: buildingForLocal()
        }
      },   
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'dist/fonts/[name].[hash:7].[ext]'
        }
      }
    ]
  },
  resolveLoader: {
    modules: [setPath('node_modules')]
  },

  devServer: {
    historyApiFallback: true,
    noInfo: false
  },

  plugins: [
    extractHTML,
    dynamicCDN,
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "css/styles.[hash].css",
      chunkFilename: "css/styles.[id].[hash].css"
    }),
    new webpack.DefinePlugin({
      'process.env': {
        isStaging: (NODE_ENV === 'development' || NODE_ENV === 'staging'),
        NODE_ENV: '"'+NODE_ENV+'"'
      }
    })
  ],

  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    },
    extensions: ['.tsx', '.ts', '.js', '.vue', '.json']
  },
}

module.exports = config; 