var path = require("path");
var webpack = require('webpack');
var glob = require('glob');
var srcPath = path.resolve(__dirname, './src');
var autoprefixer = require('autoprefixer');
var DEV = process.env.DEV;
const ExtractTextPlugin = require('extract-text-webpack-plugin');
function getDevEntry(cwd) {

    var entry = {};
    glob.sync('**/*.js', {cwd: cwd}).forEach(function (item, i) {
        var file = item.replace('.js', '');
        entry[file] = [
            cwd+'/'+item
        ];
    });
    return entry;
}

var config= {
  entry: getDevEntry(srcPath),
  output: {
    path: path.resolve(__dirname, "build"),
    publicPath: "/assets/",
    filename: "[name].js"
  },
  resolve: {
    extensions: [ '.js'],
    alias: {
      // lib: path.join(__dirname, 'src/lib'),
      // util: path.join(__dirname, 'src/util')
    }
  },
  module: {
    rules:  [
        {
          test: /\.js?$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          // query: {
          //   presets: ['es2015',"stage-0"],
          //   plugins: [
    			   //  "transform-decorators-legacy",
    		    // ]
          // }
        },
        {
            test: /\.scss$/,
            loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: ['raw-loader','postcss-loader','sass-loader']})
        }
    ]
  },
  plugins: [
    new ExtractTextPlugin({
    	filename:'[name].css',
    	allChunks:true,
    	disable:!!DEV
    }),
    new webpack.LoaderOptionsPlugin({
	   options: {
	     postcss: [
	       autoprefixer(),
	     ]
	    }
	}),
    // 环境变量定义
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(DEV ? 'development' : 'production')
      },
      '__DEV__': JSON.stringify(JSON.parse(DEV ? 'true' : 'false'))
    })
  ]
};
// 发布状态
if (!DEV) {

  config.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
        compress: {
          unused: true,
          dead_code: true,
          warnings: false
        },
        mangle: {
          except: ['$', 'exports', 'require']
        },
        output: {
          ascii_only: true
        }
      }
    ),

    new webpack.optimize.OccurrenceOrderPlugin()
  );

} else {
  config.devServer = {
    headers: {
    	'Access-Control-Allow-Origin': '*',
	    'Access-Control-Allow-Credentials': 'true'
	}

  };
  config.plugins.push(new webpack.SourceMapDevToolPlugin({}));
}

module.exports=config;
